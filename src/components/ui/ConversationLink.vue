<script setup lang="ts">
// Link para iniciar conversa: WhatsApp (se configurado) ou direct do Instagram.
import { computed } from "vue";
import AppIcon from "./AppIcon.vue";
import { conversationChannel, conversationUrl, defaultMessage, prototypeMessage } from "../../lib/contact";
import { track } from "../../lib/analytics";

const props = withDefaults(
  defineProps<{
    position: string;
    intent?: "prototipo" | "conversa";
    label?: string;
    variant?: "primary" | "secondary" | "light" | "plain";
    block?: boolean;
  }>(),
  { intent: "conversa", variant: "primary", block: false },
);

const channel = conversationChannel();
const href = computed(() =>
  conversationUrl(props.intent === "prototipo" ? prototypeMessage() : defaultMessage()),
);
const text = computed(
  () => props.label ?? (props.intent === "prototipo" ? "Pedir protótipo grátis" : channel.label),
);

const onClick = () => {
  if (props.intent === "prototipo") track("cta_prototipo", { posicao: props.position, canal: channel.kind });
  track(channel.kind === "whatsapp" ? "click_whatsapp" : "click_instagram", { posicao: props.position });
};
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener"
    :class="variant === 'plain' ? 'link-arrow' : ['btn', `btn-${variant}`, { 'btn-block': block }]"
    :data-channel="channel.kind"
    @click="onClick"
  >
    <AppIcon v-if="variant !== 'plain'" :name="channel.kind === 'whatsapp' ? 'whatsapp' : 'instagram'" />
    {{ text }}
    <span class="visually-hidden">(abre em nova aba)</span>
  </a>
</template>
