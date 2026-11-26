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
  <section id="projetos" class="section projects theme-dark" aria-labelledby="projetos-title">
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
        >
          <div class="project__media" :class="{ 'project__media--phone': project.cover.width < project.cover.height }">
            <AppImage
              :image="project.cover"
              :sizes="index === 0 ? '(min-width: 960px) 60vw, 100vw' : '(min-width: 960px) 30vw, 100vw'"
            />
          </div>
          <div class="project__body">
            <h3 class="project__name display">{{ project.name }}</h3>
            <p class="label project__meta">{{ project.category }} · {{ project.type }}</p>
            <KindBadge :kind="project.kind" />
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
  gap: var(--s-3) var(--s-6);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.projects__legend div {
  display: flex;
  align-items: center;
  gap: var(--s-3);
}
.projects__honesty {
  max-width: 62ch;
  margin-top: var(--s-5);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.projects__list {
  display: grid;
  gap: var(--s-5);
  margin-top: var(--s-8);
}
.project {
  display: grid;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface);
  transition:
    box-shadow var(--fast) var(--ease),
    transform var(--fast) var(--ease);
}
.project:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
.project__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--surface-2);
}
.project__media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 500ms var(--ease);
}
/* Captura de celular: cantos arredondados por máscara, sem anel nem borda. */
.project__media--phone :deep(img) {
  width: auto;
  height: 112%;
  margin: 6% auto 0;
  object-fit: cover;
  clip-path: inset(0 round 18px 18px 0 0);
  filter: drop-shadow(0 12px 24px oklch(0% 0 0 / 0.5));
}
.project:hover .project__media:not(.project__media--phone) :deep(img) {
  transform: scale(1.025);
}
.project__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-3);
  padding: var(--s-6) var(--s-5) var(--s-5);
}
.project__name {
  font-size: clamp(2rem, 5vw, 2.6rem);
}
.project__meta {
  color: var(--fg-muted);
  letter-spacing: 0.06em;
}
.project__tagline {
  color: var(--fg-muted);
}
.project__facts {
  display: grid;
  gap: var(--s-3);
  margin-top: var(--s-2);
  font-size: var(--text-sm);
}
.project__facts dd {
  margin-top: var(--s-1);
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
  }
  .project--lead .project__body {
    padding: var(--s-7);
  }
  .project--lead .project__name {
    font-size: clamp(2.6rem, 5vw, 4rem);
  }
}
@media (prefers-reduced-motion: reduce) {
  .project,
  .project:hover,
  .project__media :deep(img) {
    transition: none;
    transform: none;
  }
}
</style>
