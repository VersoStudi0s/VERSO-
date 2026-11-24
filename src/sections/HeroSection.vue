<script setup lang="ts">
import { PhArrowUpRight, PhArrowDown, PhPlus } from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
import { usePointerDepth } from "../composables/usePointerDepth";
const { surface, move, reset } = usePointerDepth();
</script>
<template>
  <section
    id="inicio"
    ref="surface"
    class="hero frame"
    aria-labelledby="hero-title"
    @pointermove="move"
    @pointerleave="reset"
  >
    <div class="hero-content">
      <div class="hero-kicker eyebrow">
        <span>Creative digital studio</span
        ><PhPlus :size="22" weight="thin" aria-hidden="true" />
      </div>
      <h1 id="hero-title" aria-label="Ideias que ganham realidade.">
        <span class="title-mask" aria-hidden="true"
          ><span class="ideas">IDEIAS</span></span
        >
        <span class="title-mask" aria-hidden="true"
          ><span class="become">QUE GANHAM</span></span
        >
        <span class="title-mask reality-mask" aria-hidden="true"
          ><em>REALIDADE.</em></span
        >
      </h1>
      <div class="hero-description">
        <p>Design, desenvolvimento e soluções criativas com propósito.</p>
        <span class="hero-intro"
          >Interfaces claras. Marcas com identidade.<br />Projetos que conectam
          forma e função.</span
        >
        <div class="hero-actions">
          <RouterLink to="/#projetos" class="btn btn-primary"
            >Explorar projetos <PhArrowUpRight
          /></RouterLink>
          <RouterLink to="/#contato" class="text-link"
            >Pedir orçamento <PhArrowUpRight
          /></RouterLink>
        </div>
      </div>
    </div>
    <div class="hero-art" aria-label="Seleção de estudos visuais">
      <span class="art-index micro">PORTFÓLIO SELECIONADO / 01—05</span>
      <RouterLink
        to="/projetos/versary"
        class="hero-work hero-work-main"
        aria-label="VERSARY / INTERFACE REAL — conhecer o estudo de caso"
      >
        <AssetImage
          name="github-versary"
          alt="Interface real do VERSARY executada com dados de demonstração."
          :eager="true"
        />
        <span class="work-caption"
          ><span>VERSARY / INTERFACE REAL</span><PhArrowUpRight aria-hidden="true"
        /></span>
      </RouterLink>
      <RouterLink
        to="/projetos/cafe-aurora"
        class="hero-work hero-work-brand"
        aria-label="AURORA / BRAND STUDY — conhecer o projeto conceitual Café Aurora"
      >
        <AssetImage
          name="study-cafe-aurora"
          alt="Aplicações conceituais Café Aurora em embalagem, copo e cardápio."
          :eager="true"
        />
        <span class="work-caption"
          ><span>AURORA / BRAND STUDY</span><PhArrowUpRight aria-hidden="true"
        /></span>
      </RouterLink>
      <span class="art-note micro"
        >DA IDEIA À APLICAÇÃO.<br />CONCEITOS COM CONTEXTO.</span
      >
    </div>
    <div class="hero-bottom">
      <RouterLink to="/#projetos" class="scroll-cue"
        ><span class="micro">Explore a seleção</span
        ><PhArrowDown :size="22" aria-hidden="true" /></RouterLink
      ><span class="construction-line" aria-hidden="true"></span
      ><span class="micro">RENATA, JOÃO GUSTAVO, DAVID & ISAQUE / DESIGN & CÓDIGO</span>
    </div>
  </section>
</template>
<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  min-height: 850px;
  overflow: hidden;
  background: #111113;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    90deg,
    transparent 66%,
    #40353b44 66%,
    #40353b44 calc(66% + 1px),
    transparent calc(66% + 1px)
  );
}
.hero-content {
  position: relative;
  width: 61%;
  z-index: 2;
  padding: 150px 0 110px var(--gutter);
  pointer-events: none;
}
.hero-content a {
  pointer-events: auto;
}
.hero-kicker {
  display: flex;
  gap: 35px;
  align-items: center;
  color: var(--muted);
  margin-bottom: 50px;
  font-size: 10px;
}
.hero-kicker svg {
  color: var(--red);
}
h1 {
  transform: rotate(-3deg);
  transform-origin: left center;
  letter-spacing: -0.025em;
}
.title-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 8px;
  margin-bottom: -8px;
}
.title-mask > * {
  display: block;
  animation: title-reveal 0.95s var(--ease) both;
}
.ideas {
  font: 700 clamp(105px, 10vw, 190px)/0.9 var(--display);
}
.become {
  font: 300 clamp(58px, 5.8vw, 110px)/1.05 var(--display);
  animation-delay: 0.12s;
}
.reality-mask {
  padding-right: 20px;
  overflow: visible;
}
.reality-mask em {
  width: max-content;
  max-width: 100%;
  font: 700 italic clamp(100px, 9.7vw, 184px)/0.95 var(--editorial);
  letter-spacing: -0.065em;
  color: var(--red);
  animation-delay: 0.24s;
}
.hero-description {
  margin-top: 44px;
  max-width: 430px;
  animation: copy-reveal 0.8s 0.35s both;
}
.hero-description > p {
  font-size: 17px;
  line-height: 1.5;
  max-width: 30ch;
}
.hero-intro {
  display: block;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
  margin-top: 15px;
}
.hero-actions {
  display: flex;
  gap: 25px;
  align-items: center;
  margin-top: 29px;
}
.hero-actions .btn {
  font-size: 10px;
  min-height: 54px;
  gap: 28px;
}
.hero-actions .text-link {
  font-size: 10px;
  white-space: nowrap;
}
.hero-art {
  position: absolute;
  right: 4%;
  top: 173px;
  width: 46%;
  height: 555px;
  transform: translate3d(var(--depth-x, 0px), var(--depth-y, 0px), 0);
  transition: transform 0.7s var(--ease);
}
.art-index {
  display: block;
  color: var(--muted);
  font-size: 9px;
  text-align: right;
  margin-bottom: 25px;
  letter-spacing: 0.12em;
}
.hero-work {
  display: block;
  position: absolute;
  box-shadow: 0 25px 60px #0007;
  animation: work-entry 1.1s 0.2s var(--ease) both;
  border: 1px solid #716a63;
  transition: box-shadow 0.3s;
}
.hero-work:hover {
  box-shadow: 0 30px 60px #000b;
}
.hero-work :deep(img) {
  width: 100%;
  height: auto;
  display: block;
}
.hero-work-main {
  width: 100%;
  top: 60px;
  right: 0;
  transform: rotate(-4deg);
  background: #e5e5e0;
}
.hero-work-brand {
  width: 59%;
  right: 2%;
  top: 335px;
  transform: rotate(6deg);
  background: #dfd3bf;
  animation-delay: 0.4s;
}
.work-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 17px;
  font: 9px var(--mono);
  letter-spacing: 0.08em;
  background: #e5e5e0;
  color: #303033;
}
.hero-work-brand .work-caption {
  background: #dfd3bf;
  color: #502b29;
  font-size: 8px;
}
.art-note {
  position: absolute;
  bottom: -70px;
  left: 5%;
  font-size: 8px;
  line-height: 1.8;
  color: var(--muted);
}
.hero-bottom {
  position: absolute;
  bottom: 30px;
  left: var(--gutter);
  right: var(--gutter);
  display: flex;
  gap: 30px;
  align-items: center;
  color: var(--muted);
}
.hero-bottom .micro {
  font-size: 8px;
}
.scroll-cue {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 44px;
}
.construction-line {
  height: 1px;
  flex: 1;
  background: var(--line);
}
@keyframes title-reveal {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes copy-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes work-entry {
  from {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
  }
  to {
    opacity: 1;
    clip-path: inset(0);
  }
}
@media (min-width: 1600px) {
  .hero {
    min-height: 1020px;
  }
  .hero-content {
    padding-top: 180px;
  }
  .hero-art {
    top: 220px;
    height: 650px;
  }
  .hero-work-brand {
    top: 420px;
  }
  .hero-description {
    margin-top: 55px;
  }
}
@media (min-width: 768px) and (max-width: 1100px) {
  .hero {
    min-height: 1000px;
  }
  .hero-content {
    width: 85%;
    padding-top: 140px;
  }
  .hero-art {
    top: 540px;
    width: 52%;
    right: 6%;
    height: 330px;
  }
  .hero-work-brand {
    top: 185px;
    width: 60%;
  }
  .art-index {
    font-size: 7px;
  }
  .art-note {
    left: -58%;
    bottom: 20px;
  }
  .hero-description {
    max-width: 40%;
    margin-top: 30px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .reality-mask em {
    font-size: 135px;
  }
  .ideas {
    font-size: 115px;
  }
  .become {
    font-size: 73px;
  }
}
@media (max-width: 767px) {
  .hero {
    min-height: 0;
  }
  .hero-content {
    width: 100%;
    padding: 125px 20px 0;
  }
  .hero-kicker {
    font-size: 8px;
    margin-bottom: 32px;
    gap: 20px;
  }
  .ideas {
    font-size: 25vw;
  }
  .become {
    font-size: 14vw;
  }
  .reality-mask em {
    font-size: 17.4vw;
  }
  .hero-description {
    margin-top: 30px;
    max-width: 100%;
  }
  .hero-description > p {
    font-size: 15px;
    max-width: 29ch;
  }
  .hero-intro {
    font-size: 12px;
  }
  .hero-actions {
    gap: 16px;
    flex-wrap: wrap;
  }
  .hero-actions .btn {
    font-size: 9px;
    gap: 20px;
  }
  .hero-actions .text-link {
    font-size: 9px;
    min-height: 44px;
  }
  .hero-art {
    position: relative;
    top: auto;
    right: auto;
    width: calc(100% - 50px);
    margin: 55px 25px 100px;
    height: 83vw;
    transform: none;
  }
  .art-index {
    font-size: 7px;
    text-align: left;
  }
  .hero-work-main {
    top: 37px;
  }
  .hero-work-brand {
    top: 46vw;
    width: 62%;
  }
  .work-caption {
    font-size: 7px;
    padding: 10px;
  }
  .hero-work-brand .work-caption {
    font-size: 6px;
  }
  .art-note {
    font-size: 6px;
    left: 0;
    bottom: -28px;
  }
  .hero-bottom {
    bottom: 17px;
    gap: 15px;
  }
  .hero-bottom > .micro {
    display: none;
  }
  .hero-bottom .micro {
    font-size: 7px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-art {
    transform: none;
  }
}
</style>
