<script setup lang="ts">
import { useGithub } from "../composables/useGithub";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { PhArrowLeft, PhArrowUpRight, PhPlus } from "@phosphor-icons/vue";
import { projects, selectedProjects } from "../data/projects";
import type { Project } from "../types/project";
import AssetImage from "../components/AssetImage.vue";
import NotFoundPage from "./NotFoundPage.vue";
const route = useRoute();
const { snapshot } = useGithub();
const repository = computed(() =>
  snapshot.value?.repositories.find(
    (r) => r.fullName === project.value?.repository,
  ),
);
const project = computed(() =>
  projects.find((item) => item.slug === route.params.slug),
);
const sectionOrder: (keyof Project)[] = [
  "context",
  "problem",
  "objectives",
  "participation",
  "process",
  "solution",
  "results",
  "learning",
];
const visibleSections = computed(() =>
  sectionOrder.filter((key) => {
    const content = project.value?.[key];
    return Array.isArray(content) ? content.length > 0 : Boolean(content);
  }),
);
const sectionNumber = (key: keyof Project) =>
  String(visibleSections.value.indexOf(key) + 1).padStart(2, "0");
const nextProject = computed(
  () =>
    selectedProjects[
      (selectedProjects.findIndex((item) => item.slug === route.params.slug) +
        1) %
        selectedProjects.length
    ]!,
);
</script>
<template>
  <article
    v-if="project"
    :key="project.slug"
    class="project-page route-page frame section-pad"
  >
    <div class="section-topline">
      <RouterLink to="/#projetos" class="text-link"
        ><PhArrowLeft /> Voltar aos projetos</RouterLink
      ><span class="micro"
        >{{ project.number }} /
        {{ String(selectedProjects.length).padStart(2, "0") }} — ESTUDO DE
        CASO</span
      >
    </div>
    <div class="case-heading">
      <span class="eyebrow red">{{ project.status }}</span>
      <h1>{{ project.name }}</h1>
      <p>{{ project.subtitle }}</p>
      <div class="case-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{
          tag
        }}</span>
      </div>
      <div v-if="project.repository" class="case-code">
        <a
          :href="`https://github.com/${project.repository}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline"
          >Ver código ↗<span class="sr-only"> (GitHub, nova aba)</span></a
        >
        <p v-if="repository" class="micro">
          {{ repository.language }} · {{ repository.stars }} estrelas ·
          metadados do GitHub
        </p>
      </div>
      <PhPlus
        class="case-plus red"
        :size="55"
        weight="thin"
        aria-hidden="true"
      />
    </div>
    <figure class="case-cover">
      <AssetImage :name="project.image" :alt="project.alt" :eager="true" />
      <figcaption class="micro">
        {{ project.imageCaption }}
      </figcaption>
    </figure>
    <div v-if="project.gallery?.length" class="case-gallery">
      <figure v-for="visual in project.gallery" :key="visual.image">
        <AssetImage :name="visual.image" :alt="visual.alt" />
        <figcaption>
          {{ visual.caption }}
          <a
            :href="
              visual.image.startsWith('study-')
                ? `/images/studies/${visual.image.slice(6)}.svg`
                : `/images/${visual.image}.webp`
            "
            target="_blank"
            rel="noopener"
            class="text-link visual-source"
            >Ver prancha em tamanho original ↗<span class="sr-only">
              (abre em outra aba)</span
            ></a
          >
        </figcaption>
      </figure>
    </div>
    <div class="case-layout">
      <aside class="case-aside">
        <span class="eyebrow">Um olhar sobre<br />o processo.</span>
        <p>{{ project.description }}</p>
        <span class="micro">ESTADO DO PROJETO</span>
        <p>{{ project.status }}</p>
        <template v-if="project.technologies">
          <span class="micro">TECNOLOGIAS</span>
          <p>{{ project.technologies }}</p>
        </template>
        <p v-if="project.documentationNote">{{ project.documentationNote }}</p>
      </aside>
      <div class="case-body prose">
        <section>
          <span class="micro red"
            >{{ sectionNumber("context") }} / CONTEXTO</span
          >
          <h2>O ponto de partida</h2>
          <p>{{ project.context }}</p>
        </section>
        <section v-if="project.problem">
          <span class="micro red"
            >{{ sectionNumber("problem") }} / PROBLEMA</span
          >
          <h2>Uma pergunta para explorar</h2>
          <p>{{ project.problem }}</p>
        </section>
        <section v-if="project.objectives?.length">
          <span class="micro red"
            >{{ sectionNumber("objectives") }} / OBJETIVOS</span
          >
          <h2>O que buscamos construir</h2>
          <ul>
            <li v-for="goal in project.objectives" :key="goal">{{ goal }}</li>
          </ul>
        </section>
        <section v-if="project.participation">
          <span class="micro red"
            >{{ sectionNumber("participation") }} / PARTICIPAÇÃO</span
          >
          <h2>Meu papel</h2>
          <p>{{ project.participation }}</p>
        </section>
        <section v-if="project.process?.length">
          <span class="micro red"
            >{{ sectionNumber("process") }} / PROCESSO</span
          >
          <h2>Processo de desenvolvimento</h2>
          <ol>
            <li v-for="step in project.process" :key="step">{{ step }}</li>
          </ol>
        </section>
        <section v-if="project.solution">
          <span class="micro red"
            >{{ sectionNumber("solution") }} / SOLUÇÃO</span
          >
          <h2>A solução</h2>
          <p>{{ project.solution }}</p>
        </section>
        <section>
          <span class="micro red"
            >{{ sectionNumber("results") }} / RESULTADOS</span
          >
          <h2>O que está documentado</h2>
          <p>{{ project.results }}</p>
          <RouterLink
            v-if="['lab-movimento', 'pulse-lab'].includes(project.slug)"
            to="/#lab"
            class="btn btn-outline case-lab"
            >Experimentar no LAB <PhArrowUpRight
          /></RouterLink>
        </section>
        <section v-if="project.learning">
          <span class="micro red"
            >{{ sectionNumber("learning") }} / APRENDIZADOS</span
          >
          <h2>O próximo movimento</h2>
          <p>{{ project.learning }}</p>
        </section>
      </div>
    </div>
    <RouterLink :to="`/projetos/${nextProject.slug}`" class="next-project"
      ><div>
        <span class="micro">PRÓXIMO PROJETO</span
        ><span class="next-title">{{ nextProject.name }}</span>
      </div>
      <PhArrowUpRight weight="thin" :size="60"
    /></RouterLink>
  </article>
  <NotFoundPage v-else />
</template>
<style scoped>
.case-code {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
}
.project-page > .section-topline .micro {
  font-size: 8px;
}
.case-heading {
  margin: 65px 0 40px;
  position: relative;
}
.case-heading > .eyebrow {
  color: var(--red-light);
}
.case-heading h1 {
  font: 700 clamp(65px, 12vw, 180px) / 0.92 var(--display);
  letter-spacing: -0.025em;
  margin: 20px 0;
}
.case-heading > p {
  font-size: 19px;
  color: var(--muted);
}
.case-tags {
  display: flex;
  gap: 8px;
  margin-top: 25px;
}
.case-plus {
  position: absolute;
  right: 8%;
  top: 35%;
}
.case-cover {
  margin: 0;
}
.case-cover :deep(img) {
  width: 100%;
  height: auto;
  aspect-ratio: 15 / 11;
  object-fit: contain;
  object-position: center 52%;
  border: 1px solid var(--line);
  border-radius: 7px;
}
.case-cover figcaption {
  font-size: 8px;
  margin-top: 13px;
  text-transform: none;
}
.case-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10%;
  margin: 80px 0;
}
.case-aside {
  position: sticky;
  top: 110px;
  align-self: start;
}
.case-aside > p {
  font-size: 13px;
  color: var(--muted);
  margin-top: 20px;
  line-height: 1.7;
  max-width: 240px;
}
.case-aside > .micro {
  display: block;
  margin-top: 35px;
  color: var(--red-light);
}
.case-body section {
  margin-bottom: 55px;
}
.case-body section > .micro {
  font-size: 9px;
  color: var(--red-light);
}
.case-body h2 {
  margin-top: 12px;
  font-size: 39px;
}
.case-body p,
.case-body li {
  font-size: 15px;
  line-height: 1.8;
}
.case-body ol {
  padding-left: 20px;
  color: var(--muted);
}
.case-body li {
  margin-bottom: 12px;
}
.case-lab {
  margin-top: 20px;
}
.next-project {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--line);
  padding: 35px 0 10px;
  gap: 20px;
}
.next-project .micro {
  color: var(--red-light);
}
.next-title {
  display: block;
  font: 600 clamp(40px, 5vw, 75px) var(--display);
  margin-top: 12px;
}
.next-project > svg {
  transition: transform 0.3s;
  color: var(--red);
}
.next-project:hover > svg {
  transform: translate(5px, -5px);
}
@media (max-width: 767px) {
  .project-page > .section-topline {
    align-items: flex-start;
  }
  .project-page > .section-topline > .micro {
    font-size: 6px;
    text-align: right;
    max-width: 90px;
  }
  .project-page > .section-topline > .text-link {
    font-size: 8px;
    gap: 7px;
  }
  .case-heading {
    margin: 45px 0 28px;
  }
  .case-heading h1 {
    font-size: clamp(46px, 14vw, 90px);
    overflow-wrap: anywhere;
  }
  .case-heading > p {
    font-size: 15px;
  }
  .case-plus {
    display: none;
  }
  .case-cover :deep(img) {
    aspect-ratio: 15 / 11;
  }
  .case-cover figcaption {
    font-size: 7px;
  }
  .case-layout {
    grid-template-columns: 1fr;
    margin: 40px 0;
    gap: 40px;
  }
  .case-aside {
    position: static;
    border-bottom: 1px solid var(--line);
    padding-bottom: 35px;
  }
  .case-aside > p {
    max-width: none;
    font-size: 12px;
  }
  .case-aside > .micro {
    margin-top: 22px;
  }
  .case-body h2 {
    font-size: 34px;
  }
  .case-body p,
  .case-body li {
    font-size: 14px;
  }
  .next-project > svg {
    width: 40px;
  }
  .case-body section {
    margin-bottom: 40px;
  }
}

.case-gallery {
  margin-top: 50px;
}
.case-gallery figure {
  margin: 0;
}
.case-gallery :deep(img) {
  width: 100%;
  height: auto;
  display: block;
}
.visual-source {
  margin-top: 12px;
  min-height: 44px;
  color: var(--pink);
}
.case-gallery :deep(img[src*="github-gymflow-detail"]),
.case-gallery :deep(img[src*="github-ritmo-fitness"]) {
  width: auto;
  max-width: 100%;
  max-height: 820px;
  margin: auto;
}
.case-cover :deep(img[src*="github-ritmo-fitness"]) {
  height: min(700px, 140vw);
  aspect-ratio: auto;
  background: #20171f;
}
.case-gallery figcaption {
  font: 11px/1.6 var(--mono);
  color: var(--muted);
  margin-top: 16px;
}
.case-cover figcaption {
  font-size: 11px;
  line-height: 1.7;
}
.case-tags {
  flex-wrap: wrap;
}
</style>
