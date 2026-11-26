<script setup lang="ts">
defineProps<{ number: string; label: string; id: string }>();
</script>

<template>
  <header class="heading">
    <h2 :id="id" class="display heading__title"><slot /></h2>
    <p class="label heading__label">
      <span class="heading__number">{{ number }}</span> {{ label }}
    </p>
    <p v-if="$slots.lead" class="lead heading__lead"><slot name="lead" /></p>
  </header>
</template>

<style scoped>
.heading {
  display: grid;
  gap: var(--s-4);
  margin-bottom: clamp(var(--s-8), 6vw, var(--s-10));
}
.heading__title {
  font-size: var(--title-lg);
  max-width: 16ch;
}
.heading__label {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  order: -1;
}
.heading__label::after {
  content: "";
  flex: 0 1 72px;
  height: 1px;
  background: var(--line-strong);
}
.heading__number {
  color: var(--link);
}
</style>
