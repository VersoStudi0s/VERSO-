<script setup lang="ts">
import { kindLabels, type ProjectKind } from "../../content/projects";
defineProps<{ kind: ProjectKind }>();
</script>

<template>
  <span class="badge" :class="`badge--${kind}`">{{ kindLabels[kind] }}</span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px 4px;
  border: 1px solid currentColor;
  border-radius: 3px;
  font: 400 0.6875rem / 1.2 var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}
.badge::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
.badge--comercial {
  color: var(--red-ink);
}
.badge--autoral {
  color: var(--paper);
}
.badge--academico {
  color: #9fc2ff;
}
.badge--conceitual {
  color: var(--pink);
}
</style>
