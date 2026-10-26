<script setup lang="ts">
import { PhArrowUpRight, PhPlus } from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
</script>
<template>
  <section
    class="featured frame section-pad reveal"
    aria-labelledby="featured-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Por dentro de uma ideia</span
      ><span class="section-number">[ESTUDO DE CASO]</span>
    </div>
    <div class="feature-copy">
      <span class="micro"
        >01 / 05 <span class="red">— ESTUDO DE CASO</span></span
      >
      <h2 id="featured-title">VERSARY</h2>
      <p class="feature-subtitle">Sistema de gestão industrial.</p>
      <div class="feature-tags">
        <span class="tag">UI/UX</span><span class="tag">Dashboard</span>
      </div>
      <div class="feature-problem">
        <h3 class="micro">Desafios de Ideias</h3>
        <p>
          Um projeto de gestão industrial desenvolvido para o Desafios de
          Ideias, já finalizado.
        </p>
      </div>
      <RouterLink to="/projetos/versary" class="text-link"
        >Conhecer o projeto <PhArrowUpRight
      /></RouterLink>
    </div>
    <AssetImage
      class="feature-image"
      name="github-versary"
      alt="Dashboard real do VERSARY com dados locais de demonstração."
    />
    <PhPlus
      class="feature-plus red"
      :size="32"
      weight="thin"
      aria-hidden="true"
    />
    <p class="feature-note micro">
      Projeto original concluído.<br />Captura real com dados demonstrativos.
    </p>
  </section>
</template>
<style scoped>
.featured {
  overflow: hidden;
  min-height: 630px;
  position: relative;
}
.feature-copy {
  padding-top: 26px;
}
.feature-copy > .micro {
  font-size: 9px;
}
.feature-copy h2 {
  font: 700 clamp(54px, 5.3vw, 90px)/1 var(--display);
  margin: 24px 0 14px;
}
.feature-subtitle {
  font-size: 14px;
}
.feature-tags {
  display: flex;
  gap: 7px;
  margin-top: 18px;
}
.feature-problem {
  margin-top: 26px;
  max-width: 40ch;
}
.feature-problem h3 {
  font-size: 10px;
}
.feature-problem p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.7;
  margin-top: 10px;
}
.feature-copy > .text-link {
  margin-top: 24px;
  font-size: 10px;
}
.feature-image {
  display: block;
  width: 100%;
  margin: 28px 0 50px;
}
.feature-image :deep(img),
img.feature-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.feature-plus {
  position: absolute;
  right: var(--gutter);
  top: 95px;
}
.feature-note {
  position: absolute;
  bottom: 25px;
  right: var(--gutter);
  font-size: 8px;
  color: var(--muted);
  text-align: right;
}
@media (max-width: 767px) {
  .featured {
    min-height: 0;
  }
  .feature-copy h2 {
    font-size: 68px;
  }
  .feature-copy {
    padding-top: 10px;
  }
}
</style>
