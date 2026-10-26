import { onMounted, onUnmounted, ref } from "vue";
import {
  createGithubService,
  type RepositorySnapshot,
} from "../services/github";
import { githubConfig } from "../config/github";
const snapshot = ref<RepositorySnapshot>();
const loading = ref(false);
const error = ref("");
let service: ReturnType<typeof createGithubService> | undefined;
export function useGithub() {
  async function refresh(force = false) {
    if (!service || loading.value) return;
    loading.value = true;
    error.value = "";
    try {
      snapshot.value = await service.update(force);
    } catch (cause) {
      error.value =
        cause instanceof Error && !(cause instanceof TypeError)
          ? cause.message
          : "Não foi possível consultar o GitHub.";
    } finally {
      loading.value = false;
    }
  }
  const check = () => {
    if (document.visibilityState === "visible") void refresh();
  };
  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    if (!service) {
      let storage: Storage | undefined;
      try {
        storage = window.localStorage;
      } catch {
        /* Privacy mode */
      }
      service = createGithubService({ storage });
    }
    snapshot.value = service.read();
    void refresh();
    timer = setInterval(check, Math.min(githubConfig.ttl, 60_000));
    document.addEventListener("visibilitychange", check);
  });
  onUnmounted(() => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", check);
  });
  return { snapshot, loading, error, refresh };
}
