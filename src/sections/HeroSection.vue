<script setup lang="ts">
import { RouterLink } from "vue-router";
import ConversationLink from "../components/ui/ConversationLink.vue";
import { track } from "../lib/analytics";

const offer = ["Sites", "Landing pages", "Identidade visual", "Redes sociais", "Sistemas"];
</script>

<template>
  <section id="inicio" class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="label hero__kicker">Creative Digital Studio <span aria-hidden="true">✦</span> 100% remoto</p>
        <h1 id="hero-title" class="display hero__title">
          <span class="hero__line">Seu negócio</span>
          <span class="hero__line">merece ser</span>
          <span class="hero__line"><em class="accent-word">visto.</em></span>
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
        <span class="hero__stamp">Protótipo<br />grátis ✦</span>
        <span class="hero__note label">[ design + código ]</span>
      </div>
    </div>

    <div class="container">
      <ul class="hero__offer" role="list" aria-label="O que fazemos">
        <li v-for="item in offer" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(28px, 6vw, 72px) clamp(56px, 8vw, 96px);
  background:
    radial-gradient(ellipse 60% 50% at 85% 30%, rgb(229 72 88 / 0.12), transparent 70%),
    var(--ink);
}
.hero__grid {
  display: grid;
  gap: 40px;
  align-items: center;
}
.hero__kicker span {
  color: var(--red);
}
.hero__title {
  margin-top: 16px;
  /* Limita pela altura para o CTA caber na primeira tela de notebooks baixos. */
  font-size: clamp(3.1rem, min(12vw, 12.5svh), 7.6rem);
}
.hero__line {
  display: block;
}
.hero__line:last-child {
  margin-top: -0.04em;
}
.hero__title .accent-word {
  font-size: 1.12em;
  line-height: 0.8;
  color: var(--red);
}
.hero__lead {
  margin-top: 22px;
}
.hero__ctas {
  display: grid;
  gap: 12px;
  margin-top: 28px;
}
.hero__promise {
  margin-top: 18px;
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.hero__promise strong {
  color: var(--paper);
}
.hero__promise a {
  margin-left: 4px;
  color: var(--pink);
  text-underline-offset: 3px;
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
  filter: drop-shadow(0 24px 30px rgb(0 0 0 / 0.55));
}
.hero__stamp {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 14px;
  background: var(--paper);
  color: var(--ink);
  font: 400 1.05rem / 1 var(--font-display);
  text-transform: uppercase;
  transform: rotate(6deg);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.4);
}
.hero__note {
  position: absolute;
  right: 4%;
  bottom: 2%;
  color: var(--paper);
}
.hero__offer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: clamp(40px, 6vw, 72px);
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font: 400 var(--text-xs) / 1.4 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--paper-dim);
}
.hero__offer li + li::before {
  content: "✦";
  margin-right: 14px;
  color: var(--red);
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
    gap: 24px;
    min-height: min(640px, calc(100svh - var(--header-h) - 140px));
  }
  .hero__art {
    width: 100%;
    max-width: 520px;
  }
}

/* Entrada (uma vez, só CSS) */
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
