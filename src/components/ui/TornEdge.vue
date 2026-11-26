<script setup lang="ts">
// Borda de papel rasgado. Usada só como divisor, nunca atrás de texto.
withDefaults(defineProps<{ color?: string; flip?: boolean; variant?: 1 | 2 }>(), {
  color: "var(--black)",
  flip: false,
  variant: 1,
});
</script>

<template>
  <div class="torn" :class="{ 'torn--flip': flip }" aria-hidden="true">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" :style="{ color }">
      <path
        v-if="variant === 1"
        fill="currentColor"
        d="M0 48V22 L38 12 L81 28 L102 10 L154 11 L195 26 L216 24 L247 9 L270 21 L314 10 L347 10 L400 21 L421 26 L446 15 L504 28 L559 9 L613 26 L656 9 L688 9 L741 12 L777 21 L804 25 L829 26 L866 25 L895 11 L950 26 L1008 14 L1049 11 L1102 30 L1124 26 L1145 27 L1176 23 L1228 21 L1266 22 L1321 22 L1362 17 L1395 13 L1428 10 L1440 17 V48Z"
      />
      <path
        v-else
        fill="currentColor"
        d="M0 48V18 L36 10 L55 26 L92 21 L134 24 L174 12 L204 16 L250 8 L282 27 L329 8 L353 10 L402 21 L421 24 L479 31 L524 19 L545 14 L565 26 L606 29 L635 27 L666 31 L707 26 L748 26 L784 29 L822 26 L845 23 L874 30 L922 26 L968 29 L996 13 L1025 25 L1063 29 L1114 14 L1169 11 L1192 11 L1237 9 L1291 16 L1345 16 L1400 18 L1424 19 L1440 25 V48Z"
      />
    </svg>
  </div>
</template>

<style scoped>
.torn {
  position: relative;
  z-index: 1;
  height: clamp(var(--s-5), 3vw, var(--s-8));
  margin-top: calc(clamp(var(--s-5), 3vw, var(--s-8)) * -1 + 1px);
  pointer-events: none;
}
.torn svg {
  width: 100%;
  height: 100%;
}
.torn--flip {
  transform: scaleY(-1);
  margin-top: 0;
  margin-bottom: calc(clamp(var(--s-5), 3vw, var(--s-8)) * -1 + 1px);
}
</style>
