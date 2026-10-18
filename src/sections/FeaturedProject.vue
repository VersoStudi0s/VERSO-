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
      <span class="micro">01 / 04 <span class="red">— CONCEITO</span></span>
      <h2 id="featured-title">VERSARY</h2>
      <p class="feature-subtitle">Sistema de gestão industrial.</p>
      <div class="feature-tags">
        <span class="tag">UI/UX</span><span class="tag">Dashboard</span>
      </div>
      <div class="feature-problem">
        <h3 class="micro">O ponto de partida</h3>
        <p>
          Organizar dados de operação e ocorrências de máquinas de forma simples
          e visual.
        </p>
      </div>
      <RouterLink to="/projetos/versary" class="text-link"
        >Explorar o conceito <PhArrowUpRight
      /></RouterLink>
    </div>
    <AssetImage
      class="feature-image"
      name="projeto-versary"
      alt="Mockup conceitual do VERSARY: notebook com painel de dados em vermelho e preto."
    />
    <PhPlus
      class="feature-plus red"
      :size="32"
      weight="thin"
      aria-hidden="true"
    />
    <p class="feature-note micro">
      Mockup ilustrativo.<br />Um conceito em construção.
    </p>
  </section>
</template>
<style scoped>
.featured {
  overflow: hidden;
  min-height: 630px;
  isolation: isolate;
}
.section-topline {
  position: relative;
  z-index: 2;
}
.feature-copy {
  position: relative;
  z-index: 2;
  width: 49%;
  padding-top: 36px;
}
.feature-copy > .micro {
  font-size: 8px;
}
.feature-copy h2 {
  font: 700 clamp(54px, 5.3vw, 90px)/1 var(--display);
  margin: 28px 0 13px;
}
.feature-subtitle {
  font-size: 13px;
}
.feature-tags {
  display: flex;
  gap: 7px;
  margin-top: 20px;
}
.feature-problem {
  margin-top: 48px;
  max-width: 255px;
}
.feature-problem h3 {
  color: var(--white);
  font-size: 9px;
}
.feature-problem p {
  font-size: 12px;
  color: var(--muted);
  margin-top: 10px;
  line-height: 1.7;
}
.feature-copy > .text-link {
  margin-top: 28px;
  font-size: 9px;
}
.feature-image {
  position: absolute;
  z-index: -2;
  right: -16%;
  top: 18%;
  width: 90%;
  height: 68%;
}
.feature-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% 50%;
}
.featured::after {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background:
    linear-gradient(90deg, #09090b 0%, #09090be3 23%, #09090b00 67%),
    linear-gradient(0deg, #09090b 4%, #09090b00 35%);
}
.feature-plus {
  position: absolute;
  top: 22%;
  left: 45%;
}
.feature-note {
  position: absolute;
  bottom: 30px;
  right: var(--gutter);
  font-size: 7px;
  text-align: right;
  color: var(--muted);
}
@media (max-width: 1023px) {
  .featured {
    min-height: 610px;
  }
  .feature-copy {
    width: 52%;
  }
  .feature-copy h2 {
    font-size: 62px;
  }
  .feature-image {
    top: 22%;
    right: -24%;
    width: 100%;
    height: 63%;
  }
}
@media (max-width: 767px) {
  .featured {
    min-height: 700px;
  }
  .feature-copy {
    width: 100%;
    padding-top: 10px;
  }
  .feature-copy h2 {
    font-size: 68px;
    margin-top: 22px;
  }
  .feature-subtitle {
    font-size: 12px;
  }
  .feature-image {
    top: 210px;
    width: 130%;
    height: 300px;
    right: -24%;
  }
  .featured::after {
    background: linear-gradient(
      0deg,
      #09090b 0%,
      #09090b 22%,
      #09090b00 57%,
      #09090b00 71%,
      #09090b 90%
    );
  }
  .feature-problem {
    margin-top: 245px;
    max-width: 250px;
  }
  .feature-problem p {
    font-size: 11px;
  }
  .feature-plus {
    top: 125px;
    right: 30px;
    left: auto;
  }
  .feature-note {
    font-size: 6px;
    bottom: 34px;
  }
  .feature-copy > .text-link {
    margin-top: 20px;
    font-size: 8px;
  }
}
</style>
