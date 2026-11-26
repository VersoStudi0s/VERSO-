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
  <article v-else class="case theme-dark" aria-labelledby="case-title">
    <div class="case__top theme-light-desktop">
    <header class="container case__header">
      <RouterLink :to="{ path: '/', hash: '#projetos' }" class="case__back">
        <AppIcon name="arrow-right" :size="18" class="case__back-icon" /> Todos os projetos
      </RouterLink>
      <h1 id="case-title" class="display case__title">{{ project.name }}</h1>
      <KindBadge :kind="project.kind" />
      <p class="lead">{{ project.tagline }}</p>
    </header>
    </div>

    <figure class="container case__cover" :class="{ 'case__cover--phone': project.cover.width < project.cover.height }">
      <div class="case__frame">
        <AppImage :image="project.cover" eager sizes="(min-width: 1240px) 1240px, 100vw" />
      </div>
      <figcaption>{{ project.cover.caption }}</figcaption>
    </figure>

    <div class="case__paper theme-light">
    <div class="container">
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
    </div>
    <div class="container case__body">
      <dl class="case__facts">
        <div v-for="fact in facts" :key="fact.label" class="case__fact">
          <dt class="label">{{ fact.label }}</dt>
          <dd>{{ fact.value }}</dd>
        </div>
      </dl>
      <aside class="case__side theme-dark-mobile">
        <h2 class="label">Ferramentas e tecnologias</h2>
        <ul role="list" class="case__tech">
          <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
        </ul>
        <p v-if="project.note" class="case__note">{{ project.note }}</p>
      </aside>
    </div>
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

    <div class="container">
    <section class="case__cta" aria-labelledby="case-cta-title">
      <h2 id="case-cta-title" class="display">Quer algo nesse caminho para o seu negócio?</h2>
      <p>A primeira conversa e o protótipo são por nossa conta.</p>
      <div class="case__cta-actions">
        <ConversationLink :position="`case-${project.slug}`" intent="prototipo" class="case__cta-btn" />
        <RouterLink v-if="nextProject" :to="`/projetos/${nextProject.slug}`" class="link-arrow">
          Próximo: {{ nextProject.name }} <AppIcon name="arrow-right" :size="18" />
        </RouterLink>
      </div>
    </section>
    </div>
  </article>
</template>

<style scoped>
.case {
  padding-bottom: var(--section-y);
}
.case__header {
  display: grid;
  justify-items: start;
  gap: var(--s-4);
  padding-top: clamp(var(--s-7), 5vw, var(--s-10));
}
@media (min-width: 1000px) {
  .case__top {
    padding-bottom: var(--s-10);
  }
}
.case__back {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 44px;
  margin-bottom: var(--s-2);
  color: var(--fg-muted);
  text-decoration: none;
  transition: color var(--fast) var(--ease);
}
.case__back:hover,
.case__back:active {
  color: var(--link);
}
.case__back-icon {
  transform: rotate(180deg);
}
.case__title {
  font-size: var(--title-xl);
}
.case__meta {
  display: grid;
  gap: var(--s-4);
  width: 100%;
  margin-bottom: var(--s-9);
  padding-bottom: var(--s-6);
  border-bottom: 1px solid var(--line);
  font-size: var(--text-sm);
}
.case__meta dd {
  margin-top: var(--s-1);
}
.case__cover,
.case__gallery figure {
  margin-top: clamp(var(--s-7), 6vw, var(--s-10));
}
/* Imagem sem borda: cantos recortados por máscara. */
.case__frame {
  overflow: hidden;
  clip-path: inset(0 round var(--radius-lg));
  background: var(--surface-2);
}
.case__frame :deep(img) {
  width: 100%;
}
.case__cover--phone .case__frame {
  display: grid;
  place-items: center;
  padding: clamp(var(--s-5), 5vw, var(--s-9));
}
.case__cover--phone .case__frame :deep(img) {
  width: min(320px, 80%);
  clip-path: inset(0 round 22px);
}
figcaption {
  margin-top: var(--s-3);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.case__paper {
  margin-top: clamp(var(--s-8), 7vw, var(--s-11));
  padding-block: clamp(var(--s-9), 7vw, var(--s-11));
}
.case__body {
  display: grid;
  gap: var(--s-8);
}
.case__facts {
  display: grid;
  gap: var(--s-7);
}
.case__fact dd {
  margin-top: var(--s-2);
  font-size: var(--text-lg);
  color: var(--fg-muted);
  max-width: 62ch;
}
.case__side {
  align-self: start;
  padding: var(--s-6);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.case__tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  margin-top: var(--s-3);
}
.case__tech li {
  padding: var(--s-1) var(--s-3);
  border-radius: var(--radius-min);
  background: var(--bg);
  font: 400 var(--text-xs) / 1.6 var(--font-mono);
}
.case__note {
  margin-top: var(--s-5);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.case__comparison {
  margin-top: var(--s-10);
}
.case__pair {
  display: grid;
  gap: var(--s-5);
  margin-top: var(--s-4);
}
.case__pair :deep(img) {
  clip-path: inset(0 round var(--radius-lg));
}
/* Painel de impacto: vermelho, texto preto (5,3:1). */
.case__cta {
  --fg: var(--black);
  --fg-muted: var(--black);
  --link: var(--black);
  --focus: var(--black);
  display: grid;
  gap: var(--s-4);
  margin-top: clamp(var(--s-9), 8vw, var(--s-11));
  padding: clamp(var(--s-6), 5vw, var(--s-10));
  border-radius: var(--radius-lg);
  background: var(--red);
  color: var(--black);
  box-shadow: var(--shadow-lg);
}
.case__cta :deep(.case__cta-btn) {
  background: var(--black);
  color: var(--beige);
}
.case__cta :deep(.case__cta-btn:hover) {
  background: var(--black-3);
}
.case__cta h2 {
  font-size: var(--title-md);
  max-width: 22ch;
}
.case__cta p {
  color: var(--fg-muted);
}
.case__cta-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-4) var(--s-7);
  margin-top: var(--s-2);
}
@media (min-width: 720px) {
  .case__meta {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--s-6);
  }
  .case__pair {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1000px) {
  .case__body {
    grid-template-columns: 1fr 340px;
    gap: var(--s-10);
  }
  .case__side {
    position: sticky;
    top: calc(var(--header-h) + var(--s-6));
  }
}
</style>
