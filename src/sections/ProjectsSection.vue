<script setup lang="ts">
import { computed, ref } from "vue";
import { PhArrowUpRight, PhArrowRight } from "@phosphor-icons/vue";
import { projects, categories } from "../data/projects";
import type { Category } from "../types/project";
import AssetImage from "../components/AssetImage.vue";
const selected = ref<Category>("Todos");
const filtered = computed(() =>
  projects.filter(
    (project) =>
      selected.value === "Todos" || project.categories.includes(selected.value),
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
      <h2 id="projects-title" class="eyebrow">Projetos — Galeria</h2>
      <span class="section-number">[02 / SELEÇÃO]</span>
    </div>
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
          :aria-pressed="selected === category"
          :class="{ selected: selected === category }"
          @click="selected = category"
        >
          {{ category }}
        </button>
      </div>
    </div>
    <p class="sr-only" aria-live="polite">
      {{ filtered.length }} projetos na categoria {{ selected }}.
    </p>
    <div class="project-grid" :class="{ filtered: selected !== 'Todos' }">
      <RouterLink
        v-for="project in filtered"
        :key="project.slug"
        :to="`/projetos/${project.slug}`"
        class="project-card"
        :class="{ 'project-featured': project.slug === 'versary' }"
      >
        <div class="project-visual">
          <AssetImage :name="project.image" :alt="project.alt" />
          <div class="project-card-top">
            <span>{{ project.number }}.</span><PhArrowUpRight :size="19" />
          </div>
        </div>
        <div class="project-info">
          <span class="micro project-status">{{ project.status }}</span>
          <h3>{{ project.name }}</h3>
          <p class="project-subtitle">{{ project.subtitle }}</p>
          <p class="project-description">{{ project.description }}</p>
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
.gallery-wordmark {
  font: 500 35px/1 var(--editorial);
  letter-spacing: -2px;
}
.gallery-wordmark span {
  color: var(--red);
}
.projects .section-topline {
  margin-bottom: 17px;
}
.project-toolbar {
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 25px;
}
.filters {
  display: flex;
  gap: 23px;
}
.filters button {
  font: 8px var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 0;
  border-bottom: 1px solid transparent;
  padding: 12px 0;
  min-height: 44px;
  transition:
    color 0.2s,
    border-color 0.2s;
  color: var(--muted);
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
  grid-template-columns: 1.14fr 1fr 1fr 1fr;
  gap: 17px;
  align-items: stretch;
}
.project-card {
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #101012;
  transition:
    border-color 0.25s,
    transform 0.3s;
  min-width: 0;
}
.project-card:hover {
  border-color: var(--red);
  transform: translateY(-5px);
}
.project-visual {
  height: clamp(180px, 18vw, 310px);
  position: relative;
  overflow: hidden;
}
.project-visual :deep(picture),
.project-visual :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.project-visual :deep(img) {
  transition:
    transform 0.65s var(--ease),
    filter 0.4s;
  filter: saturate(0.8);
}
.project-card:hover :deep(img) {
  transform: scale(1.07);
  filter: saturate(1.15);
}
.project-card-top {
  position: absolute;
  inset: 14px 14px auto;
  display: flex;
  justify-content: space-between;
  font: 10px var(--mono);
  text-shadow: 0 1px 8px black;
}
.project-card-top svg {
  transition: transform 0.3s;
}
.project-card:hover .project-card-top svg {
  transform: translate(3px, -3px);
}
.project-info {
  padding: 18px 16px 14px;
  position: relative;
}
.project-status {
  font-size: 6px;
  letter-spacing: 0.03em;
  color: var(--pink);
}
.project-info h3 {
  font: 600 clamp(25px, 2.5vw, 36px)/1 var(--display);
  margin: 9px 0;
}
.project-subtitle {
  font-size: 11px;
  line-height: 1.4;
  color: var(--white);
}
.project-description {
  font-size: 10px;
  line-height: 1.6;
  color: var(--muted);
  margin-top: 11px;
  min-height: 33px;
}
.project-tags {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 22px;
}
.project-tags svg {
  margin-left: auto;
  color: var(--muted);
}
.project-tags .tag {
  font-size: 6px;
  padding: 5px;
}
.project-featured {
  border-color: #74353f;
  background: #161012;
}
.filtered {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.filtered .project-visual {
  height: 280px;
}
@media (max-width: 1023px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
  .project-visual {
    height: 260px;
  }
  .project-toolbar {
    flex-wrap: wrap;
    gap: 4px;
  }
  .filters {
    margin-left: auto;
  }
  .project-description {
    min-height: 0;
  }
  .project-info h3 {
    font-size: 32px;
  }
}
@media (max-width: 600px) {
  .gallery-wordmark {
    margin-bottom: 12px;
  }
  .filters {
    width: 100%;
    gap: 0;
    justify-content: space-between;
  }
  .filters button {
    font-size: 7px;
  }
  .project-grid {
    gap: 13px;
    grid-template-columns: 1fr;
  }
  .project-visual,
  .filtered .project-visual {
    height: 240px;
  }
  .project-info {
    padding: 18px;
  }
  .project-info h3 {
    font-size: 33px;
  }
  .project-subtitle {
    font-size: 12px;
  }
  .project-description {
    font-size: 11px;
  }
  .project-status {
    font-size: 7px;
  }
  .project-tags .tag {
    font-size: 8px;
  }
  .project-tags {
    margin-top: 20px;
  }
  .project-card-top {
    font-size: 11px;
  }
}
</style>
