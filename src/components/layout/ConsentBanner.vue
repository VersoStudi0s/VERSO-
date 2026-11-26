<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useConsent } from "../../composables/useConsent";

const { bannerOpen, init, choose } = useConsent();
onMounted(init);
</script>

<template>
  <section v-if="bannerOpen" class="consent" aria-label="Preferências de privacidade">
    <p>
      Podemos usar estatísticas de visita para melhorar o site? Nada carrega sem a sua permissão.
      <RouterLink to="/privacidade">Saiba mais</RouterLink>
    </p>
    <div class="consent__actions">
      <button type="button" class="btn btn-secondary" @click="choose('denied')">Recusar</button>
      <button type="button" class="btn btn-light" @click="choose('granted')">Aceitar</button>
    </div>
  </section>
</template>

<style scoped>
.consent {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 60;
  display: grid;
  gap: 12px;
  max-width: 560px;
  padding: 14px 16px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--graphite-2);
  box-shadow: 0 18px 50px rgb(0 0 0 / 0.5);
  font-size: var(--text-sm);
  line-height: 1.5;
}
.consent a {
  color: var(--pink);
}
.consent__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.consent .btn {
  min-height: 44px;
  padding-block: 8px;
  font-size: var(--text-sm);
}
@media (min-width: 640px) {
  .consent {
    grid-template-columns: 1fr auto;
    align-items: center;
    max-width: 640px;
    left: 24px;
    bottom: 24px;
  }
}
</style>
