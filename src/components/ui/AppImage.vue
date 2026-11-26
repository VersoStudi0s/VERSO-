<script setup lang="ts">
import { computed } from "vue";
import type { ProjectImage } from "../../content/projects";

const props = withDefaults(
  defineProps<{ image: ProjectImage; sizes?: string; eager?: boolean }>(),
  { sizes: "100vw", eager: false },
);

const isVector = computed(() => props.image.src.endsWith(".svg"));
const base = computed(() => `/images/${props.image.src}`);
const srcset = computed(() =>
  props.image.responsive === false
    ? undefined
    : `${base.value}-480.webp 480w, ${base.value}-960.webp 960w, ${base.value}.webp ${props.image.width}w`,
);
</script>

<template>
  <img
    v-if="isVector"
    :src="image.src"
    :alt="image.alt"
    :width="image.width"
    :height="image.height"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />
  <img
    v-else
    :src="`${base}.webp`"
    :srcset="srcset"
    :sizes="srcset ? sizes : undefined"
    :alt="image.alt"
    :width="image.width"
    :height="image.height"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
  />
</template>
