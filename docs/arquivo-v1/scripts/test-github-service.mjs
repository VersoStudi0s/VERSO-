import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("/tmp/verso-tests", { recursive: true });
await build({
  entryPoints: ["src/services/github.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: "/tmp/verso-tests/github.mjs",
});
const { createGithubService, normalizeRepository } = await import(
  pathToFileURL("/tmp/verso-tests/github.mjs")
);
const base = {
  id: 1,
  name: "versary",
  full_name: "renataaap/versary",
  private: false,
  fork: false,
  archived: false,
  size: 100,
  topics: [],
  language: "TypeScript",
  stargazers_count: 1,
  updated_at: "2026-10-22T00:00:00Z",
};
const results = [];
function check(name, fn) {
  fn();
  results.push(name);
}
check("Manual project without topics", () =>
  assert.ok(normalizeRepository(base)),
);
for (const patch of [
  { private: true },
  { fork: true },
  { archived: true },
  { disabled: true },
  { size: 0 },
  { full_name: "other/versary" },
  {
    name: "saep_api_notion",
    full_name: "renataaap/saep_api_notion",
    topics: ["portfolio-featured"],
  },
  { name: "exercise", full_name: "renataaap/exercise" },
])
  check("Exclude " + JSON.stringify(patch), () =>
    assert.equal(normalizeRepository({ ...base, ...patch }), null),
  );
check("Topic opts in public curated repository", () =>
  assert.ok(
    normalizeRepository({
      ...base,
      name: "future",
      full_name: "renataaap/future",
      topics: ["portfolio"],
    }),
  ),
);
let clock = 100000000,
  calls = 0,
  stars = 1,
  offline = false;
const data = new Map();
const storage = {
  getItem: (k) => data.get(k) || null,
  setItem: (k, v) => data.set(k, v),
};
const service = createGithubService({
  storage,
  now: () => clock,
  fetcher: async (url, options) => {
    calls++;
    assert.equal(options.credentials, "omit");
    assert.equal(options.headers.Authorization, undefined);
    if (offline) throw Error("offline");
    return new Response(
      JSON.stringify([{ ...base, stargazers_count: stars }]),
      { status: 200 },
    );
  },
});
await service.update();
stars = 7;
await service.update();
check("Fresh cache avoids network and preserves snapshot", () => {
  assert.equal(calls, 1);
  assert.equal(service.read().repositories[0].stars, 1);
});
clock += 3 * 60 * 60 * 1000 + 1;
await service.update();
check("Expired cache reflects changed metadata", () => {
  assert.equal(calls, 2);
  assert.equal(service.read().repositories[0].stars, 7);
});
offline = true;
await assert.rejects(service.update(true));
check("Offline preserves last good cache", () =>
  assert.equal(service.read().repositories[0].stars, 7),
);
const cacheKey = [...data.keys()][0];
data.set(
  cacheKey,
  JSON.stringify({
    fetchedAt: clock,
    raw: [
      base,
      {
        ...base,
        id: 2,
        name: "saep_api_notion",
        full_name: "renataaap/saep_api_notion",
        topics: ["portfolio"],
      },
    ],
  }),
);
check("Persistent exclusion reapplied on old cache", () =>
  assert.equal(
    createGithubService({ storage, now: () => clock }).read().repositories
      .length,
    1,
  ),
);
let pages = 0;
const paged = createGithubService({
  fetcher: async () => {
    pages++;
    return new Response(JSON.stringify([{ ...base, id: pages }]), {
      headers:
        pages === 1
          ? {
              link: '<https://api.github.com/users/renataaap/repos?page=2&per_page=100>; rel="next"',
            }
          : {},
    });
  },
});
assert.equal((await paged.update()).repositories.length, 2);
results.push("Link pagination follows next page");
const unsafe = createGithubService({
  fetcher: async () =>
    new Response("[]", {
      headers: { link: '<https://example.com/private>; rel="next"' },
    }),
});
await assert.rejects(unsafe.update(), /Paginação/);
results.push("Untrusted pagination host blocked");
const blocked = createGithubService({
  storage: {
    getItem() {
      throw Error("denied");
    },
    setItem() {
      throw Error("denied");
    },
  },
  fetcher: async () => new Response(JSON.stringify([base])),
});
assert.equal((await blocked.update()).repositories.length, 1);
results.push("Blocked storage uses memory");
let count = 0;
const rate = createGithubService({
  fetcher: async () => {
    count++;
    return new Response("{}", { status: 403 });
  },
});
await assert.rejects(rate.update());
await assert.rejects(rate.update());
assert.equal(count, 1);
results.push("Rate limit cooldown");
const delayed = createGithubService({
  fetcher: async () => {
    await new Promise((r) => setTimeout(r, 15));
    return new Response(JSON.stringify([base]));
  },
});
const [a, b] = await Promise.all([delayed.update(), delayed.update()]);
assert.equal(a, b);
results.push("Concurrent calls deduplicated");
await writeFile(
  "docs/github-service-results.json",
  JSON.stringify({ passed: results.length, tests: results }, null, 2),
);
console.log(`${results.length} GitHub service checks passed`);
