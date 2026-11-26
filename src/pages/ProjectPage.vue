<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import KindBadge from "../components/ui/KindBadge.vue";
import AppImage from "../components/ui/AppImage.vue";
import AppIcon from "../components/ui/AppIcon.vue";
import ConversationLink from "../components/ui/ConversationLink.vue";
import NotFoundPage from "./NotFoundPage.vue";
import { findProject, orderedProjects } from "../content/projects";

const route = useRoute();
const project = computed(() => findProject(String(route.params.slug)));
const nextProject = computed(() => {
  const index = orderedProjects.findIndex((item) => item.slug === project.value?.slug);
  return orderedProjects[(index + 1) % orderedProjects.length];
});
const facts = computed(() =>
  project.value
    ? [
        { label: "Objetivo", value: project.value.objective },
        { label: "Problema", value: project.value.problem },
        { label: "Solução", value: project.value.solution },
        { label: "Resultado", value: project.value.result },
        ...(project.value.next ? [{ label: "Próximo passo", value: project.value.next }] : []),
      ]
    : [],
);
</script>

<template>
  <NotFoundPage v-if="!project" />
  <article v-else class="case" :style="{ '--accent': project.accent }" aria-labelledby="case-title">
    <header class="container case__header">
      <RouterLink :to="{ path: '/', hash: '#projetos' }" class="case__back">
        <AppIcon name="arrow-right" :size="18" class="case__back-icon" /> Todos os projetos
      </RouterLink>
      <KindBadge :kind="project.kind" />
      <h1 id="case-title" class="display case__title">{{ project.name }}</h1>
      <p class="lead">{{ project.tagline }}</p>
      <dl class="case__meta">
        <div>
          <dt class="label">Categoria</dt>
          <dd>{{ project.category }}</dd>
        </div>
        <div>
          <dt class="label">Tipo</dt>
          <dd>{{ project.type }}</dd>
        </div>
        <div>
          <dt class="label">Status</dt>
          <dd>{{ project.status }}</dd>
        </div>
        <div>
          <dt class="label">Participação</dt>
          <dd>{{ project.participation }}</dd>
        </div>
      </dl>
    </header>

    <figure class="container case__cover" :class="{ 'case__cover--phone': project.cover.width < project.cover.height }">
      <div class="case__frame">
        <AppImage :image="project.cover" eager sizes="(min-width: 1240px) 1240px, 100vw" />
      </div>
      <figcaption>{{ project.cover.caption }}</figcaption>
    </figure>

    <div class="container case__body">
      <dl class="case__facts">
        <div v-for="fact in facts" :key="fact.label" class="case__fact">
          <dt class="label">{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
      <aside class="case__side">
        <h2 class="label">Ferramentas e tecnologias</h2>
        <ul role="list" class="case__tech">
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
        <p v-if="project.note" class="case__note">{{ project.note }}</p>
      </aside>
    </div>

    <div v-if="project.comparison" class="container case__comparison">
      <h2 class="label">Antes e depois</h2>
      <div class="case__pair">
        <figure>
          <AppImage :image="project.comparison.before" />
          <figcaption><strong>Antes.</strong> {{ project.comparison.before.caption }}</figcaption>
        </figure>
        <figure>
          <AppImage :image="project.comparison.after" />
          <figcaption><strong>Depois.</strong> {{ project.comparison.after.caption }}</figcaption>
        </figure>
      </div>
    </div>

    <div v-if="project.gallery.length" class="container case__gallery">
      <figure
        v-for="image in project.gallery"
        :key="image.src"
        :class="{ 'case__cover--phone': image.width < image.height }"
      >
        <div class="case__frame">
          <AppImage :image="image" sizes="(min-width: 1240px) 1240px, 100vw" />
        </div>
        <figcaption>{{ image.caption }}</figcaption>
      </figure>
    </div>

    <section class="container case__cta" aria-labelledby="case-cta-title">
      <h2 id="case-cta-title" class="display">Quer algo nesse caminho para o seu negócio?</h2>
      <p>A primeira conversa e o protótipo são por nossa conta.</p>
      <div class="case__cta-actions">
        <ConversationLink :position="`case-${project.slug}`" intent="prototipo" variant="light" />
        <RouterLink v-if="nextProject" :to="`/projetos/${nextProject.slug}`" class="link-arrow">
          Próximo: {{ nextProject.name }} <AppIcon name="arrow-right" :size="18" />
        </RouterLink>
      </div>
    </section>
  </article>
</template>

<style scoped>
.case {
  padding-bottom: var(--section-y);
}
.case__header {
  display: grid;
  justify-items: start;
  gap: 16px;
  padding-top: clamp(28px, 5vw, 56px);
}
.case__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  margin-bottom: 8px;
  color: var(--paper-dim);
  text-decoration: none;
}
.case__back:hover {
  color: var(--paper);
}
.case__back-icon {
  transform: rotate(180deg);
}
.case__title {
  font-size: var(--title-xl);
}
.case__meta {
  display: grid;
  gap: 14px;
  width: 100%;
  margin-top: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: var(--text-sm);
}
.case__meta dd {
  margin-top: 2px;
}
.case__cover,
.case__gallery figure {
  margin-top: clamp(32px, 6vw, 56px);
}
.case__frame {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: color-mix(in srgb, var(--accent) 16%, var(--graphite-2));
}
.case__frame :deep(img) {
  width: 100%;
}
.case__cover--phone .case__frame {
  display: grid;
  place-items: center;
  padding: clamp(20px, 5vw, 48px);
}
.case__cover--phone .case__frame :deep(img) {
  width: min(320px, 80%);
  border-radius: 18px;
  box-shadow: 0 0 0 6px rgb(0 0 0 / 0.55);
}
figcaption {
  margin-top: 10px;
  font-size: var(--text-sm);
  color: var(--muted);
}
.case__body {
  display: grid;
  gap: 40px;
  margin-top: clamp(40px, 7vw, 72px);
}
.case__facts {
  display: grid;
  gap: 28px;
}
.case__fact dd {
  margin-top: 6px;
  font-size: var(--text-lg);
  color: var(--paper-dim);
  max-width: 62ch;
}
.case__side {
  align-self: start;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--graphite);
}
.case__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.case__tech li {
  padding: 6px 10px;
  border: 1px solid var(--line-strong);
  border-radius: 3px;
  font: 400 var(--text-xs) / 1.3 var(--font-mono);
}
.case__note {
  margin-top: 18px;
  font-size: var(--text-sm);
  color: var(--muted);
}
.case__comparison {
  margin-top: 56px;
}
.case__pair {
  display: grid;
  gap: 20px;
  margin-top: 14px;
}
.case__cta {
  display: grid;
  gap: 14px;
  margin-top: clamp(56px, 9vw, 96px);
  padding-top: 40px;
  border-top: 1px solid var(--line);
}
.case__cta h2 {
  font-size: var(--title-md);
  max-width: 22ch;
}
.case__cta p {
  color: var(--paper-dim);
}
.case__cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
  margin-top: 8px;
}
@media (min-width: 720px) {
  .case__meta {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .case__pair {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1000px) {
  .case__body {
    grid-template-columns: 1fr 340px;
    gap: 64px;
  }
  .case__side {
    position: sticky;
    top: calc(var(--header-h) + 24px);
  }
}
</style>
