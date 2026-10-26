<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import {
  PhAsterisk,
  PhPause,
  PhPlay,
  PhArrowUpRight,
} from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
import { usePointerDepth } from "../composables/usePointerDepth";
const { surface, move, reset } = usePointerDepth();
const props = withDefaults(
  defineProps<{ anchor?: string; enabled?: boolean }>(),
  { anchor: "lab", enabled: true },
);
const mode = ref("Forma"),
  playing = ref(props.enabled),
  reduced = ref(false),
  finished = ref(false),
  iteration = ref(0);
let preference: MediaQueryList;
const modes = ["Forma", "Tipo", "Composição"];
const descriptions: Record<string, string> = {
  Forma:
    "Uma grade, nove módulos. Transformações CSS exploram ritmo, alinhamento e profundidade.",
  Tipo: "Ritmo visual com tipografia cinética. A palavra se move, a leitura continua.",
  Composição:
    "Contraste e proporção: uma composição editorial feita de módulos e cor.",
};
function updateMotion() {
  reduced.value = preference.matches;
  if (reduced.value) playing.value = false;
}
watch(
  () => props.enabled,
  (enabled) => {
    playing.value = enabled && !reduced.value;
    if (playing.value) {
      finished.value = false;
      iteration.value++;
    }
  },
);
function toggle() {
  if (!reduced.value) {
    if (!playing.value && finished.value) {
      iteration.value++;
      finished.value = false;
    }
    playing.value = !playing.value;
  }
}
watch(mode, () => {
  finished.value = false;
});
function finishAnimation() {
  playing.value = false;
  finished.value = true;
}
onMounted(() => {
  preference = matchMedia("(prefers-reduced-motion: reduce)");
  updateMotion();
  preference.addEventListener("change", updateMotion);
});
onBeforeUnmount(() => preference?.removeEventListener("change", updateMotion));
</script>
<template>
  <section
    :id="props.anchor"
    class="lab frame section-pad reveal"
    ref="surface"
    @pointermove="move"
    @pointerleave="reset"
    :class="{ paused: !playing, reduced }"
    aria-labelledby="lab-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Laboratório criativo / movimento em estudo</span
      ><span class="section-number">[06]</span>
    </div>
    <div class="lab-texture" aria-hidden="true"></div>
    <div class="lab-copy" data-reveal>
      <h2 id="lab-title">LAB<PhAsterisk weight="thin" aria-hidden="true" /></h2>
      <p>
        Um espaço para testar ideias,<br />explorar efeitos e registrar<br />processos
        criativos.
      </p>
    </div>
    <div
      class="lab-stage"
      :key="iteration"
      aria-hidden="true"
      @animationend="finishAnimation"
    >
      <div v-if="mode === 'Forma'" class="lab-object">
        <span v-for="n in 9" :key="n"></span>
      </div>
      <span v-else-if="mode === 'Tipo'" class="kinetic-word"
        >IDEIA<br /><em>em ação.</em></span
      ><AssetImage
        v-else
        class="lab-collage"
        name="study-lab-grid"
        :width="1536"
        :height="1536"
      />
    </div>
    <span class="lab-coordinate coordinate-top micro" aria-hidden="true"
      >X / Y / Z<br />ESTUDO DE MODULAÇÃO</span
    >
    <span class="lab-coordinate coordinate-bottom micro" aria-hidden="true"
      >FORMA. MOVIMENTO.<br />OUTRAS POSSIBILIDADES.</span
    >
    <div class="lab-controls">
      <div class="lab-modes" role="group" aria-label="Selecionar experimento">
        <button
          v-for="item in modes"
          :key="item"
          :aria-pressed="mode === item"
          :class="{ active: mode === item }"
          @click="mode = item"
        >
          {{ item }}
        </button>
      </div>
      <button
        class="motion-toggle"
        :disabled="reduced"
        :aria-label="
          reduced
            ? 'Movimento reduzido pelo sistema'
            : playing
              ? 'Pausar movimento'
              : 'Ativar movimento'
        "
        @click="toggle"
      >
        <PhPause v-if="playing" :size="16" /><PhPlay
          v-else
          :size="16"
        /><span>{{
          reduced ? "Movimento reduzido" : playing ? "Pausar" : "Ativar"
        }}</span>
      </button>
    </div>
    <p class="lab-description" aria-live="polite">{{ descriptions[mode] }}</p>
    <RouterLink to="/projetos/lab-movimento" class="text-link"
      >Sobre o experimento <PhArrowUpRight
    /></RouterLink>
  </section>
</template>
<style scoped>
.lab {
  overflow: hidden;
  isolation: isolate;
  min-height: 720px;
}
.lab-texture {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(90deg, transparent 0 79px, #ffffff22 79px 80px),
    repeating-linear-gradient(0deg, transparent 0 79px, #ffffff22 79px 80px);
  opacity: 0.12;
  z-index: -2;
}
.lab-copy {
  position: relative;
  z-index: 2;
  pointer-events: none;
  padding-top: 32px;
}
.lab-copy h2 {
  font: 500 italic clamp(150px, 20vw, 340px) / 0.8 var(--editorial);
  display: flex;
  gap: 14px;
  align-items: start;
  letter-spacing: -0.075em;
}
.lab-copy h2 svg {
  width: 80px;
  height: 80px;
  color: var(--red);
  transform: rotate(15deg);
  margin-top: 15px;
}
.lab-copy > p {
  font-size: 16px;
  line-height: 1.7;
  margin-top: 35px;
  max-width: 32ch;
}
.lab-stage {
  position: absolute;
  right: -3%;
  top: 20px;
  width: 63%;
  height: 95%;
  z-index: -1;
  display: grid;
  place-items: center;
  transform: perspective(1100px)
    translate3d(var(--depth-x, 0px), var(--depth-y, 0px), 0)
    rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  transition: transform 0.7s ease-out;
}
.lab-object {
  width: 93%;
  animation: float-object 4.8s var(--ease) 1 both;
}
.lab-object :deep(img) {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 25px 45px #ae183630);
}
.lab-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  max-width: 47%;
  margin-top: 38px;
  position: relative;
  z-index: 2;
}
.lab-modes {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.lab-modes button {
  font: 10px var(--mono);
  text-transform: uppercase;
  border: 1px solid var(--control-line);
  border-radius: 2px;
  min-height: 44px;
  padding: 10px 13px;
  background: #0d0b0ee8;
  transition:
    color 0.2s,
    background 0.2s,
    border-color 0.2s;
}
.lab-modes button.active {
  background: var(--red);
  border-color: var(--red);
  color: var(--black);
}
.motion-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  min-height: 44px;
  font: 10px var(--mono);
  color: var(--white);
  background: #0d0b0ee8;
}
.motion-toggle:disabled {
  cursor: default;
  color: var(--muted);
}
.lab-description {
  position: relative;
  z-index: 2;
  font-size: 12px;
  color: var(--muted);
  margin-top: 19px;
  max-width: 38ch;
  min-height: 40px;
}
.lab > .text-link {
  position: relative;
  z-index: 2;
  font-size: 10px;
  color: var(--red-light);
  min-height: 44px;
  margin-top: 16px;
}
.lab-coordinate {
  position: absolute;
  z-index: 1;
  font-size: 8px;
  border: 1px solid #a5979c88;
  background: #0d0b0ebf;
  padding: 16px;
  color: var(--pink);
  pointer-events: none;
}
.coordinate-top {
  top: 19%;
  right: 9%;
  transform: rotate(7deg);
}
.coordinate-bottom {
  bottom: 10%;
  right: 4%;
  transform: rotate(-4deg);
}
.kinetic-word {
  font: 700 clamp(90px, 10vw, 160px) / 0.8 var(--display);
  animation: kinetic 4s ease-in-out 1 both;
  color: var(--red);
  text-align: center;
  transform: rotate(-8deg);
}
.kinetic-word em {
  font: 500 italic 0.9em/0.8 var(--editorial);
  color: var(--white);
}
.lab-collage {
  width: 70%;
  transform: rotate(7deg);
  animation: collage 4s ease-in-out 1 both;
  border: 1px solid var(--control-line);
}
.lab-collage :deep(img) {
  width: 100%;
  height: auto;
}
.paused .lab-stage :deep(*),
.paused .lab-stage > * {
  animation-play-state: paused !important;
}
.reduced .lab-stage > * {
  animation: none !important;
}
@keyframes float-object {
  0% {
    transform: translateY(30px) rotate(-15deg) scale(0.9);
  }
  45% {
    transform: translateY(-20px) rotate(10deg) scale(1);
  }
  100% {
    transform: translateY(0) rotate(-5deg) scale(1);
  }
}
@keyframes kinetic {
  0%,
  100% {
    transform: rotate(-8deg) translateY(0);
    letter-spacing: -3px;
  }
  50% {
    transform: rotate(-3deg) translateY(-20px);
    letter-spacing: 6px;
  }
}
@keyframes collage {
  0%,
  100% {
    transform: rotate(7deg) scale(0.95);
  }
  50% {
    transform: rotate(-4deg) scale(1.03);
  }
}
@media (max-width: 1023px) {
  .lab {
    min-height: 650px;
  }
  .lab-copy > p {
    font-size: 14px;
  }
  .lab-stage {
    width: 62%;
    right: -7%;
  }
  .lab-controls {
    max-width: 49%;
  }
  .lab-description {
    max-width: 32ch;
  }
  .coordinate-top {
    top: 15%;
    right: 3%;
  }
}
@media (max-width: 767px) {
  .lab-texture {
    background-size: 50% 50%;
  }
  .lab {
    min-height: 0;
  }
  .lab > .section-topline {
    gap: 16px;
  }
  .lab > .section-topline .eyebrow {
    max-width: 25ch;
  }
  .lab-copy {
    padding-top: 10px;
  }
  .lab-copy h2 {
    font-size: 150px;
  }
  .lab-copy h2 svg {
    width: 55px;
    height: 55px;
  }
  .lab-copy > p {
    font-size: 13px;
    margin-top: 26px;
  }
  .lab-stage {
    position: relative;
    right: auto;
    top: auto;
    width: 100%;
    height: 320px;
    margin-top: -10px;
  }
  .lab-object {
    width: 100%;
    max-width: 390px;
  }
  .lab-controls {
    max-width: 100%;
    margin-top: 15px;
    gap: 8px;
  }
  .lab-modes {
    gap: 6px;
  }
  .lab-modes button {
    padding: 10px;
  }
  .motion-toggle {
    margin-top: 6px;
  }
  .lab-description {
    max-width: none;
    font-size: 12px;
  }
  .coordinate-top {
    top: 43%;
    right: 6%;
    font-size: 6px;
    padding: 10px;
  }
  .coordinate-bottom {
    display: none;
  }
  .kinetic-word {
    font-size: 83px;
  }
  .lab-collage {
    width: 85%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .lab-stage {
    transform: none;
  }
}

.lab-object {
  width: 65%;
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  transform: rotate(-5deg);
}
.lab-object > span {
  border: 1px solid #ff7886;
  background: #e54858;
}
.lab-object > span:nth-child(2n) {
  background: transparent;
}
.lab-object > span:nth-child(5) {
  background: #f7f0eb;
  border-color: #f7f0eb;
}
.lab-object > span:nth-child(9) {
  opacity: 0.5;
}
.lab-coordinate {
  background: #111113;
}
.lab-collage {
  width: 90%;
}
</style>
