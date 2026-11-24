<script setup lang="ts">
import { computed, ref } from "vue";
import { PhArrowUpRight } from "@phosphor-icons/vue";
import { useGithub } from "../composables/useGithub";
import { githubConfig } from "../config/github";
import { selectedProjects } from "../data/projects";
const { snapshot, loading, error, refresh } = useGithub();
const search = ref("");
const language = ref("Todas");
const languages = computed(() =>
  [
    ...new Set(
      snapshot.value?.repositories.map((r) => r.language).filter(Boolean) || [],
    ),
  ].sort(),
);
const repositories = computed(() =>
  (snapshot.value?.repositories || []).filter(
    (r) =>
      (language.value === "Todas" || r.language === language.value) &&
      `${r.name} ${r.description} ${r.topics.join(" ")}`
        .toLowerCase()
        .includes(search.value.toLowerCase().trim()),
  ),
);
const caseFor = (name: string) =>
  selectedProjects.find((p) => p.repository === name)?.slug;
const date = (value: string | number, withTime = false) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" as const } : {}),
  }).format(new Date(value));
</script>
<template>
  <section
    id="github"
    class="github frame section-pad"
    aria-labelledby="github-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Código aberto / renataaap</span
      ><a
        :href="githubConfig.profile"
        target="_blank"
        rel="noopener noreferrer"
        class="text-link"
        >Perfil no GitHub <PhArrowUpRight aria-hidden="true" /><span
          class="sr-only"
        >
          (nova aba)</span
        ></a
      >
    </div>
    <h2 id="github-title">Explorar <em>GitHub.</em></h2>
    <p class="intro">
      O código por trás das ideias. Uma seleção de repositórios públicos, com
      metadados atualizados a cada três horas durante a navegação.
    </p>
    <div class="github-tools">
      <label
        >Buscar repositório<input
          v-model="search"
          type="search"
          placeholder="Nome, descrição ou topic"
      /></label>
      <label
        >Tecnologia<select v-model="language">
          <option>Todas</option>
          <option v-for="item in languages" :key="item">{{ item }}</option>
        </select></label
      >
      <button
        class="btn btn-outline"
        :disabled="loading"
        @click="refresh(true)"
      >
        {{ loading ? "Consultando…" : "Atualizar GitHub" }}
      </button>
    </div>
    <p class="sync" role="status" aria-live="polite">
      {{
        loading
          ? "Buscando repositórios públicos…"
          : snapshot
            ? `Última consulta: ${date(snapshot.fetchedAt, true)} UTC. ${repositories.length} repositórios nesta seleção.`
            : error
              ? "Consulta indisponível no momento."
              : "Aguardando consulta ao GitHub."
      }}
    </p>
    <p v-if="error" class="sync-error" role="alert">
      {{ error }}
      {{
        snapshot
          ? "Exibindo a última consulta disponível."
          : "Você pode acessar os projetos em destaque acima ou o perfil no GitHub."
      }}
    </p>
    <div
      v-if="repositories.length"
      class="repository-list"
      :aria-busy="loading"
    >
      <article
        v-for="(repo, index) in repositories"
        :key="repo.id"
        class="repository-row"
      >
        <span class="repo-number" aria-hidden="true">{{
          String(index + 1).padStart(2, "0")
        }}</span>
        <div class="repo-main">
          <span class="micro"
            >{{ repo.language || "Linguagem não informada" }} / repositório
            público</span
          >
          <h3>
            <a :href="repo.url" target="_blank" rel="noopener noreferrer"
              >{{ repo.name }} <PhArrowUpRight aria-hidden="true" /><span
                class="sr-only"
              >
                (GitHub, nova aba)</span
              ></a
            >
          </h3>
          <p>
            {{
              repo.description ||
              "Descrição não informada no GitHub. Explore o código e a documentação."
            }}
          </p>
          <div class="repo-topics">
            <span v-for="topic in repo.topics" :key="topic">#{{ topic }}</span>
          </div>
        </div>
        <div class="repo-meta">
          <span v-if="repo.updatedAt"
            >Atualizado em<br />{{ date(repo.updatedAt) }}</span
          ><span>{{ repo.stars }} estrelas · {{ repo.forks }} forks</span
          ><RouterLink
            v-if="caseFor(repo.fullName)"
            :to="`/projetos/${caseFor(repo.fullName)}`"
            class="text-link"
            >Ler estudo <PhArrowUpRight aria-hidden="true"
          /></RouterLink>
        </div>
      </article>
    </div>
    <p v-else-if="!loading && !error" class="empty">
      Nenhum repositório corresponde à seleção. Tente outra busca ou tecnologia.
    </p>
    <noscript
      ><p>
        Ative o JavaScript para consultar os metadados atuais. Os estudos de
        caso e o perfil continuam acessíveis.
      </p></noscript
    >
    <p class="curation-note">
      Curadoria antes de quantidade. Outros repositórios entram nesta seleção
      com os topics portfolio ou portfolio-featured; forks, arquivos e
      repositórios vazios ficam de fora.
    </p>
  </section>
</template>
<style scoped>
.github h2 {
  font: 600 clamp(58px, 8vw, 120px) / 0.95 var(--display);
  margin: 40px 0 25px;
  letter-spacing: -0.03em;
}
.github h2 em {
  font-family: var(--editorial);
  font-weight: 500;
  color: var(--red-light);
}
.intro {
  max-width: 60ch;
  color: var(--muted);
  font-size: 14px;
}
.github-tools {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 20px;
  margin: 35px 0 20px;
}
.github-tools label {
  display: grid;
  gap: 10px;
  font: 11px var(--mono);
  flex: 1;
  min-width: 160px;
}
.github-tools input,
.github-tools select {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--line);
  background: #19191e;
  color: var(--white);
  padding: 12px;
  border-radius: 0;
  font: 14px sans-serif;
}
.sync,
.curation-note,
.empty {
  font: 11px/1.8 var(--mono);
  color: var(--muted);
}
.sync-error {
  padding: 15px;
  border: 1px solid var(--red);
  font-size: 13px;
}
.repository-list {
  margin: 25px 0;
}
.repository-row {
  display: grid;
  grid-template-columns: 45px 1fr 165px;
  gap: 25px;
  padding: 35px 0;
  border-top: 1px solid var(--line);
  transition: background 0.25s;
}
.repository-row:hover {
  background: #e5485808;
}
.repo-number {
  color: var(--pink);
  font: italic 26px var(--editorial);
}
.repo-main {
  min-width: 0;
}
.repo-main h3 {
  font: 600 clamp(34px, 4vw, 65px) / 1.1 var(--display);
  margin: 12px 0;
  overflow-wrap: anywhere;
}
.repo-main h3 a {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  max-width: 100%;
}
.repo-main h3 svg {
  width: 0.55em;
  flex-shrink: 0;
}
.repo-main h3 a:hover {
  color: var(--red-light);
}
.repo-main p {
  font-size: 13px;
  color: var(--muted);
  max-width: 65ch;
  overflow-wrap: anywhere;
}
.repo-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font: 11px var(--mono);
  color: var(--pink);
  margin-top: 12px;
}
.repo-meta {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  font: 11px/1.7 var(--mono);
  color: var(--muted);
}
.curation-note {
  border-top: 1px solid var(--line);
  padding-top: 20px;
  max-width: 80ch;
}
@media (max-width: 600px) {
  .repository-row {
    grid-template-columns: 25px 1fr;
    gap: 12px;
  }
  .repo-meta {
    grid-column: 2;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .github-tools {
    align-items: stretch;
  }
  .github-tools label {
    flex-basis: 100%;
  }
  .github .section-topline {
    flex-wrap: wrap;
    gap: 15px;
  }
}
</style>
