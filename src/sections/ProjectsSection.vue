<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { PhArrowRight } from "@phosphor-icons/vue";
import { useRoute, useRouter } from "vue-router";
import { findService } from "../data/services";
import { selectedProjects as projects, categories } from "../data/projects";
import type { Category } from "../types/project";
import AssetImage from "../components/AssetImage.vue";
const route = useRoute();
const router = useRouter();
const selected = ref<Category>("Todos");
const technology = ref("Todas");
const technologies = [
  ...new Set(projects.flatMap((p) => p.techStack || [])),
].sort();
const selectedService = computed(() => findService(route.query.exemplos));
watch(
  () => route.query.exemplos,
  (value) => {
    if (findService(value)) selected.value = "Todos";
  },
);
function chooseCategory(category: Category) {
  selected.value = category;
  technology.value = "Todas";
  if (route.query.exemplos) {
    const { exemplos: _examples, ...query } = route.query;
    router.replace({ path: "/", query, hash: "#projetos" });
  }
}

const filtered = computed(() =>
  projects.filter(
    (project) =>
      (technology.value === "Todas" ||
        project.techStack?.includes(technology.value)) &&
      (selectedService.value
        ? (selectedService.value.projectSlugs as readonly string[]).includes(
            project.slug,
          )
        : selected.value === "Todos" ||
          project.categories.includes(selected.value)),
  ),
);
</script>
<template>
  <section
    id="projetos"
    class="projects frame section-pad reveal"
    aria-labelledby="projects-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Projetos em destaque</span>
      <span class="section-number">[03 / SELEÇÃO]</span>
    </div>
    <h2 id="projects-title" class="section-heading projects-heading">
      Trabalhos<br /><em>em evidência.</em>
    </h2>
    <p class="projects-intro">
      Sistemas reais, código aberto e identidade aplicada. Três projetos do
      GitHub, uma loja autoral em desenvolvimento e um estudo conceitual de
      branding.
    </p>
    <div class="project-toolbar">
      <span class="gallery-wordmark" aria-hidden="true"
        >VERSO<span>*</span></span
      >
      <div
        class="filters"
        role="group"
        aria-label="Filtrar projetos por categoria"
      >
        <button
          v-for="category in categories"
          :key="category"
          :aria-pressed="!selectedService && selected === category"
          :class="{ selected: !selectedService && selected === category }"
          @click="chooseCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>
    <label class="technology-filter"
      >Tecnologia dos destaques
      <select v-model="technology">
        <option>Todas</option>
        <option v-for="tech in technologies" :key="tech">{{ tech }}</option>
      </select></label
    >
    <div v-if="selectedService" class="service-filter">
      <p>
        Exemplos: <strong>{{ selectedService.title }}</strong>
      </p>
      <button class="text-link" @click="chooseCategory('Todos')">
        Limpar filtro
      </button>
    </div>
    <p class="sr-only" aria-live="polite">
      {{ filtered.length }} projetos em
      {{ selectedService?.title || selected }}.
    </p>
    <div v-if="!filtered.length" class="project-empty" role="status">
      <h3>Exemplos ainda não disponíveis.</h3>
      <p>Veja os projetos atuais ou conte o que você precisa criar.</p>
      <button class="btn btn-outline" @click="chooseCategory('Todos')">
        Ver todos os projetos
      </button>
    </div>
    <div
      v-else
      class="project-grid"
      :class="{
        filtered:
          selected !== 'Todos' || selectedService || technology !== 'Todas',
      }"
    >
      <RouterLink
        v-for="project in filtered"
        :key="project.slug"
        :data-project="project.slug"
        :to="`/projetos/${project.slug}`"
        class="project-card"
        data-reveal
        :class="{ 'project-featured': project.slug === 'versary' }"
      >
        <div class="project-visual media-reveal">
          <AssetImage :name="project.image" :alt="project.alt" />
          <div class="project-card-top">
            <span>{{ project.number }} /</span>
          </div>
        </div>
        <div class="project-info">
          <span class="micro project-status">{{ project.status }}</span>
          <h3>{{ project.name }}</h3>
          <p class="project-subtitle">{{ project.subtitle }}</p>
          <p class="project-description">{{ project.description }}</p>
          <p v-if="project.summaryRole" class="project-role">
            <span>Papel /</span> {{ project.summaryRole }}
          </p>
          <span class="project-open">Abrir estudo</span>
          <div class="project-tags">
            <span
              v-for="tag in project.tags.slice(0, 2)"
              :key="tag"
              class="tag"
              >{{ tag }}</span
            ><PhArrowRight :size="21" weight="light" />
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
<style scoped>
.technology-filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font: 11px var(--mono);
  margin-bottom: 30px;
  color: var(--muted);
}
.technology-filter select {
  min-height: 44px;
  background: #19191e;
  color: var(--white);
  border: 1px solid var(--line);
  padding: 10px;
  max-width: 100%;
}
.project-card[data-project="ritmo-fitness"] .project-visual {
  background: #20171f;
  aspect-ratio: 1 / 1;
}
.project-card[data-project="gymflow"] .project-visual {
  background: #171320;
  aspect-ratio: 4 / 3;
}
.projects {
  overflow: hidden;
}
.projects-heading {
  font: 600 clamp(65px, 8vw, 135px) / 0.8 var(--display);
  letter-spacing: -0.04em;
  margin: 45px 0 25px;
}
.projects-heading em {
  display: inline-block;
  font: 500 italic 1.1em/0.95 var(--editorial);
  color: var(--red);
  text-transform: none;
  padding-left: 15%;
}
.projects-intro {
  max-width: 45ch;
  font-size: 14px;
  color: var(--muted);
  margin: 30px 0 35px auto;
}
.project-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px 0;
  margin-bottom: 25px;
  border-top: 1px solid var(--line);
}
.gallery-wordmark {
  font: 500 34px/1 var(--editorial);
  letter-spacing: -2px;
}
.gallery-wordmark > span {
  color: var(--red);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}
.filters button {
  font: 11px var(--mono);
  color: var(--muted);
  border: 0;
  border-bottom: 1px solid transparent;
  min-height: 44px;
  padding: 10px 0;
  transition:
    color 0.3s,
    border-color 0.3s;
}
.filters button.selected {
  color: var(--red-light);
  border-color: var(--red);
}
.filters button:hover {
  color: var(--white);
}
.project-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 65px 45px;
  align-items: start;
}
.project-card {
  display: block;
  position: relative;
  min-width: 0;
  border-bottom: 1px solid var(--line);
  padding-bottom: 22px;
}
.project-card:nth-child(2) {
  margin-top: 150px;
}
.project-card:nth-child(3) {
  margin-top: -45px;
}
.project-card:nth-child(4) {
  margin-top: 55px;
}
.project-visual {
  aspect-ratio: 15 / 11;
  height: auto;
  position: relative;
  border: 1px solid var(--line);
  overflow: hidden;
  background: #191116;
}
.project-card:nth-child(2) .project-visual {
  aspect-ratio: 15 / 11;
  height: auto;
}
.project-card:nth-child(3) .project-visual {
  aspect-ratio: 15 / 11;
  height: auto;
}
.project-card:nth-child(4) .project-visual {
  aspect-ratio: 15 / 11;
  height: auto;
}
.project-visual :deep(picture),
.project-visual :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.project-visual :deep(img) {
  transition:
    transform 0.8s var(--ease),
    filter 0.7s;
  filter: none;
}
.project-card:hover :deep(img),
.project-card:focus-visible :deep(img) {
  filter: brightness(1.06);
}
.project-card-top {
  position: absolute;
  inset: 18px 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-card-top > span {
  font: 500 35px/1 var(--editorial);
  text-shadow: 0 2px 6px #000;
}
.project-card-top svg {
  background: #0a090bd9;
  box-sizing: content-box;
  padding: 11px;
  width: 20px;
  height: 20px;
  border: 1px solid var(--line);
  border-radius: 50%;
  transition:
    transform 0.35s,
    background 0.35s;
}
.project-card:hover .project-card-top svg {
  transform: rotate(45deg);
  background: var(--red);
  color: var(--black);
}
.project-info {
  padding-top: 22px;
  position: relative;
}
.project-status {
  font: 11px/1.6 var(--mono);
  color: var(--pink);
  letter-spacing: 0.02em;
}
.project-info h3 {
  font: 600 clamp(43px, 4.8vw, 80px) / 1 var(--display);
  letter-spacing: -0.025em;
  margin: 10px 0 13px;
  transition:
    color 0.3s,
    transform 0.35s;
}
.project-card:hover h3 {
  color: var(--red-light);
  transform: translateX(5px);
}
.project-subtitle {
  font-size: 14px;
}
.project-description {
  color: var(--muted);
  font-size: 13px;
  max-width: 43ch;
  margin-top: 9px;
}
.project-role {
  color: var(--muted);
  font-size: 11px;
  margin-top: 10px;
}
.project-role > span {
  color: var(--pink);
}
.project-open {
  display: flex;
  align-items: center;
  gap: 12px;
  font: 11px var(--mono);
  margin-top: 20px;
  color: var(--red-light);
  transform: translateY(4px);
  transition:
    transform 0.35s,
    color 0.35s;
}
.project-card:hover .project-open,
.project-card:focus-visible .project-open {
  transform: translateY(0);
  color: var(--white);
}
.project-open svg {
  font-size: 18px;
}
.project-tags {
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 18px;
}
.project-tags .tag {
  font-size: 11px;
  border: 0;
  padding: 0 8px 0 0;
  border-radius: 0;
}
.project-tags .tag + .tag {
  border-left: 1px solid var(--line);
  padding-left: 8px;
}
.project-tags > svg {
  margin-left: auto;
  color: var(--red-light);
}
.filtered .project-card {
  margin-top: 0;
}
.filtered .project-visual {
  height: auto;
}
.service-filter {
  border-block: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  margin-bottom: 24px;
  font-size: 13px;
  color: var(--muted);
}
.service-filter strong {
  font-weight: 400;
  color: var(--pink);
}
.service-filter button {
  border: 0;
  padding: 10px 0;
  min-height: 44px;
}
.project-empty {
  border: 1px solid var(--line);
  padding: 36px;
}
.project-empty h3 {
  font: 600 34px var(--display);
}
.project-empty p {
  color: var(--muted);
  font-size: 14px;
  margin: 12px 0 24px;
}
@media (max-width: 1023px) {
  .project-grid {
    gap: 45px 25px;
  }
  .project-card:nth-child(2) {
    margin-top: 90px;
  }
  .project-card:nth-child(3) {
    margin-top: 0;
  }
  .filtered .project-card {
    margin: 0;
  }
  .project-info h3 {
    font-size: 43px;
  }
}
@media (max-width: 767px) {
  .projects-heading {
    font-size: clamp(61px, 16vw, 100px);
    margin-top: 30px;
  }
  .projects-heading em {
    padding-left: 0;
    font-size: 1em;
  }
  .projects-intro {
    margin: 25px 0;
    font-size: 13px;
  }
  .filters {
    gap: 0 18px;
  }
  .filters button {
    font-size: 11px;
  }
  .project-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .project-grid .project-card {
    margin: 0;
  }
  .project-grid .project-visual {
    height: auto;
  }
  .project-grid .project-card:nth-child(2) .project-visual {
    height: auto;
  }
  .project-grid .project-card:nth-child(3) .project-visual {
    height: auto;
  }
  .project-grid .project-card:nth-child(4) .project-visual {
    height: auto;
  }
  .project-info h3 {
    font-size: 49px;
  }
  .project-info {
    padding-top: 18px;
  }
  .service-filter {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }
  .project-empty {
    padding: 25px 18px;
  }
  .project-empty h3 {
    font-size: 30px;
  }
}

.project-card:nth-child(5) {
  grid-column: 1 / -1;
  width: 78%;
  margin: 15px auto 0;
}
.project-card-top {
  inset: 12px 12px auto auto;
}
.project-card-top > span {
  display: none;
}
.project-card-top svg {
  padding: 8px;
  width: 16px;
  height: 16px;
}
@media (max-width: 767px) {
  .project-card:nth-child(n) {
    width: 100%;
    margin: 0;
  }
  .project-card:nth-child(n) .project-visual {
    height: auto;
    aspect-ratio: 15/11;
  }
}
</style>
