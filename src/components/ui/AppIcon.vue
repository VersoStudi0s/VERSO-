<script setup lang="ts">
// Ícones em SVG inline (sem biblioteca). Traço herda a cor do texto.
export type IconName =
  | "whatsapp"
  | "instagram"
  | "mail"
  | "arrow-right"
  | "arrow-up-right"
  | "menu"
  | "close"
  | "check"
  | "x"
  | "chat"
  | "copy";

defineProps<{ name: IconName; size?: number }>();
</script>

<template>
  <svg
    :width="size ?? 20"
    :height="size ?? 20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'whatsapp'">
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c0 3.3 3 6.4 6.4 6.4l1.1-1.4-2-1-1 .8c-1.1-.4-2.1-1.4-2.6-2.5l.8-1-1-2z" />
    </template>
    <template v-else-if="name === 'instagram'">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </template>
    <path v-else-if="name === 'arrow-right'" d="M4 12h15m-6-6 6 6-6 6" />
    <path v-else-if="name === 'arrow-up-right'" d="M7 17 17 7M8 7h9v9" />
    <path v-else-if="name === 'menu'" d="M4 7h16M4 12h16M4 17h16" />
    <path v-else-if="name === 'close'" d="M6 6l12 12M18 6 6 18" />
    <path v-else-if="name === 'check'" d="M5 12.5l4.5 4.5L19 7.5" />
    <path v-else-if="name === 'x'" d="M7 7l10 10M17 7 7 17" />
    <template v-else-if="name === 'chat'">
      <path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z" />
      <path d="M8.5 10.7h.01M12 10.7h.01M15.5 10.7h.01" stroke-width="2.6" />
    </template>
    <template v-else-if="name === 'copy'">
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </template>
  </svg>
</template>
