<script setup lang="ts">
// Tipo do projeto em texto simples, exibido depois do título (não é um selo acima dele).
import { kindLabels, type ProjectKind } from "../../content/projects";
defineProps<{ kind: ProjectKind }>();
</script>

<template>
  <span class="kind" :class="{ 'kind--client': kind === 'comercial' }">{{ kindLabels[kind] }}</span>
</template>

<style scoped>
.kind {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  font: 400 var(--text-xs) / 1.3 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-muted);
  white-space: nowrap;
}
.kind::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--fg-subtle);
}
.kind--client::before {
  background: var(--red);
}
</style>
