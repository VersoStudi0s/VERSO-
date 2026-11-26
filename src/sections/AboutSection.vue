<script setup lang="ts">
import SectionHeading from "../components/ui/SectionHeading.vue";
import ConversationLink from "../components/ui/ConversationLink.vue";

const principles = [
  {
    title: "Entender antes de desenhar",
    text: "A primeira conversa é sobre o seu negócio e o seu cliente, não sobre cores.",
  },
  {
    title: "Mostrar cedo",
    text: "Você vê uma prévia antes de pagar e acompanha a evolução depois.",
  },
  {
    title: "Fácil de usar vem junto com bonito",
    text: "Se o cliente do seu cliente se perde na tela, a tela precisa mudar.",
  },
  {
    title: "Tudo por escrito",
    text: "Escopo, prazo e valores combinados numa proposta, sem surpresa no meio.",
  },
];

const swatches = [
  { name: "Preto · 60%", value: "#0B0B0B" },
  { name: "Bege · 30%", value: "#F2EEE6" },
  { name: "Vermelho · 10%", value: "#FF2E1F" },
];
</script>

<template>
  <section id="sobre" class="section about theme-light" aria-labelledby="sobre-title">
    <div class="container about__grid">
      <div class="about__copy">
        <SectionHeading id="sobre-title" number="05" label="Sobre · Time VERSO*">
          Design e código no mesmo <em class="accent-word">time</em>
        </SectionHeading>
        <div class="about__text">
          <p>
            A VERSO* é um estúdio criativo digital formado por quatro pessoas, trabalhando 100% remoto. A gente
            cria sites, identidades visuais e soluções digitais para negócios que querem aparecer melhor e
            vender com mais clareza.
          </p>
          <p>
            Aqui, quem desenha a tela conversa com quem escreve o código desde o primeiro rascunho. Isso evita
            aquela distância entre o que foi aprovado e o que vai pro ar. Criatividade dá personalidade à marca;
            uma boa experiência de uso é o que faz o cliente ficar.
          </p>
        </div>
        <ul role="list" class="principles">
          <li v-for="(item, index) in principles" :key="item.title">
            <span class="principles__n" aria-hidden="true">{{ String(index + 1).padStart(2, "0") }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>
        <ConversationLink position="sobre" label="Conversar com a equipe" variant="secondary" class="about__cta" />
      </div>

      <div class="backstage" aria-label="Bastidores">
        <figure class="bs bs--code theme-dark">
          <pre tabindex="0" aria-label="Trecho de código em TypeScript"><code><span class="c">// src/lib/contact.ts: monta a mensagem do formulário</span>
<span class="k">export const</span> <span class="f">buildMessage</span> = (draft) =&gt; [
  greeting,
  <span class="s">`Meu nome é ${draft.name}.`</span>,
  service ? <span class="s">`Interesse: ${service.name}.`</span> : …,
  draft.description,
].<span class="f">join</span>(<span class="s">"\n"</span>);</code></pre>
          <figcaption>Código deste site: o formulário de contato monta a mensagem e você envia pelo seu app.</figcaption>
        </figure>

        <figure class="bs bs--wire">
          <div class="wire" aria-hidden="true">
            <span class="wire__bar"></span>
            <span class="wire__title"></span>
            <span class="wire__title wire__title--short"></span>
            <span class="wire__text"></span>
            <span class="wire__text"></span>
            <span class="wire__btn"></span>
            <span class="wire__btn wire__btn--ghost"></span>
            <span class="wire__grid"><i></i><i></i><i></i><i></i></span>
          </div>
          <figcaption>Wireframe da versão para celular desta página, feito antes do layout final.</figcaption>
        </figure>

        <figure class="bs bs--palette">
          <ul role="list">
            <li v-for="swatch in swatches" :key="swatch.value">
              <span :style="{ background: swatch.value }" aria-hidden="true"></span>
              <strong>{{ swatch.name }}</strong> {{ swatch.value }}
            </li>
          </ul>
          <p class="bs__type"><span class="display">Anton</span> <span class="bs__serif">Cormorant</span> <span class="bs__mono">Plex</span></p>
          <figcaption>Paleta 60-30-10 e tipografia do site.</figcaption>
        </figure>

        <img
          class="backstage__chrome"
          src="/images/escultura-cromada-400.webp"
          width="400"
          height="400"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  overflow: hidden;
}
.about__grid {
  display: grid;
  gap: var(--s-10);
}
.about__grid > *,
.backstage > * {
  min-width: 0;
}
.about__copy :deep(.heading) {
  margin-bottom: var(--s-7);
}
.about__text {
  display: grid;
  gap: var(--s-4);
  max-width: 62ch;
  color: var(--fg-muted);
  font-size: var(--text-lg);
}
.principles {
  display: grid;
  gap: var(--s-5);
  margin-top: var(--s-8);
}
.principles li {
  display: grid;
  grid-template-columns: var(--s-8) 1fr;
  column-gap: var(--s-3);
}
.principles__n {
  grid-row: span 2;
  font: 400 1.5rem / 1 var(--font-display);
  color: var(--accent-text);
}
.principles h3 {
  font: 600 1.05rem / 1.3 var(--font-body);
}
.principles p {
  margin-top: var(--s-1);
  font-size: var(--text-sm);
  color: var(--fg-muted);
}
.about__cta {
  margin-top: var(--s-7);
}

/* Bastidores: cartões com raio concêntrico (externo 14px, padding 12px, interno 3px mín.). */
.backstage {
  position: relative;
  display: grid;
  gap: var(--s-5);
  isolation: isolate;
}
.bs {
  --r-outer: var(--radius-lg);
  --pad: var(--s-3);
  position: relative;
  z-index: 1;
  padding: var(--pad);
  border: 1px solid var(--line);
  border-radius: var(--r-outer);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.bs figcaption {
  margin: var(--s-3) var(--s-1) var(--s-1);
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--fg-muted);
}
.bs--code {
  background: var(--black-2);
}
.bs--code pre {
  margin: 0;
  overflow-x: auto;
  padding: var(--s-4);
  border-radius: max(var(--radius-min), calc(var(--r-outer) - var(--pad)));
  background: var(--black);
  font: 400 0.78rem / 1.65 var(--font-mono);
  color: var(--beige);
}
.bs--code .c {
  color: var(--fg-subtle);
}
.bs--code .k,
.bs--code .f {
  color: var(--red);
}
.bs--code .s {
  color: var(--fg-muted);
}
.wire {
  display: grid;
  gap: var(--s-2);
  width: 170px;
  margin: var(--s-3) auto 0;
  padding: var(--s-4) var(--s-3) var(--s-5);
  border: 1.5px solid var(--line-strong);
  border-radius: 18px;
}
.wire span,
.wire i {
  display: block;
  height: 8px;
  border-radius: 2px;
  background: var(--surface-2);
}
.wire__bar {
  height: 6px !important;
  width: 40%;
  margin-bottom: var(--s-2);
}
.wire__title {
  height: 18px !important;
  background: var(--black) !important;
}
.wire__title--short {
  width: 60%;
  background: var(--red) !important;
}
.wire__btn {
  height: 20px !important;
  margin-top: var(--s-1);
  background: var(--red) !important;
}
.wire__btn--ghost {
  margin-top: 0;
  background: none !important;
  border: 1px solid var(--line-strong);
}
.wire__grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-2);
  height: auto !important;
  margin-top: var(--s-2);
  background: none !important;
}
.wire__grid i {
  height: 34px;
}
.bs--palette ul {
  display: grid;
  gap: var(--s-2);
  font: 400 var(--text-xs) / 1.4 var(--font-mono);
  color: var(--fg-muted);
}
.bs--palette li {
  display: grid;
  grid-template-columns: var(--s-10) 1fr;
  align-items: center;
  column-gap: var(--s-3);
}
.bs--palette li span {
  grid-row: span 2;
  height: var(--s-8);
  border-radius: max(var(--radius-min), calc(var(--r-outer) - var(--pad)));
  box-shadow: inset 0 0 0 1px var(--line);
}
.bs--palette strong {
  color: var(--fg);
  font-weight: 400;
}
.bs__type {
  margin-top: var(--s-4);
  font-size: 1.8rem;
  line-height: 1;
}
.bs__serif {
  font: 600 1em var(--font-editorial);
}
.bs__mono {
  font: 400 0.7em var(--font-mono);
}
/* Escultura cromada sobre o bege em multiply: os brancos somem e o cromo vira tinta. */
.backstage__chrome {
  position: absolute;
  z-index: 0;
  right: -14%;
  top: -12%;
  width: 52%;
  mix-blend-mode: multiply;
  pointer-events: none;
}
@media (min-width: 640px) {
  .backstage {
    grid-template-columns: 1fr 1fr;
  }
  .bs--code {
    grid-column: 1 / -1;
  }
}
@media (min-width: 1100px) {
  .about__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--s-11);
    align-items: start;
  }
  .backstage {
    margin-top: var(--s-11);
  }
  .bs--code {
    transform: rotate(-1deg);
  }
  .bs--wire {
    transform: rotate(1.2deg);
  }
}
</style>
