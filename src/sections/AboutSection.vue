<script setup lang="ts">
import { ref } from "vue";
import { PhArrowUpRight, PhPlus } from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
const expanded = ref(false);
</script>
<template>
  <section
    id="sobre"
    class="about frame section-pad reveal"
    aria-labelledby="about-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Sobre mim / [05]</span
      ><span class="micro">Design + código + curiosidade</span>
    </div>
    <div class="about-layout">
      <div class="portrait-composition" data-reveal>
        <span class="portrait-index micro" aria-hidden="true"
          >OUTRO OLHAR / OUTRAS POSSIBILIDADES</span
        >
        <figure class="about-portrait media-reveal">
          <AssetImage
            name="retrato-editorial"
            alt="Arte editorial de um perfil em luz vermelha. Não é uma fotografia de Renata."
            :width="1229"
            :height="1536"
          /><span class="portrait-type editorial" aria-hidden="true"
            >mais<br />que<br />design_</span
          >
          <figcaption class="micro">
            Arte editorial do kit VERSO*.<br />Não é um retrato de Renata.
          </figcaption>
        </figure>
        <span class="portrait-note micro" aria-hidden="true"
          >PESSOA.<br />CRIAÇÃO.<br />ESTRATÉGIA.<br />POSSIBILIDADES.</span
        >
      </div>
      <div class="about-copy" data-reveal>
        <p class="hello">Olá, eu sou a</p>
        <h2 id="about-title" class="about-name">Renata<span>,</span></h2>
        <p class="about-role">Desenvolvedora e Designer.</p>
        <h3 class="about-heading">
          Criatividade com<br /><em>repertório técnico.</em>
        </h3>
        <p>
          Encontro no design e no código duas formas de transformar ideias em
          experiências digitais com identidade.
        </p>
        <p>
          Sou estudante de Desenvolvimento de Sistemas no
          <span class="senai">SENAI</span>, com foco em desenvolvimento web,
          interfaces e design digital. O VERSO* reúne meus projetos,
          experimentos e serviços criativos.
        </p>
        <PhPlus class="about-plus" weight="thin" aria-hidden="true" /><button
          class="btn btn-outline"
          :aria-expanded="expanded"
          aria-controls="trajectory"
          @click="expanded = !expanded"
        >
          {{
            expanded ? "Fechar minha trajetória" : "Conhecer minha trajetória"
          }}
          <PhArrowUpRight />
        </button>
        <div v-if="expanded" id="trajectory" class="trajectory">
          <span class="micro">Em constante construção</span>
          <p>
            Minha trajetória está começando no SENAI, conectando desenvolvimento
            web, design de interfaces e experimentação criativa. Este portfólio
            acompanha esse processo: estudos, ideias e novas habilidades em
            prática.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.about {
  isolation: isolate;
  overflow: hidden;
  padding-bottom: 80px;
}
.about-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(65px, 9vw, 155px);
  margin-top: 70px;
}
.portrait-composition {
  position: relative;
  padding: 0 20px 30px;
}
.portrait-composition::before {
  content: "";
  position: absolute;
  inset: -20px 35px 50px 5px;
  background: #6e2334;
  transform: rotate(3deg);
  z-index: -1;
}
.about-portrait {
  position: relative;
  transform: rotate(-4deg);
  margin: 0;
  border: 1px solid #ae586b;
}
.about-portrait :deep(picture),
.about-portrait :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}
.about-portrait :deep(img) {
  aspect-ratio: 0.76;
  object-fit: cover;
}
.portrait-index {
  position: absolute;
  top: -46px;
  left: 12px;
  font-size: 8px;
  color: var(--pink);
}
.portrait-type {
  position: absolute;
  bottom: 76px;
  left: 24px;
  font-size: clamp(50px, 6vw, 100px);
  line-height: 0.73;
  letter-spacing: -0.06em;
  color: var(--pink);
}
.about-portrait figcaption {
  position: absolute;
  left: 16px;
  bottom: 18px;
  background: #0b090cf0;
  padding: 10px;
  font-size: 9px;
  color: var(--white);
}
.portrait-note {
  position: absolute;
  right: -25px;
  bottom: 10px;
  background: var(--pink);
  color: var(--black);
  padding: 24px 18px;
  font-size: 10px;
  line-height: 1.7;
  transform: rotate(7deg);
  border: 1px solid #fff5;
}
.about-copy {
  position: relative;
  padding-right: 20px;
}
.hello {
  font-size: 21px;
}
.about-name {
  font: 500 clamp(100px, 10.4vw, 190px) / 0.85 var(--editorial);
  letter-spacing: -0.055em;
  margin: 10px 0 23px -6px;
}
.about-name > span {
  color: var(--red);
}
.about-role {
  font: 11px/1.6 var(--mono);
  color: var(--red-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.about-heading {
  font: 600 clamp(35px, 3.2vw, 60px) / 1.05 var(--display);
  margin: 37px 0 24px;
}
.about-heading em {
  font: 500 italic 1.13em/1 var(--editorial);
  color: var(--pink);
}
.about-copy > p:not(.hello):not(.about-role) {
  color: var(--muted);
  font-size: 15px;
  max-width: 43ch;
  margin-top: 20px;
}
.senai {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 4px;
}
.about-plus {
  position: absolute;
  right: -5px;
  top: 8px;
  width: 43px;
  height: 43px;
  color: var(--red);
}
.about-copy .btn {
  margin-top: 32px;
  font-size: 10px;
}
.trajectory {
  border-top: 1px solid var(--line);
  margin-top: 25px;
  padding-top: 20px;
}
.trajectory > .micro {
  color: var(--red-light);
}
.trajectory p {
  font-size: 14px;
  color: var(--muted);
  margin-top: 14px;
}
@media (max-width: 1023px) {
  .about-layout {
    gap: 55px;
  }
  .portrait-note {
    padding: 17px 12px;
    font-size: 8px;
  }
  .about-name {
    font-size: 98px;
  }
  .about-copy {
    padding-right: 0;
  }
  .about-copy > p:not(.hello):not(.about-role) {
    font-size: 14px;
  }
}
@media (max-width: 767px) {
  .about {
    padding-bottom: 45px;
  }
  .about .section-topline > .micro {
    display: none;
  }
  .about-layout {
    grid-template-columns: 1fr;
    gap: 55px;
    margin-top: 65px;
  }
  .portrait-composition {
    max-width: 440px;
    width: 92%;
    margin: auto;
    padding: 0 10px 20px;
  }
  .portrait-note {
    right: -12px;
    bottom: 0;
    font-size: 8px;
  }
  .about-portrait figcaption {
    font-size: 7px;
    left: 8px;
    bottom: 9px;
  }
  .portrait-type {
    font-size: 65px;
    bottom: 66px;
    left: 17px;
  }
  .hello {
    font-size: 18px;
  }
  .about-name {
    font-size: clamp(100px, 27vw, 155px);
  }
  .about-copy {
    padding: 0 3px;
  }
  .about-heading {
    font-size: 37px;
    margin-top: 30px;
  }
  .about-role {
    font-size: 10px;
  }
  .about-copy .btn {
    max-width: 100%;
    font-size: 9px;
    gap: 15px;
    padding: 14px;
  }
}
</style>
