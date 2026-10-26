import { githubConfig as config } from "../config/github";
export interface Repository {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
}
export interface RepositorySnapshot {
  fetchedAt: number;
  repositories: Repository[];
}
interface Options {
  fetcher?: typeof fetch;
  storage?: Pick<Storage, "getItem" | "setItem">;
  now?: () => number;
}
const permitted = (fullName: string, topics: string[]) =>
  !config.excluded.some((name) => name === fullName.toLowerCase()) &&
  (config.featured.some((name) => name === fullName.toLowerCase()) ||
    topics.some((topic) => config.topics.some((value) => value === topic)));
export function normalizeRepository(value: unknown): Repository | null {
  if (!value || typeof value !== "object") return null;
  const r = value as Record<string, unknown>;
  const name =
    typeof r.name === "string" && /^[a-zA-Z0-9_.-]+$/.test(r.name)
      ? r.name
      : "";
  const fullName = `${config.user}/${name}`;
  const topics = Array.isArray(r.topics)
    ? r.topics.filter((t): t is string => typeof t === "string")
    : [];
  if (
    !name ||
    r.full_name !== fullName ||
    r.private !== false ||
    r.fork !== false ||
    r.archived !== false ||
    r.disabled === true ||
    typeof r.size !== "number" ||
    r.size <= 0 ||
    typeof r.id !== "number" ||
    !permitted(fullName, topics)
  )
    return null;
  return {
    id: r.id,
    name,
    fullName,
    url: `https://github.com/${fullName}`,
    description: typeof r.description === "string" ? r.description : "",
    language: typeof r.language === "string" ? r.language : "",
    topics,
    stars: typeof r.stargazers_count === "number" ? r.stargazers_count : 0,
    forks: typeof r.forks_count === "number" ? r.forks_count : 0,
    updatedAt:
      typeof r.updated_at === "string" &&
      Number.isFinite(Date.parse(r.updated_at))
        ? r.updated_at
        : "",
  };
}
// Cache stores original public API fields so every read re-applies the complete eligibility policy.
export function createGithubService({
  fetcher = fetch,
  storage,
  now = Date.now,
}: Options = {}) {
  let pending: Promise<RepositorySnapshot> | undefined;
  let memory: { fetchedAt: number; raw: unknown[] } | undefined;
  let retryAt = 0;
  function read(): RepositorySnapshot | undefined {
    try {
      const saved =
        memory ?? JSON.parse(storage?.getItem(config.cacheKey) || "null");
      if (
        !saved ||
        !Number.isFinite(saved.fetchedAt) ||
        saved.fetchedAt > now() ||
        !Array.isArray(saved.raw)
      )
        return;
      return {
        fetchedAt: saved.fetchedAt,
        repositories: saved.raw
          .map(normalizeRepository)
          .filter((r: Repository | null): r is Repository => !!r),
      };
    } catch {
      return;
    }
  }
  async function update(force = false): Promise<RepositorySnapshot> {
    if (pending) return pending;
    const cached = read();
    if (!force && cached && now() - cached.fetchedAt < config.ttl)
      return cached;
    if (now() < retryAt)
      throw new Error(
        "Aguarde alguns minutos antes de consultar o GitHub novamente.",
      );
    pending = (async () => {
      const raw: unknown[] = [];
      let next: string | undefined = config.endpoint;
      const visited = new Set<string>();
      while (next) {
        const url = new URL(next);
        if (
          url.origin !== "https://api.github.com" ||
          url.pathname !== `/users/${config.user}/repos` ||
          visited.has(next) ||
          visited.size >= 20
        )
          throw new Error("Paginação inesperada do GitHub.");
        visited.add(next);
        const response: Response = await fetcher(next, {
          headers: { Accept: "application/vnd.github+json" },
          signal: AbortSignal.timeout(12000),
          credentials: "omit",
          cache: "no-store",
        });
        if (!response.ok) {
          const reset =
            Number(response.headers.get("x-ratelimit-reset")) * 1000;
          const retryAfter = Number(response.headers.get("retry-after")) * 1000;
          retryAt = now() + 60_000;
          if (response.status === 403 || response.status === 429)
            retryAt = Math.max(
              retryAt,
              Math.min(reset || now() + retryAfter, now() + config.ttl),
            );
          throw new Error(
            response.status === 403 || response.status === 429
              ? "Limite temporário do GitHub. Os estudos de caso continuam disponíveis."
              : "GitHub indisponível. Os estudos de caso continuam disponíveis.",
          );
        }
        const page: unknown = await response.json();
        if (!Array.isArray(page))
          throw new Error("Resposta inesperada do GitHub.");
        raw.push(...page.filter((item) => normalizeRepository(item)));
        next = response.headers
          .get("link")
          ?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
      }
      memory = {
        fetchedAt: now(),
        raw: [
          ...new Map(
            raw.map((item) => [(item as { id: number }).id, item]),
          ).values(),
        ],
      };
      try {
        storage?.setItem(config.cacheKey, JSON.stringify(memory));
      } catch {
        /* Memory cache remains available when storage is blocked. */
      }
      return read()!;
    })();
    try {
      return await pending;
    } finally {
      pending = undefined;
    }
  }
  return { read, update };
}
