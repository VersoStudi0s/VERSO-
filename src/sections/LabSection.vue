<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  PhAsterisk,
  PhPause,
  PhPlay,
  PhArrowUpRight,
} from "@phosphor-icons/vue";
import AssetImage from "../components/AssetImage.vue";
const mode = ref("Forma"),
  playing = ref(true),
  reduced = ref(false),
  started = ref(false);
let preference: MediaQueryList;
const modes = ["Forma", "Tipo", "Composição"];
const descriptions: Record<string, string> = {
  Forma:
    "Profundidade em uma camada 2D. Transformações CSS dão movimento à escultura cromada.",
  Tipo: "Ritmo visual com tipografia cinética. A palavra se move, a leitura continua.",
  Composição:
    "Um recorte, outro olhar. Explore as camadas da colagem editorial.",
};
function updateMotion() {
  reduced.value = preference.matches;
  if (reduced.value) playing.value = false;
}
function toggle() {
  if (!reduced.value) {
    started.value = !playing.value;
    playing.value = !playing.value;
  }
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
    id="lab"
    class="lab frame section-pad reveal"
    :class="{ paused: !playing, reduced }"
    aria-labelledby="lab-title"
  >
    <div class="section-topline">
      <span class="eyebrow">Laboratório criativo</span
      ><span class="section-number">[04]</span>
    </div>
    <div class="lab-copy">
      <h2 id="lab-title">LAB<PhAsterisk weight="thin" aria-hidden="true" /></h2>
      <p>
        Um espaço para testar ideias,<br />explorar efeitos e registrar<br />processos
        criativos.
      </p>
    </div>
    <div
      class="lab-stage"
      :class="{ 'motion-started': started }"
      aria-hidden="true"
      @animationend="playing = false"
    >
      <AssetImage
        v-if="mode === 'Forma'"
        class="lab-object"
        name="escultura-cromada"
        :width="1254"
        :height="1254"
      /><span v-else-if="mode === 'Tipo'" class="kinetic-word"
        >IDEIA<br /><em>em ação.</em></span
      ><AssetImage
        v-else
        class="lab-collage"
        name="olho-editorial"
        :width="1536"
        :height="1536"
      />
    </div>
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
          reduced ? "Movimento reduzido" : playing ? "Pausar" : "Animar"
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
  min-height: 410px;
}
.lab-copy {
  position: relative;
  z-index: 2;
  pointer-events: none;
}
.lab-copy h2 {
  font: 500 italic 76px/0.8 var(--editorial);
  display: flex;
  gap: 10px;
  align-items: center;
  letter-spacing: -4px;
}
.lab-copy h2 svg {
  font-size: 52px;
  color: var(--red);
  transform: rotate(10deg);
}
.lab-copy > p {
  font-size: 11px;
  line-height: 1.7;
  margin-top: 23px;
}
.lab-stage {
  position: absolute;
  right: -18px;
  top: 55px;
  width: 57%;
  height: 235px;
  z-index: -1;
  display: grid;
  place-items: center;
}
.lab-object {
  width: 100%;
  animation: float-object 4.8s var(--ease) 1 both;
}
.motion-started .lab-object {
  animation: float-object-started 4.8s var(--ease) 1 both;
}
.lab-object :deep(img) {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 15px 25px #a9213e20);
}
.lab-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 30px;
  position: relative;
  z-index: 2;
}
.lab-modes {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.lab-modes button {
  font: 7px var(--mono);
  text-transform: uppercase;
  border: 1px solid var(--control-line);
  border-radius: 4px;
  min-height: 36px;
  padding: 8px 10px;
  background: #0c0c0ecc;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.lab-modes button.active {
  border-color: var(--red);
  color: var(--red-light);
}
.motion-toggle {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  min-height: 36px;
  font: 7px var(--mono);
  color: var(--muted);
}
.motion-toggle:disabled {
  cursor: default;
}
.lab-description {
  font-size: 9px;
  color: var(--muted);
  margin-top: 16px;
  max-width: 90%;
  min-height: 32px;
}
.lab > .text-link {
  font-size: 8px;
  color: var(--red-light);
  margin-top: 12px;
}
.kinetic-word {
  font: 700 52px/0.8 var(--display);
  animation: kinetic 4s ease-in-out 1 both;
  transform: rotate(-8deg);
  color: var(--red);
  text-align: center;
}
.kinetic-word em {
  font: 500 italic 48px/0.8 var(--editorial);
  color: var(--white);
}
.lab-collage {
  width: 80%;
  transform: rotate(7deg);
  animation: collage 4s ease-in-out 1 both;
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
  0%,
  100% {
    transform: translateY(0) rotate(-8deg);
  }
  50% {
    transform: translateY(-16px) rotate(7deg);
  }
}
@keyframes float-object-started {
  0%,
  100% {
    transform: translateY(0) rotate(-8deg);
  }
  50% {
    transform: translateY(-16px) rotate(7deg);
  }
}
@keyframes kinetic {
  0%,
  100% {
    transform: rotate(-8deg) translateY(0);
    letter-spacing: -2px;
  }
  50% {
    transform: rotate(-4deg) translateY(-10px);
    letter-spacing: 2px;
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
@media (max-width: 1100px) {
  .lab-controls {
    gap: 6px;
  }
  .lab-modes button {
    padding: 7px;
    font-size: 6px;
  }
  .motion-toggle {
    font-size: 6px;
    gap: 4px;
  }
  .lab-copy h2 {
    font-size: 68px;
  }
  .lab-copy > p {
    font-size: 10px;
  }
  .lab-stage {
    width: 59%;
    top: 60px;
  }
}
@media (max-width: 767px) {
  .lab {
    min-height: 450px;
  }
  .lab-copy h2 {
    font-size: 78px;
  }
  .lab-copy > p {
    font-size: 11px;
  }
  .lab-stage {
    width: 63%;
    right: -14px;
    top: 55px;
    height: 250px;
  }
  .lab-controls {
    margin-top: 45px;
    gap: 9px;
  }
  .lab-modes button {
    min-height: 40px;
    font-size: 7px;
    padding: 9px;
  }
  .motion-toggle {
    min-height: 40px;
    font-size: 7px;
  }
  .lab-description {
    font-size: 10px;
    min-height: 45px;
  }
  .lab > .text-link {
    font-size: 9px;
  }
}
</style>
