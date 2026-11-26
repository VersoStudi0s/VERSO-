<script setup lang="ts">
import { RouterLink } from "vue-router";
import ConversationLink from "../components/ui/ConversationLink.vue";
import TornEdge from "../components/ui/TornEdge.vue";
import { track } from "../lib/analytics";

const offer = ["Sites", "Landing pages", "Identidade visual", "Redes sociais", "Sistemas"];
</script>

<template>
  <section id="inicio" class="hero theme-dark" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="label hero__kicker">Creative Digital Studio <span aria-hidden="true">✦</span> 100% remoto</p>
        <h1 id="hero-title" class="display hero__title">
          <span class="hero__line">Seu negócio</span>
          <span class="hero__line">merece ser</span>
          <span class="hero__line"><em class="accent-serif">visto.</em></span>
        </h1>
        <p class="lead hero__lead">
          A VERSO* cria sites, identidade visual e conteúdo para redes sociais para pequenos negócios,
          autônomos e criadores. Design e código feitos pelo mesmo time, do primeiro rascunho à entrega.
        </p>
        <div class="hero__ctas">
          <ConversationLink position="hero" intent="prototipo" />
          <RouterLink
            :to="{ path: '/', hash: '#projetos' }"
            class="btn btn-secondary"
            @click="track('cta_projetos', { posicao: 'hero' })"
          >
            Ver projetos
          </RouterLink>
        </div>
        <p class="hero__promise">
          <strong>Você vê antes de pagar.</strong> O primeiro protótipo é por nossa conta.
          <RouterLink :to="{ path: '/', hash: '#como-funciona' }">Como funciona</RouterLink>
        </p>
      </div>

      <div class="hero__art" aria-hidden="true">
        <div class="hero__paper">
          <img
            src="/images/textura-editorial-640.webp"
            srcset="/images/textura-editorial-400.webp 400w, /images/textura-editorial-640.webp 640w, /images/textura-editorial-960.webp 960w"
            sizes="(min-width: 960px) 40vw, min(360px, 86vw)"
            width="960"
            height="960"
            alt=""
            decoding="async"
          />
        </div>
        <img
          class="hero__chrome"
          src="/images/escultura-cromada-480.webp"
          srcset="/images/escultura-cromada-400.webp 400w, /images/escultura-cromada-480.webp 480w, /images/escultura-cromada-960.webp 960w"
          sizes="(min-width: 960px) 30vw, min(300px, 72vw)"
          width="960"
          height="960"
          alt=""
          decoding="async"
        />
        <span class="hero__stamp">Protótipo<br />grátis</span>
        <span class="hero__note label">[ design + código ]</span>
      </div>
    </div>

    <TornEdge color="var(--beige)" />
    <div class="hero__strip theme-light">
      <div class="container">
        <ul class="hero__offer" role="list" aria-label="O que fazemos">
          <li v-for="item in offer" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-top: clamp(var(--s-7), 6vw, var(--s-11));
  background:
    radial-gradient(in oklch ellipse 60% 50% at 85% 30%, oklch(64.4% 0.242 29.6 / 0.16), oklch(15% 0 29.6 / 0) 70%),
    var(--bg);
}
.hero__grid {
  display: grid;
  gap: var(--s-8);
  align-items: center;
  padding-bottom: clamp(var(--s-9), 7vw, var(--s-12));
}
.hero__kicker span {
  color: var(--red);
}
.hero__title {
  margin-top: var(--s-4);
  /* Limita pela altura para o CTA caber na primeira tela de notebooks baixos. */
  font-size: clamp(3.1rem, min(12vw, 12.5svh), 7.6rem);
}
.hero__line {
  display: block;
}
.hero__line:last-child {
  margin-top: -0.04em;
}
.hero__title .accent-serif {
  font-size: 1.12em;
  line-height: 0.8;
  color: var(--red);
}
.hero__lead {
  margin-top: var(--s-6);
}
.hero__ctas {
  display: grid;
  gap: var(--s-3);
  margin-top: var(--s-7);
}
.hero__promise {
  margin-top: var(--s-4);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.hero__promise strong {
  color: var(--fg);
}
.hero__promise a {
  margin-left: var(--s-1);
  color: var(--link);
  font-weight: 600;
  text-underline-offset: 3px;
}
.hero__promise a:hover {
  color: var(--red-hover);
}

/* Arte: textura recortada como papel rasgado + escultura cromada */
.hero__art {
  position: relative;
  width: min(100%, 420px);
  aspect-ratio: 1 / 0.82;
  margin-inline: auto;
}
.hero__paper {
  position: absolute;
  inset: 6% 4% 4% 10%;
  clip-path: polygon(
    3% 6%, 18% 0, 31% 5%, 47% 1%, 63% 6%, 80% 0, 97% 4%, 100% 22%, 96% 41%, 100% 60%,
    97% 81%, 100% 97%, 79% 100%, 61% 95%, 43% 100%, 24% 96%, 6% 100%, 0 82%, 4% 61%, 0 40%, 3% 21%
  );
  transform: rotate(-3deg);
}
.hero__paper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__chrome {
  position: absolute;
  left: -2%;
  bottom: -10%;
  width: 72%;
  filter: drop-shadow(0 2px 2px oklch(0% 0 0 / 0.4)) drop-shadow(0 18px 24px oklch(0% 0 0 / 0.5));
}
.hero__stamp {
  position: absolute;
  right: 0;
  top: 0;
  padding: var(--s-3) var(--s-4);
  background: var(--beige);
  color: var(--black);
  font: 400 1.05rem / 1 var(--font-display);
  text-transform: uppercase;
  transform: rotate(6deg);
  box-shadow: var(--shadow-md);
}
.hero__note {
  position: absolute;
  right: 4%;
  bottom: 2%;
  color: var(--fg);
}

/* Tira bege com os serviços */
.hero__strip {
  position: relative;
  padding-block: var(--s-4);
}
.hero__offer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2) var(--s-4);
  font: 400 var(--text-xs) / 1.4 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg);
}
.hero__offer li + li::before {
  content: "✦";
  margin-right: var(--s-4);
  color: var(--red-on-light);
}

@media (min-width: 560px) {
  .hero__ctas {
    grid-template-columns: auto auto;
    justify-content: start;
  }
}
@media (min-width: 960px) {
  .hero__grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: var(--s-6);
    min-height: min(640px, calc(100svh - var(--header-h) - 140px));
  }
  .hero__art {
    width: 100%;
    max-width: 520px;
  }
  .hero__offer {
    justify-content: space-between;
  }
}

/* Entrada (uma vez, só no carregamento, só CSS) */
@media (prefers-reduced-motion: no-preference) {
  .hero__line {
    animation: rise 700ms var(--ease) both;
  }
  .hero__line:nth-child(2) {
    animation-delay: 70ms;
  }
  .hero__line:nth-child(3) {
    animation-delay: 140ms;
  }
  .hero__paper {
    animation: paper-in 900ms var(--ease) 120ms both;
  }
  .hero__chrome {
    animation: chrome-in 1000ms var(--ease) 220ms both;
  }
  .hero__stamp {
    animation: stamp-in 500ms var(--ease) 700ms both;
  }
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(0.35em);
  }
}
@keyframes paper-in {
  from {
    opacity: 0;
    transform: rotate(-7deg) scale(0.96);
  }
}
@keyframes chrome-in {
  from {
    opacity: 0;
    transform: translate(-6%, 8%) rotate(-10deg);
  }
}
@keyframes stamp-in {
  from {
    opacity: 0;
    transform: rotate(14deg) scale(1.2);
  }
}
</style>
