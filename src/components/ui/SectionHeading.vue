<script setup lang="ts">
defineProps<{ number: string; label: string; id: string }>();
</script>

<template>
  <header class="heading">
    <p class="label heading__label">
      <span class="heading__number">{{ number }}</span> {{ label }}
    </p>
    <h2 :id="id" class="display heading__title"><slot /></h2>
    <p v-if="$slots.lead" class="lead heading__lead"><slot name="lead" /></p>
  </header>
</template>

<style scoped>
.heading {
  display: grid;
  gap: 18px;
  margin-bottom: clamp(36px, 6vw, 64px);
}
.heading__label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.heading__label::after {
  content: "";
  flex: 0 1 72px;
  height: 1px;
  background: var(--line-strong);
}
.heading__number {
  color: var(--red-ink);
}
.heading__title {
  font-size: var(--title-lg);
  max-width: 16ch;
}
</style>
