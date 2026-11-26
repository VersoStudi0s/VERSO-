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
  { name: "Preto", value: "#0B0B0D" },
  { name: "Vermelho", value: "#E54858" },
  { name: "Grafite", value: "#1F1E23" },
  { name: "Branco", value: "#F7F0EB" },
];
</script>

<template>
  <section id="sobre" class="section about" aria-labelledby="sobre-title">
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
          <li v-for="item in principles" :key="item.title" data-reveal>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </li>
        </ul>
        <ConversationLink position="sobre" label="Conversar com a equipe" variant="secondary" class="about__cta" />
      </div>

      <div class="backstage" aria-label="Bastidores">
        <figure class="bs bs--code" data-reveal>
          <pre tabindex="0" aria-label="Trecho de código em TypeScript"><code><span class="c">// src/lib/contact.ts — monta a mensagem do formulário</span>
<span class="k">export const</span> <span class="f">buildMessage</span> = (draft) =&gt; [
  greeting,
  <span class="s">`Meu nome é ${draft.name}.`</span>,
  service ? <span class="s">`Interesse: ${service.name}.`</span> : …,
  draft.description,
].<span class="f">join</span>(<span class="s">"\n"</span>);</code></pre>
          <figcaption>Código deste site: o formulário de contato monta a mensagem e você envia pelo seu app.</figcaption>
        </figure>

        <figure class="bs bs--wire" data-reveal>
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

        <figure class="bs bs--palette" data-reveal>
          <ul role="list">
            <li v-for="swatch in swatches" :key="swatch.value">
              <span :style="{ background: swatch.value }" aria-hidden="true"></span>
              <strong>{{ swatch.name }}</strong> {{ swatch.value }}
            </li>
          </ul>
          <p class="bs__type"><span class="display">Anton</span> <em class="accent-word">Cormorant</em></p>
          <figcaption>Paleta e tipografia: as mesmas do nosso Instagram.</figcaption>
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
  gap: 56px;
}
.about__grid > *,
.backstage > * {
  min-width: 0;
}
.about__copy :deep(.heading) {
  margin-bottom: 28px;
}
.about__text {
  display: grid;
  gap: 16px;
  max-width: 62ch;
  color: var(--paper-dim);
  font-size: var(--text-lg);
}
.principles {
  display: grid;
  gap: 18px;
  margin-top: 36px;
}
.principles li {
  padding-left: 16px;
  border-left: 2px solid var(--red);
}
.principles h3 {
  font: 700 1.05rem / 1.3 var(--font-body);
}
.principles p {
  margin-top: 2px;
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.about__cta {
  margin-top: 32px;
}

/* Bastidores */
.backstage {
  position: relative;
  display: grid;
  gap: 18px;
}
.bs {
  position: relative;
  z-index: 1;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--graphite-2);
}
.bs figcaption {
  margin-top: 12px;
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--muted);
}
.bs--code pre {
  margin: 0;
  overflow-x: auto;
  padding: 14px;
  border-radius: 4px;
  background: #0f0f12;
  font: 400 0.78rem / 1.65 var(--font-mono);
  color: var(--paper);
}
.bs--code .c {
  color: #8a8389;
}
.bs--code .k {
  color: var(--pink);
}
.bs--code .f {
  color: #9fc2ff;
}
.bs--code .s {
  color: #f2b880;
}
.wire {
  display: grid;
  gap: 8px;
  width: 170px;
  margin-inline: auto;
  padding: 14px 12px 18px;
  border: 1.5px solid var(--paper-dim);
  border-radius: 18px;
}
.wire span,
.wire i {
  display: block;
  height: 8px;
  border-radius: 2px;
  background: var(--line-strong);
}
.wire__bar {
  height: 6px !important;
  width: 40%;
  margin-bottom: 6px;
}
.wire__title {
  height: 18px !important;
  background: var(--paper-dim) !important;
}
.wire__title--short {
  width: 60%;
  background: var(--red) !important;
}
.wire__btn {
  height: 20px !important;
  margin-top: 4px;
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
  gap: 6px;
  height: auto !important;
  margin-top: 6px;
  background: none !important;
}
.wire__grid i {
  height: 34px;
}
.bs--palette ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  font: 400 var(--text-xs) / 1.4 var(--font-mono);
  color: var(--paper-dim);
}
.bs--palette li {
  display: grid;
  gap: 6px;
}
.bs--palette li span {
  height: 36px;
  border: 1px solid var(--line-strong);
  border-radius: 3px;
}
.bs--palette strong {
  color: var(--paper);
  font-weight: 400;
}
.bs__type {
  margin-top: 14px;
  font-size: 1.8rem;
  line-height: 1;
}
.backstage__chrome {
  position: absolute;
  z-index: 0;
  right: -18%;
  top: -10%;
  width: 60%;
  opacity: 0.5;
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
    gap: 72px;
    align-items: start;
  }
  .backstage {
    margin-top: 72px;
  }
  .bs--code {
    transform: rotate(-1deg);
  }
  .bs--wire {
    transform: rotate(1.2deg);
  }
}
</style>
