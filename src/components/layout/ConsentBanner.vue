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
/* Raio concêntrico: botões = raio externo (14px) - padding (8px) = 6px. */
.consent {
  --r-outer: var(--radius-lg);
  --pad: var(--s-2);
  position: fixed;
  left: var(--s-3);
  right: var(--s-3);
  bottom: calc(var(--s-3) + env(safe-area-inset-bottom));
  z-index: 60;
  display: grid;
  gap: var(--s-3);
  max-width: 640px;
  padding: var(--pad);
  border: 1px solid var(--line);
  border-radius: var(--r-outer);
  background: var(--beige);
  color: var(--black);
  box-shadow: var(--shadow-lg);
  font-size: var(--text-sm);
  line-height: 1.5;
}
.consent p {
  padding: var(--s-2) var(--s-2) 0;
}
.consent a {
  color: var(--red-on-light);
  font-weight: 600;
}
.consent__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-2);
}
.consent .btn {
  min-height: 44px;
  padding-block: var(--s-2);
  font-size: var(--text-sm);
  border-radius: max(var(--radius-min), calc(var(--r-outer) - var(--pad)));
}
.consent .btn-secondary {
  border-color: oklch(15% 0 0 / 0.3);
  color: var(--black);
}
.consent .btn-secondary:hover {
  background: var(--beige-2);
  border-color: var(--black);
}
.consent .btn-light {
  background: var(--black);
  color: var(--beige);
}
.consent .btn-light:hover {
  background: var(--black-3);
}
@media (min-width: 640px) {
  .consent {
    left: var(--s-6);
    bottom: var(--s-6);
    grid-template-columns: 1fr auto;
    align-items: center;
  }
  .consent p {
    padding: 0 var(--s-2);
  }
}
</style>
