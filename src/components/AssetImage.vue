<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    alt?: string;
    eager?: boolean;
    width?: number;
    height?: number;
  }>(),
  { alt: "", eager: false, width: 1536, height: 1152 },
);
</script>
<template>
  <picture>
    <source
      media="(max-width: 767px)"
      :srcset="`/images/${name}-480.webp 480w, /images/${name}-960.webp 960w`"
      sizes="100vw"
    />
    <img
      :src="`/images/${name}.webp`"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
    />
  </picture>
</template>
