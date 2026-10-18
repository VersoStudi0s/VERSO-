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
      <span class="eyebrow">Sobre mim</span
      ><span class="section-number">[05]</span>
    </div>
    <div class="about-layout">
      <figure class="about-portrait">
        <AssetImage
          name="retrato-editorial"
          alt="Composição artística de perfil em luz vermelha, usada como referência visual."
          :width="1229"
          :height="1536"
        />
        <div class="portrait-type editorial" aria-hidden="true">
          mais<br />que<br />design_
        </div>
        <figcaption class="micro">
          Referência visual editorial.<br />Não é um retrato de Renata.
        </figcaption>
      </figure>
      <div class="about-copy">
        <p class="hello">Olá, eu sou a</p>
        <h2 id="about-title">Renata<span>,</span></h2>
        <p class="about-role">Desenvolvedora e Designer.</p>
        <p>
          Encontro no design e no código duas formas de transformar ideias em
          experiências digitais com identidade.
        </p>
        <p>
          Sou estudante do <span class="senai">SENAI</span>, desenvolvedora e
          designer em formação. Gosto de explorar, aprender e construir soluções
          que façam sentido para quem usa.
        </p>
        <PhPlus
          class="about-plus red"
          :size="32"
          weight="thin"
          aria-hidden="true"
        /><button
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
          <span class="micro red">Em constante construção</span>
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
.about-layout {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  gap: 35px;
  align-items: center;
}
.about-portrait {
  position: relative;
  transform: rotate(-4deg);
  margin: 0 0 0 5px;
  border: 1px solid #8e4853;
  border-radius: 2px;
  align-self: start;
}
.about-portrait :deep(img) {
  aspect-ratio: 0.73;
  width: 100%;
  height: auto;
  object-fit: cover;
}
.portrait-type {
  position: absolute;
  bottom: 58px;
  left: 17px;
  font-size: 44px;
  color: var(--pink);
  line-height: 0.78;
  letter-spacing: -2px;
}
.about-portrait figcaption {
  position: absolute;
  bottom: 14px;
  left: 13px;
  background: #09090bdb;
  padding: 8px;
  font-size: 6px;
  color: var(--white);
}
.about-copy {
  position: relative;
}
.hello {
  font-size: 17px;
  line-height: 1.3;
}
.about-copy h2 {
  font: 500 clamp(62px, 6vw, 96px)/0.85 var(--editorial);
  letter-spacing: -0.055em;
  margin-top: 10px;
}
.about-copy h2 span {
  color: var(--red);
}
.about-role {
  font: 500 10px var(--mono);
  color: var(--red-light);
  text-transform: uppercase;
  margin: 17px 0 24px;
  line-height: 1.5;
}
.about-copy > p:not(.hello):not(.about-role) {
  font-size: 12px;
  line-height: 1.7;
  color: var(--muted);
  margin-top: 16px;
}
.senai {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.about-copy .btn {
  margin-top: 24px;
  width: 100%;
  font-size: 8px;
  gap: 10px;
  padding: 13px;
  min-height: 44px;
}
.about-plus {
  position: absolute;
  right: 0;
  top: -30px;
}
.trajectory {
  padding: 18px 0 0;
  border-top: 1px solid var(--line);
  margin-top: 20px;
}
.trajectory p {
  color: var(--muted);
  font-size: 12px;
  margin-top: 10px;
}
@media (max-width: 1100px) {
  .about-layout {
    gap: 23px;
  }
  .about-copy > p:not(.hello):not(.about-role) {
    font-size: 11px;
  }
  .about-role {
    font-size: 8px;
  }
  .about-copy h2 {
    font-size: 72px;
  }
  .hello {
    font-size: 14px;
  }
}
@media (max-width: 767px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 38px;
  }
  .about-portrait {
    width: 85%;
    max-width: 340px;
    margin: 10px auto 0;
  }
  .about-portrait :deep(img) {
    aspect-ratio: 0.85;
    object-fit: cover;
    object-position: 50% 25%;
  }
  .about-copy {
    padding: 0 3px;
  }
  .about-copy h2 {
    font-size: 85px;
  }
  .hello {
    font-size: 17px;
  }
  .about-role {
    font-size: 10px;
  }
  .about-copy > p:not(.hello):not(.about-role) {
    font-size: 13px;
  }
  .about-copy .btn {
    font-size: 9px;
    max-width: 300px;
    margin-top: 27px;
  }
  .about-plus {
    top: 20px;
    right: 3px;
  }
}
</style>
