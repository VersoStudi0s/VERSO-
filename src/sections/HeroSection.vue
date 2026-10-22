<script setup lang="ts">
import {
  PhArrowUpRight,
  PhArrowDown,
  PhPlus,
  PhAsterisk,
  PhArrowRight,
} from "@phosphor-icons/vue";
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
    <div class="hero-texture" aria-hidden="true">
      <picture>
        <source
          media="(max-width: 767px)"
          srcset="/images/textura-editorial-480.webp"
        />
        <img
          src="/images/textura-editorial.webp"
          alt=""
          width="1536"
          height="1536"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>
    <div class="hero-art-entry" aria-hidden="true">
      <div class="hero-art">
        <AssetImage
          name="hero-editorial"
          :eager="true"
          :width="1229"
          :height="1536"
        />
      </div>
    </div>
    <div class="hero-shade" aria-hidden="true"></div>
    <div class="hero-chrome-entry" aria-hidden="true">
      <img
        class="hero-chrome"
        src="/images/escultura-cromada-480.webp"
        alt=""
        width="480"
        height="480"
        decoding="async"
      />
    </div>
    <div class="hero-content">
      <div class="hero-kicker">
        <span class="eyebrow">Creative<br />Digital<br />Studio</span
        ><PhPlus :size="28" weight="thin" aria-hidden="true" /><span
          class="micro kicker-note"
          >Design independente.<br />Ideias em movimento.</span
        >
      </div>
      <h1 id="hero-title" aria-label="Ideias que ganham realidade.">
        <span class="title-mask" aria-hidden="true"
          ><span class="ideas">IDEIAS</span></span
        >
        <span class="title-mask become-mask" aria-hidden="true"
          ><span class="become">QUE GANHAM</span></span
        >
        <span class="title-mask reality-mask" aria-hidden="true"
          ><em>REALIDADE.</em></span
        >
      </h1>
      <div class="hero-description">
        <p>
          Design, desenvolvimento<br />e soluções criativas<br />com propósito.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn btn-primary" to="/#projetos"
            >Explorar projetos <PhArrowUpRight weight="bold" /></RouterLink
          ><RouterLink class="text-link" to="/#sobre"
            >Conhecer o estúdio <PhArrowUpRight
          /></RouterLink>
        </div>
        <span class="hero-signature micro"
          >Web · Interfaces · Identidade · Experimentos</span
        >
      </div>
    </div>
    <PhAsterisk class="hero-asterisk" weight="thin" aria-hidden="true" />
    <div class="art-annotation" aria-hidden="true">
      <span class="micro">[ processo criativo ]</span
      ><span>+ criatividade<br />+ estratégia<br />+ código</span>
    </div>
    <RouterLink
      to="/#lab"
      class="hero-lab"
      aria-label="01 / Experimentar — explorar o laboratório criativo"
      ><span class="micro">01 / EXPERIMENTAR</span
      ><span class="lab-ticket-image" aria-hidden="true"></span
      ><PhArrowRight :size="24" weight="light"
    /></RouterLink>
    <div class="hero-bottom">
      <RouterLink to="/#projetos" class="scroll-cue"
        ><span class="micro">Scroll<br />para explorar</span
        ><PhArrowDown :size="25" weight="thin" /></RouterLink
      ><span class="construction-line" aria-hidden="true"></span
      ><span class="micro hero-index"
        >EST. VERSO* / RENATA<br />CRIATIVIDADE EM CONSTRUÇÃO</span
      >
    </div>
  </section>
</template>
<style scoped>
.hero {
  min-height: 820px;
  height: min(66vw, 1240px);
  isolation: isolate;
  overflow: hidden;
  background: #0b090c;
}
.hero-texture {
  position: absolute;
  inset: 0;
  z-index: -5;
  opacity: 0.35;
}
.hero-texture :deep(picture),
.hero-texture :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 24% 45%;
}
.hero-art-entry {
  position: absolute;
  right: -3%;
  top: 1%;
  width: 75%;
  height: 108%;
  z-index: -3;
  animation: art-cut 1.35s var(--ease) both;
}
.hero-art {
  width: 100%;
  height: 100%;
  transform: translate3d(var(--depth-x, 0px), var(--depth-y, 0px), 0);
  transition: transform 0.65s ease-out;
}
.hero-art :deep(picture),
.hero-art :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}
.hero-art :deep(img) {
  object-fit: contain;
  object-position: right center;
  mask-image: linear-gradient(90deg, transparent, #000 22%);
}
.hero-shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(
      90deg,
      #0b090c 0%,
      #0b090cc4 23%,
      #0b090c33 50%,
      transparent 75%
    ),
    linear-gradient(
      0deg,
      #0b090c 0%,
      transparent 24%,
      transparent 86%,
      #0b090c 100%
    );
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 145px var(--gutter) 90px;
  width: 80%;
}
.hero-kicker {
  display: flex;
  gap: 55px;
  align-items: center;
  margin-bottom: 28px;
}
.hero-kicker .eyebrow {
  font-size: 9px;
  line-height: 1.3;
  letter-spacing: 0.17em;
}
.hero-kicker svg {
  color: var(--red);
}
.kicker-note {
  font-size: 8px;
  letter-spacing: 0.05em;
}
.hero h1 {
  transform: rotate(-4deg);
  transform-origin: left center;
  letter-spacing: -0.035em;
}
.title-mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.05em;
}
.title-mask > * {
  display: block;
  animation: title-reveal 1s var(--ease) both;
}
.ideas {
  font: 700 clamp(108px, 10.8vw, 210px) / 0.86 var(--display);
}
.become {
  font: 300 clamp(64px, 7.8vw, 148px) / 1 var(--display);
  white-space: nowrap;
  animation-delay: 0.12s;
}
.reality-mask {
  overflow: visible;
}
.reality-mask em {
  width: max-content;
  max-width: 100%;
  font: 700 italic clamp(130px, 12.5vw, 240px) / 0.86 var(--editorial);
  letter-spacing: -0.07em;
  color: var(--red);
  white-space: nowrap;
  animation-delay: 0.25s;
}
.hero-description {
  margin: 55px 0 0 16%;
  max-width: 560px;
  animation: copy-reveal 0.8s 0.4s both;
}
.hero-description > p {
  font: 11px/1.6 var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 26px;
  margin-top: 25px;
}
.hero-actions .btn {
  min-height: 55px;
  padding: 17px 24px;
  gap: 24px;
  border-radius: 4px;
  font-size: 10px;
}
.hero-actions .text-link {
  font-size: 9px;
  min-height: 44px;
  color: var(--white);
}
.hero-signature {
  display: block;
  font-size: 8px;
  margin-top: 20px;
}
.hero-chrome-entry {
  position: absolute;
  left: 43%;
  bottom: -15%;
  width: 34%;
  z-index: -1;
  animation: chrome-entry 1.3s 0.35s var(--ease) both;
  pointer-events: none;
}
.hero-chrome {
  width: 100%;
  transform: perspective(900px)
    translate3d(
      calc(var(--depth-x, 0px) * -1),
      calc(var(--depth-y, 0px) * -1),
      0
    )
    rotate(-24deg) rotateY(var(--tilt-y, 0deg));
  transition: transform 0.7s ease-out;
  filter: brightness(0.8);
}
.hero-asterisk {
  position: absolute;
  top: 39%;
  left: -12px;
  width: 80px;
  height: 80px;
  color: var(--red);
  transform: rotate(-17deg);
  z-index: 3;
  pointer-events: none;
}
.art-annotation {
  position: absolute;
  left: 44%;
  top: 18%;
  padding: 18px;
  border: 1px solid #aaa0a077;
  background: #0a090bc9;
  backdrop-filter: blur(7px);
  transform: rotate(-7deg);
  z-index: 1;
  animation: copy-reveal 0.85s 0.6s both;
}
.art-annotation .micro {
  font-size: 7px;
}
.art-annotation > span:last-child {
  display: block;
  font: 10px/1.8 var(--mono);
  color: var(--pink);
  margin-top: 10px;
}
.hero-lab {
  position: absolute;
  right: 7%;
  bottom: 11%;
  width: 172px;
  height: 145px;
  border: 1px solid #b1a9aa88;
  background: #141015c9;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 15px;
  transform: rotate(4deg);
  transition:
    transform 0.4s,
    border-color 0.3s;
}
.hero-lab > .micro {
  position: absolute;
  top: 13px;
  left: 15px;
  font-size: 8px;
  color: var(--white);
}
.lab-ticket-image {
  width: 77px;
  height: 85px;
  background: url("/images/textura-editorial-480.webp") center/cover;
  border: 1px solid #bb5d6e;
}
.hero-lab > svg {
  background: var(--white);
  color: var(--black);
  padding: 9px;
  box-sizing: content-box;
  border-radius: 50%;
}
.hero-lab:hover,
.hero-lab:focus-visible {
  transform: rotate(0deg) translateY(-7px);
  border-color: var(--red);
}
.hero-bottom {
  position: absolute;
  bottom: 24px;
  left: var(--gutter);
  right: var(--gutter);
  display: flex;
  align-items: center;
  gap: 40px;
  z-index: 2;
}
.scroll-cue {
  display: flex;
  align-items: center;
  gap: 70px;
  min-height: 44px;
}
.scroll-cue .micro {
  font-size: 8px;
  color: var(--muted);
}
.scroll-cue svg {
  color: var(--white);
  transition: transform 0.3s;
}
.scroll-cue:hover svg {
  transform: translateY(5px);
}
.construction-line {
  height: 1px;
  background: #77313c;
  width: 31%;
}
.hero-index {
  font-size: 7px;
  margin-left: auto;
}
@keyframes title-reveal {
  from {
    transform: translateY(115%) rotate(3deg);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
@keyframes art-cut {
  from {
    clip-path: inset(0 0 100% 0);
    transform: scale(1.08);
    opacity: 0.1;
  }
  to {
    clip-path: inset(0);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes chrome-entry {
  from {
    opacity: 0;
    transform: translateY(90px) rotate(20deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes copy-reveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (min-width: 1600px) {
  .hero-content {
    padding-top: 165px;
  }
  .hero-description {
    margin-top: 45px;
  }
}
@media (min-width: 768px) and (max-width: 1100px) {
  .hero {
    height: 820px;
  }
  .hero-content {
    width: 92%;
    padding-top: 140px;
  }
  .hero-art-entry {
    width: 92%;
    right: -13%;
    top: 6%;
    height: 100%;
  }
  .ideas {
    font-size: 114px;
  }
  .become {
    font-size: 66px;
  }
  .reality-mask em {
    font-size: 145px;
  }
  .hero-description {
    margin-left: 6%;
  }
  .art-annotation {
    left: auto;
    right: 4%;
    top: 16%;
  }
  .hero-lab {
    right: 3%;
    width: 132px;
    height: 125px;
  }
  .hero-chrome-entry {
    left: 48%;
    width: 46%;
    bottom: -9%;
  }
  .kicker-note {
    display: none;
  }
}
@media (max-width: 767px) {
  .hero {
    min-height: 790px;
    height: auto;
  }
  .hero-content {
    width: 100%;
    padding: 112px 20px 165px;
  }
  .hero-kicker {
    gap: 28px;
    margin-bottom: 30px;
  }
  .hero-kicker .eyebrow {
    font-size: 8px;
  }
  .hero-kicker svg {
    width: 22px;
  }
  .kicker-note {
    display: none;
  }
  .hero h1 {
    transform: rotate(-3deg);
  }
  .ideas {
    font-size: clamp(86px, 23vw, 160px);
  }
  .become {
    font-size: clamp(42px, 14.5vw, 100px);
  }
  .reality-mask em {
    font-size: clamp(52px, 17.8vw, 125px);
    letter-spacing: -0.075em;
  }
  .hero-art-entry {
    top: 175px;
    right: -10%;
    width: 107%;
    height: 620px;
  }
  .hero-art :deep(img) {
    object-fit: cover;
    object-position: 55% center;
    mask-image: linear-gradient(90deg, transparent, #000 28%);
  }
  .hero-shade {
    background:
      linear-gradient(90deg, #0b090cd9 0%, #0b090c8a 35%, transparent 80%),
      linear-gradient(
        0deg,
        #0b090c 0%,
        transparent 30%,
        transparent 63%,
        #0b090c 95%
      );
  }
  .hero-texture {
    opacity: 0.35;
  }
  .hero-description {
    margin: 32px 0 0;
    max-width: 310px;
  }
  .hero-description > p {
    font-size: 10px;
    letter-spacing: 0.06em;
    max-width: 24ch;
  }
  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-top: 22px;
  }
  .hero-actions .btn {
    min-height: 50px;
    padding: 15px 19px;
  }
  .hero-signature {
    font-size: 7px;
    max-width: 200px;
  }
  .hero-asterisk {
    width: 45px;
    height: 45px;
    top: 32%;
    left: auto;
    right: 8px;
  }
  .art-annotation {
    display: none;
  }
  .hero-lab {
    right: 16px;
    bottom: 90px;
    width: 91px;
    height: 101px;
    padding: 10px;
    transform: rotate(6deg);
  }
  .hero-lab .micro {
    font-size: 6px;
    left: 8px;
    top: 8px;
  }
  .lab-ticket-image {
    width: 30px;
    height: 50px;
  }
  .hero-lab > svg {
    width: 16px;
    height: 16px;
    padding: 6px;
  }
  .hero-chrome-entry {
    left: 34%;
    bottom: -1%;
    width: 60%;
    opacity: 0.7;
  }
  .hero-bottom {
    bottom: 17px;
    left: 20px;
    right: 20px;
    gap: 20px;
  }
  .scroll-cue {
    gap: 24px;
  }
  .construction-line {
    flex: 1;
  }
  .hero-index {
    display: none;
  }
}
@media (max-width: 359px) {
  .hero-content {
    padding-inline: 16px;
  }
  .reality-mask em {
    font-size: 17.4vw;
  }
  .hero-art-entry {
    right: -16%;
  }
  .hero-lab {
    bottom: 73px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero-art,
  .hero-chrome {
    transform: none;
  }
}
</style>
