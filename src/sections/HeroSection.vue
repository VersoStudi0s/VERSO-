<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  PhArrowUpRight,
  PhArrowDown,
  PhPlus,
  PhAsterisk,
} from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
const art = ref<HTMLElement>();
let frame = 0;
function move(event: PointerEvent) {
  if (
    event.pointerType !== "mouse" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    if (art.value)
      art.value.style.transform = `translate3d(${(event.clientX / innerWidth - 0.5) * 10}px,${(event.clientY / innerHeight - 0.5) * 7}px,0)`;
  });
}
onMounted(() => {
  window.addEventListener("pointermove", move, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("pointermove", move);
  cancelAnimationFrame(frame);
});
</script>
<template>
  <section id="inicio" class="hero frame" aria-labelledby="hero-title">
    <div class="hero-art-entry">
      <div ref="art" class="hero-art">
        <AssetImage
          name="hero-editorial"
          :eager="true"
          :width="1229"
          :height="1536"
        />
      </div>
    </div>
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="hero-content">
      <div class="hero-kicker">
        <p class="eyebrow">Creative<br />Digital<br />Studio</p>
        <PhPlus class="red" :size="29" weight="thin" /><span class="micro"
          >Independente por natureza.<br />Criativo por essência.</span
        >
      </div>
      <h1 id="hero-title" aria-label="Ideias que ganham realidade.">
        <span class="title-mask" aria-hidden="true"
          ><span class="ideas">IDEIAS</span></span
        ><span class="title-mask" aria-hidden="true"
          ><span class="become">QUE GANHAM</span></span
        ><span class="title-mask reality-mask" aria-hidden="true"
          ><em>REALIDADE.</em></span
        >
      </h1>
      <div class="hero-description">
        <p>
          DESIGN, DESENVOLVIMENTO<br />E SOLUÇÕES CRIATIVAS<br />COM PROPÓSITO.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn btn-primary" to="/#projetos"
            >Explorar projetos <PhArrowUpRight weight="bold" /></RouterLink
          ><RouterLink class="text-link" to="/#sobre"
            >Conhecer o estúdio <PhArrowUpRight
          /></RouterLink>
        </div>
      </div>
    </div>
    <PhAsterisk class="hero-asterisk" weight="thin" aria-hidden="true" />
    <div class="art-annotation" aria-hidden="true">
      <span class="micro">[ processo criativo ]</span
      ><span>+ criatividade<br />+ estratégia<br />+ intenção</span>
    </div>
    <RouterLink
      to="/#lab"
      class="hero-lab-link"
      aria-label="Código / Forma / Ideia — explorar o laboratório criativo"
      ><AssetImage name="textura-editorial" :width="1536" :height="1536" /><span
        class="micro"
        >CÓDIGO / FORMA / IDEIA</span
      ><span class="hero-lab-arrow"><PhArrowUpRight :size="22" /></span
    ></RouterLink>
    <div class="hero-bottom">
      <RouterLink to="/#projetos" class="scroll-cue"
        ><span class="micro">Scroll<br />para explorar</span
        ><PhArrowDown :size="25" weight="thin" /></RouterLink
      ><span class="construction-line" aria-hidden="true"></span
      ><span class="micro hero-index"
        >PORTFÓLIO — VOL. 01 <span class="red">[2026]</span></span
      >
    </div>
    <div class="hero-art-label micro" aria-hidden="true">
      Projetos<br />Identidade<br />UI/UX<br />Desenvolvimento<br />Experimentos
    </div>
  </section>
</template>
<style scoped>
.hero {
  height: clamp(730px, 65vw, 980px);
  isolation: isolate;
  overflow: hidden;
  background: #09090b;
}
.hero-art-entry {
  position: absolute;
  right: -1.5%;
  top: 4%;
  width: 70%;
  height: 104%;
  z-index: -3;
  mask-image: linear-gradient(90deg, transparent, #000 14%);
  animation: art-reveal 1.3s var(--ease) both;
}
.hero-art {
  width: 100%;
  height: 100%;
  transition: transform 0.8s ease-out;
}
.hero-art :deep(picture),
.hero-art :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 55% 43%;
}
.hero-shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(
      90deg,
      #09090b 0%,
      #09090bf5 10%,
      #09090ba6 34%,
      #09090b00 63%
    ),
    linear-gradient(
      0deg,
      #09090b 0%,
      #09090b00 20%,
      #09090b00 83%,
      #09090b 100%
    );
}
.hero-content {
  position: relative;
  padding: 137px var(--gutter) 0;
}
.hero-kicker {
  display: flex;
  align-items: flex-start;
  gap: 65px;
  margin-bottom: 38px;
}
.hero-kicker .eyebrow {
  font-size: 9px;
  line-height: 1.25;
  letter-spacing: 0.16em;
}
.hero-kicker > span {
  font-size: 8px;
  margin-top: 4px;
  color: #cac2c0;
}
.hero h1 {
  width: 82%;
  position: relative;
  z-index: 2;
  letter-spacing: -0.035em;
  transform: rotate(-4deg);
  transform-origin: 20% 50%;
}
.title-mask {
  display: block;
  overflow: hidden;
  width: max-content;
  max-width: 100%;
  padding-right: 0.025em;
}
.title-mask > span,
.title-mask > em {
  display: block;
  animation: title-reveal 0.95s var(--ease) both;
}
.ideas {
  font: 700 clamp(110px, 10.7vw, 176px)/0.84 var(--display);
  animation-delay: 0.2s !important;
}
.become {
  font: 300 clamp(75px, 9.15vw, 148px)/1 var(--display);
  letter-spacing: -0.014em;
  animation-delay: 0.32s !important;
}
.reality-mask {
  margin-left: -8px;
  overflow: visible;
}
.reality-mask em {
  font: 500 italic clamp(130px, 12.2vw, 205px)/0.81 var(--editorial);
  letter-spacing: -0.065em;
  color: var(--red);
  animation-delay: 0.44s !important;
  white-space: nowrap;
  transform-origin: left center;
}
.hero-description {
  margin: 32px 0 0 11.2%;
  animation: fade-in 1s 0.8s both;
}
.hero-description > p {
  font: 400 clamp(11px, 1vw, 15px)/1.6 var(--mono);
  letter-spacing: 0.075em;
}
.hero-actions {
  display: flex;
  gap: 35px;
  align-items: center;
  margin-top: 24px;
}
.hero-actions .btn {
  min-width: 250px;
  font-size: 12px;
}
.hero-actions .text-link {
  font-size: 11px;
}
.hero-bottom {
  position: absolute;
  bottom: 30px;
  left: var(--gutter);
  right: var(--gutter);
  display: flex;
  align-items: flex-end;
  gap: 45px;
  animation: fade-in 1s 1.2s both;
}
.scroll-cue {
  display: flex;
  gap: 65px;
  align-items: center;
}
.scroll-cue .micro {
  font-size: 8px;
}
.scroll-cue svg {
  transition: transform 0.25s;
}
.scroll-cue:hover svg {
  transform: translateY(5px);
}
.construction-line {
  height: 1px;
  background: #73343c;
  width: 32%;
  position: relative;
  margin-bottom: 8px;
}
.construction-line::before,
.construction-line::after {
  content: "";
  position: absolute;
  top: -3px;
  width: 1px;
  height: 7px;
  background: var(--red);
}
.construction-line::after {
  right: 0;
}
.hero-index {
  margin-left: auto;
  margin-bottom: 3px;
  font-size: 8px;
}
.hero-asterisk {
  position: absolute;
  left: -18px;
  top: 43%;
  font-size: 96px;
  color: var(--red);
  transform: rotate(-12deg);
  animation: fade-in 1s 1s both;
}
.art-annotation {
  position: absolute;
  top: 26%;
  right: 28%;
  padding: 16px;
  border: 1px solid #b1a9aa70;
  border-radius: 3px;
  background: #0c090bb3;
  backdrop-filter: blur(7px);
  transform: rotate(-7deg);
  animation: fade-in 1s 1s both;
}
.art-annotation > span:last-child {
  font: 10px/1.6 var(--mono);
  display: block;
  margin-top: 10px;
  color: var(--pink);
}
.art-annotation .micro {
  font-size: 6px;
}
.hero-lab-link {
  position: absolute;
  bottom: 10%;
  right: 22%;
  width: 170px;
  height: 131px;
  border: 1px solid #9f6970;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  isolation: isolate;
  animation: fade-in 1s 1.15s both;
}
.hero-lab-link :deep(picture) {
  position: absolute;
  inset: 0;
  z-index: -1;
}
.hero-lab-link :deep(img) {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.65);
  transition:
    filter 0.3s,
    transform 0.5s;
}
.hero-lab-link:hover :deep(img) {
  transform: scale(1.08);
  filter: brightness(1);
}
.hero-lab-link > .micro {
  position: absolute;
  top: 12px;
  left: 12px;
  color: var(--white);
  font-size: 7px;
}
.hero-lab-arrow {
  background: var(--white);
  color: var(--black);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  margin-left: auto;
}
.hero-art-label {
  position: absolute;
  right: 4%;
  bottom: 17%;
  color: #d2cac7;
  font-size: 8px;
  line-height: 1.65;
  animation: fade-in 1s 1.2s both;
}
@keyframes title-reveal {
  from {
    transform: translateY(115%);
    opacity: 0.3;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes art-reveal {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media (min-width: 1100px) {
  .reality-mask {
    transform: scaleX(0.88);
    transform-origin: left center;
  }
  .reality-mask em {
    font-size: clamp(150px, 14vw, 218px);
  }
}
@media (min-width: 1700px) {
  .hero-content {
    padding-top: 150px;
  }
  .hero-kicker {
    margin-bottom: 48px;
  }
  .hero-description {
    margin-top: 40px;
  }
}
@media (max-width: 1150px) {
  .hero {
    height: 770px;
  }
  .hero-content {
    padding-top: 134px;
  }
  .hero h1 {
    width: 90%;
  }
  .hero-art-entry {
    width: 73%;
    right: -9%;
    top: 7%;
  }
  .hero-actions {
    gap: 25px;
  }
  .hero-actions .btn {
    min-width: 200px;
  }
  .hero-description {
    margin-top: 36px;
  }
  .hero-lab-link {
    right: 13%;
    bottom: 12%;
    width: 140px;
    height: 115px;
  }
  .art-annotation {
    right: 16%;
    top: 24%;
  }
  .hero-art-label {
    display: none;
  }
}
@media (max-width: 767px) {
  .title-mask > span,
  .title-mask > em {
    animation-duration: 0.5s;
  }
  .ideas {
    animation-delay: 0.08s !important;
  }
  .become {
    animation-delay: 0.16s !important;
  }
  .reality-mask em {
    animation-delay: 0.24s !important;
  }
  .hero-art-entry {
    animation-duration: 0.8s;
  }
  .hero-description {
    animation-duration: 0.6s;
    animation-delay: 0.5s;
  }
  .hero {
    height: 890px;
  }
  .hero-content {
    padding: 111px 21px 0;
  }
  .hero-kicker {
    gap: 38px;
    margin-bottom: 30px;
  }
  .hero-kicker .eyebrow {
    font-size: 8px;
  }
  .hero-kicker > span {
    font-size: 6px;
    margin-left: auto;
    max-width: 115px;
  }
  .hero-kicker svg {
    width: 22px;
  }
  .hero h1 {
    width: 100%;
    transform: none;
  }
  .ideas {
    font-size: clamp(87px, 25vw, 170px);
    line-height: 0.85;
  }
  .become {
    font-size: clamp(57px, 16.55vw, 112px);
    line-height: 1.12;
  }
  .reality-mask {
    margin-left: -3px;
  }
  .reality-mask em {
    font-size: clamp(59px, 18.7vw, 138px);
    letter-spacing: -0.07em;
    line-height: 0.9;
  }
  .hero-art-entry {
    top: 255px;
    right: -8%;
    width: 99%;
    height: 475px;
  }
  .hero-art :deep(img) {
    object-fit: contain;
    object-position: center;
  }
  .hero-shade {
    background: linear-gradient(
      0deg,
      #09090b 0%,
      #09090b 13%,
      #09090b00 34%,
      #09090b00 57%,
      #09090b70 69%,
      #09090b 83%
    );
  }
  .hero-description {
    position: absolute;
    top: 689px;
    left: 22px;
    right: 22px;
    margin: 0;
    z-index: 3;
  }
  .hero-description > p {
    font-size: 9px;
    line-height: 1.6;
  }
  .hero-description > p br:first-child {
    display: none;
  }
  .hero-actions {
    gap: 20px;
    align-items: center;
    margin-top: 20px;
    justify-content: space-between;
  }
  .hero-actions .btn {
    font-size: 8px;
    min-width: 0;
    padding: 15px 13px;
    gap: 10px;
  }
  .hero-actions .text-link {
    font-size: 7px;
    gap: 6px;
  }
  .hero-actions .text-link svg {
    width: 14px;
  }
  .hero-bottom {
    bottom: 24px;
    left: 22px;
    right: 22px;
    gap: 25px;
  }
  .scroll-cue {
    gap: 25px;
  }
  .scroll-cue .micro {
    font-size: 7px;
  }
  .hero-index {
    font-size: 6px;
    max-width: 86px;
    text-align: right;
  }
  .construction-line {
    width: auto;
    flex: 1;
  }
  .hero-asterisk {
    top: 39%;
    left: 10px;
    font-size: 62px;
  }
  .hero-lab-link {
    width: 105px;
    height: 86px;
    right: 47%;
    bottom: 24%;
    padding: 9px;
  }
  .hero-lab-link > .micro {
    font-size: 5px;
    top: 8px;
    left: 8px;
  }
  .hero-lab-arrow {
    width: 27px;
    height: 27px;
  }
  .hero-lab-arrow svg {
    width: 17px;
  }
  .art-annotation {
    top: 49%;
    right: 7%;
    padding: 10px;
  }
  .art-annotation > span:last-child {
    font-size: 8px;
  }
  .art-annotation .micro {
    font-size: 5px;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .hero {
    height: 1050px;
  }
  .hero-art-entry {
    top: 320px;
    height: 540px;
  }
  .hero-description {
    top: 845px;
  }
  .hero-lab-link {
    bottom: 22%;
  }
}
@media (max-width: 359px) {
  .hero {
    height: 860px;
  }
  .hero-content {
    padding-left: 16px;
    padding-right: 16px;
  }
  .hero-kicker {
    gap: 25px;
  }
  .hero-kicker > span {
    max-width: 104px;
  }
  .hero-art-entry {
    top: 250px;
    height: 450px;
  }
  .hero-description {
    top: 657px;
    left: 16px;
    right: 16px;
  }
  .hero-actions {
    gap: 9px;
  }
  .hero-actions .text-link {
    font-size: 6px;
  }
  .hero-actions .btn {
    font-size: 7px;
    padding: 14px 10px;
  }
  .hero-bottom {
    left: 16px;
    right: 16px;
  }
  .hero-lab-link {
    bottom: 25%;
  }
}
</style>
