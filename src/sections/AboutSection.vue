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
      <span class="eyebrow">Sobre nós / [05]</span
      ><span class="micro">Design + código + curiosidade</span>
    </div>
    <div class="duo-intro"><h2 id="about-title">Duas perspectivas.<br /><em>Uma criação em conjunto.</em></h2><p>Somos Renata e João Gustavo. Unimos desenvolvimento, design e planejamento para transformar ideias em experiências digitais. Trabalhamos de forma complementar, compartilhando decisões e aprimorando o trabalho um do outro, com atenção à funcionalidade, à identidade visual e à organização de cada projeto.</p></div>
    <div class="about-layout">
      <div class="portrait-composition" data-reveal>
        <span class="portrait-index micro" aria-hidden="true"
          >FORMA / FUNÇÃO / INTENÇÃO</span
        >
        <figure class="about-portrait media-reveal">
          <AssetImage
            name="study-renata"
            alt="Manifesto tipográfico de Renata: Pensar, desenhar, construir, em branco sobre vinho."
            :width="1229"
            :height="1536"
          />
          <figcaption class="micro">
            Manifesto visual autoral.<br />Design como prática.
          </figcaption>
        </figure>
        <span class="portrait-note micro" aria-hidden="true"
          >PESSOA.<br />CRIAÇÃO.<br />ESTRATÉGIA.<br />POSSIBILIDADES.</span
        >
      </div>
      <div class="about-copy" data-reveal>
        <p class="hello">Olá, eu sou a</p>
        <h3 class="about-name">Renata<span>,</span></h3>
        <p class="about-role">Desenvolvedora e Designer.</p>
        <h4 class="about-heading">
          Criatividade com<br /><em>repertório técnico.</em>
        </h4>
        <p>
          Encontro no design e no código duas formas de transformar ideias em
          experiências digitais com identidade.
        </p>
        <p>
          Sou estudante de Desenvolvimento de Sistemas no
          <span class="senai">SENAI</span>, com foco em desenvolvimento web,
          interfaces e design digital. No VERSO*, compartilho meus projetos e experimentos e colaboro com João Gustavo na criação de sites.
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
    <div class="about-layout joao-layout">
      <div class="joao-manifesto" data-reveal aria-hidden="true"><span class="micro">CRIATIVIDADE / PLANEJAMENTO / DESENVOLVIMENTO</span><strong>JG<span>*</span></strong><p>Pensar a ideia.<br />Planejar a experiência.<br /><em>Construir juntos.</em></p></div>
      <div class="about-copy" data-reveal><p class="hello">E eu sou o</p><h3 class="about-name joao-name">João<br />Gustavo<span>,</span></h3><p class="about-role">Desenvolvedor em formação.</p><h4 class="about-heading">Criatividade com<br /><em>planejamento.</em></h4><p>Sou estudante de Técnico em Desenvolvimento de Sistemas no <span class="senai">SENAI</span>. Utilizo Next.js, React, HTML, CSS e JavaScript, com interesse em planejar funcionalidades e interfaces que conectem boas ideias à implementação.</p><p>Desenvolvo sites ao lado da Renata, complementando e aprimorando o trabalho da dupla. Participei da Syntax Studio, nosso projeto autoral de e-commerce em desenvolvimento.</p><ul class="joao-tech" aria-label="Tecnologias utilizadas por João Gustavo"><li v-for="tech in ['Next.js','React','HTML','CSS','JavaScript']" :key="tech">{{ tech }}</li></ul><RouterLink to="/projetos/syntax-studio" class="btn btn-outline">Conhecer a Syntax Studio <PhArrowUpRight /></RouterLink></div>
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

.about-portrait :deep(img) {
  width: 100%;
  height: auto;
  aspect-ratio: 15/11;
  object-fit: contain;
  display: block;
}
.about-portrait figcaption {
  position: static;
  padding: 14px 18px;
  font-size: 9px;
}
.portrait-note {
  bottom: -8px;
  right: -15px;
  font-size: 8px;
  padding: 15px;
}
.portrait-composition {
  padding-bottom: 40px;
}

.duo-intro { margin-top:45px; }
.duo-intro h2 { font:600 clamp(43px,5.5vw,88px)/1 var(--display); }
.duo-intro h2 em { font:500 italic 1.05em var(--editorial); color:var(--pink); }
.duo-intro>p { max-width:72ch; margin-top:25px; color:var(--muted); font-size:15px; }
.joao-layout { border-top:1px solid var(--line); padding-top:65px; }
.joao-name { font-size:clamp(80px,8.5vw,140px); }
.joao-manifesto { padding:35px; border:1px solid #ae586b; background:#27141c; transform:rotate(2deg); }
.joao-manifesto>.micro { font-size:9px; color:var(--pink); }
.joao-manifesto strong { display:block; font:500 clamp(110px,15vw,240px)/1 var(--editorial); letter-spacing:-.06em; margin:30px 0; }
.joao-manifesto strong span { color:var(--red-light); }
.joao-manifesto p { font:600 clamp(25px,3vw,45px)/1.15 var(--display); }
.joao-manifesto p em { color:var(--pink); font-family:var(--editorial); }
.joao-tech { display:flex; flex-wrap:wrap; list-style:none; gap:10px; padding:0; margin-top:25px; }
.joao-tech li { font:10px var(--mono); border-bottom:1px solid var(--line); padding:8px 0; margin-right:8px; }
@media(max-width:767px){.duo-intro h2{font-size:42px}.duo-intro>p{font-size:14px}.joao-layout{padding-top:40px}.joao-name{font-size:clamp(80px,23vw,115px)}.joao-manifesto{margin:0 8px;padding:25px}.joao-manifesto strong{font-size:150px}}
</style>
