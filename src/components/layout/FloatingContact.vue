<script setup lang="ts">
// Botão de conversa flutuante: aparece depois do início e some quando o contato está na tela.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import AppIcon from "../ui/AppIcon.vue";
import { conversationChannel, conversationUrl, defaultMessage } from "../../lib/contact";
import { track } from "../../lib/analytics";
import { useConsent } from "../../composables/useConsent";

const channel = conversationChannel();
const href = conversationUrl(defaultMessage());
const { bannerOpen } = useConsent();
const pastHero = ref(false);
const contactVisible = ref(false);
const visible = computed(() => pastHero.value && !contactVisible.value && !bannerOpen.value);

let observer: IntersectionObserver | undefined;
const onScroll = () => {
  pastHero.value = window.scrollY > window.innerHeight * 0.7;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const contact = document.getElementById("contato");
  if (contact && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(([entry]) => {
      contactVisible.value = entry?.isIntersecting ?? false;
    });
    observer.observe(contact);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  observer?.disconnect();
});

const onClick = () =>
  track(channel.kind === "whatsapp" ? "click_whatsapp" : "click_instagram", { posicao: "flutuante" });
</script>

<template>
  <a
    class="floating"
    :class="{ 'is-visible': visible }"
    :href="href"
    target="_blank"
    rel="noopener"
    :aria-hidden="!visible"
    :tabindex="visible ? 0 : -1"
    :data-channel="channel.kind"
    @click="onClick"
  >
    <AppIcon :name="channel.kind === 'whatsapp' ? 'whatsapp' : 'instagram'" :size="26" />
    <span class="floating__label">{{ channel.label }}</span>
  </a>
</template>

<style scoped>
.floating {
  position: fixed;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom));
  z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 56px;
  padding: 0 16px;
  border-radius: 999px;
  background: var(--red);
  color: #120607;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.45);
  opacity: 0;
  transform: translateY(16px);
  pointer-events: none;
  transition:
    opacity 200ms var(--ease),
    transform 200ms var(--ease),
    background-color var(--fast) var(--ease);
}
.floating.is-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.floating:hover {
  background: var(--red-ink);
}
.floating__label {
  font-size: var(--text-sm);
}
@media (max-width: 479px) {
  .floating {
    width: 56px;
    padding: 0;
    justify-content: center;
  }
  .floating__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .floating {
    transition: none;
  }
}
</style>
