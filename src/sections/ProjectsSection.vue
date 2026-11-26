<script setup lang="ts">
import { RouterLink } from "vue-router";
import SectionHeading from "../components/ui/SectionHeading.vue";
import KindBadge from "../components/ui/KindBadge.vue";
import AppImage from "../components/ui/AppImage.vue";
import AppIcon from "../components/ui/AppIcon.vue";
import { kindLabels, orderedProjects, type ProjectKind } from "../content/projects";
import { track } from "../lib/analytics";

const hasClientWork = orderedProjects.some((project) => project.kind === "comercial");
const kindsInUse = [...new Set(orderedProjects.map((project) => project.kind))] as ProjectKind[];
const kindHelp: Record<ProjectKind, string> = {
  comercial: "feito para um cliente real",
  autoral: "ideia e iniciativa da própria equipe",
  academico: "desenvolvido em curso ou desafio",
  conceitual: "marca ou cenário fictício, para estudo",
};
</script>

<template>
  <section id="projetos" class="section projects" aria-labelledby="projetos-title">
    <div class="container">
      <SectionHeading id="projetos-title" number="03" label="Projetos">
        Trabalho que dá pra <em class="accent-word">abrir</em> e conferir
        <template #lead>
          Poucos projetos, bem explicados: o problema, o que foi feito, com quais ferramentas e onde ele está hoje.
        </template>
      </SectionHeading>

      <dl class="projects__legend" aria-label="Tipos de projeto">
        <div v-for="kind in kindsInUse" :key="kind">
          <dt><KindBadge :kind="kind" /></dt>
          <dd>{{ kindHelp[kind] }}</dd>
        </div>
      </dl>
      <p v-if="!hasClientWork" class="projects__honesty">
        Ainda não publicamos projetos de clientes. Quando o primeiro estiver pronto e autorizado, ele entra aqui em
        destaque, com tudo o que foi feito.
      </p>

      <ul role="list" class="projects__list">
        <li
          v-for="(project, index) in orderedProjects"
          :key="project.slug"
          class="project"
          :class="{ 'project--lead': index === 0 }"
          :style="{ '--accent': project.accent }"
          data-reveal
        >
          <div class="project__media" :class="{ 'project__media--phone': project.cover.width < project.cover.height }">
            <AppImage
              :image="project.cover"
              :sizes="index === 0 ? '(min-width: 960px) 60vw, 100vw' : '(min-width: 960px) 30vw, 100vw'"
            />
          </div>
          <div class="project__body">
            <KindBadge :kind="project.kind" />
            <h3 class="project__name display">{{ project.name }}</h3>
            <p class="label project__meta">{{ project.category }} · {{ project.type }}</p>
            <p class="project__tagline">{{ project.tagline }}</p>
            <dl v-if="index === 0" class="project__facts">
              <div>
                <dt class="label">Objetivo</dt>
                <dd>{{ project.objective }}</dd>
              </div>
              <div>
                <dt class="label">Tecnologias</dt>
                <dd>{{ project.technologies.join(" · ") }}</dd>
              </div>
            </dl>
            <RouterLink
              :to="`/projetos/${project.slug}`"
              class="link-arrow project__link"
              @click="track('abrir_projeto', { projeto: project.slug })"
            >
              Ver estudo de caso <AppIcon name="arrow-right" :size="18" />
              <span class="visually-hidden">: {{ project.name }} ({{ kindLabels[project.kind] }})</span>
            </RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.projects__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.projects__legend div {
  display: flex;
  align-items: center;
  gap: 10px;
}
.projects__honesty {
  max-width: 62ch;
  margin-top: 18px;
  font-size: var(--text-sm);
  color: var(--muted);
}
.projects__list {
  display: grid;
  gap: 20px;
  margin-top: 36px;
}
.project {
  display: grid;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--graphite);
  transition: border-color var(--fast) var(--ease);
}
.project:hover {
  border-color: var(--accent);
}
.project__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: color-mix(in srgb, var(--accent) 18%, var(--graphite-2));
  border-bottom: 1px solid var(--line);
}
.project__media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 500ms var(--ease);
}
.project__media--phone :deep(img) {
  width: auto;
  height: 112%;
  margin: 6% auto 0;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 0 0 6px rgb(0 0 0 / 0.5);
  object-fit: cover;
}
.project:hover .project__media:not(.project__media--phone) :deep(img) {
  transform: scale(1.025);
}
.project__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 22px 20px 20px;
}
.project__name {
  margin-top: 6px;
  font-size: clamp(2rem, 5vw, 2.6rem);
}
.project__meta {
  color: var(--paper-dim);
  letter-spacing: 0.06em;
}
.project__tagline {
  color: var(--paper-dim);
}
.project__facts {
  display: grid;
  gap: 12px;
  margin-top: 8px;
  font-size: var(--text-sm);
}
.project__facts dd {
  margin-top: 2px;
}
.project__link {
  margin-top: auto;
}
@media (min-width: 720px) {
  .projects__list {
    grid-template-columns: repeat(3, 1fr);
  }
  .project--lead {
    grid-column: 1 / -1;
    grid-template-columns: 1.4fr 1fr;
  }
  .project--lead .project__media {
    aspect-ratio: auto;
    min-height: 100%;
    border-bottom: 0;
    border-right: 1px solid var(--line);
  }
  .project--lead .project__body {
    padding: 32px;
  }
  .project--lead .project__name {
    font-size: clamp(2.6rem, 5vw, 4rem);
  }
}
@media (prefers-reduced-motion: reduce) {
  .project__media :deep(img) {
    transition: none;
  }
}
</style>
