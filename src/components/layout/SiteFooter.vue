<script setup lang="ts">
import { RouterLink } from "vue-router";
import BrandLogo from "./BrandLogo.vue";
import { channels, site } from "../../config/site";
import { emailUrl } from "../../lib/contact";
import { track } from "../../lib/analytics";
import { useConsent } from "../../composables/useConsent";

defineProps<{ impact?: boolean }>();
const { reopen } = useConsent();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer" :class="{ 'footer--impact': impact }">
    <div class="container footer__grid">
      <div class="footer__brand">
        <BrandLogo />
        <p class="body-muted">{{ site.tagline }}<br />Creative Digital Studio · {{ site.workMode }}.</p>
      </div>
      <div>
        <p class="label">Falar com a gente</p>
        <ul role="list">
          <li>
            <a
              :href="channels.instagram.url"
              target="_blank"
              rel="noopener"
              @click="track('click_instagram', { posicao: 'rodape' })"
              >Instagram @{{ channels.instagram.handle }}</a
            >
          </li>
          <li>
            <a :href="emailUrl()" @click="track('click_email', { posicao: 'rodape' })">{{ channels.email }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container footer__legal">
      <p>© {{ year }} VERSO*. Time VERSO*.</p>
      <p>
        <RouterLink to="/privacidade">Privacidade</RouterLink>
        <span aria-hidden="true"> · </span>
        <button type="button" class="footer__consent" @click="reopen">Preferências de cookies</button>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: var(--s-8) calc(var(--s-5) + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  background: var(--black);
  font-size: var(--text-sm);
}
/* Rodapé de impacto (página inicial): vermelho com texto preto (5,3:1). */
.footer--impact {
  --fg: var(--black);
  --fg-muted: var(--black);
  --fg-subtle: oklch(15% 0 0 / 0.82);
  --line: oklch(15% 0 0 / 0.22);
  --link: var(--black);
  --focus: var(--black);
  border-top: 0;
  background: var(--red);
  color: var(--black);
}
.footer--impact :deep(.logo),
.footer--impact :deep(.logo__star) {
  color: var(--black);
}
.footer__grid {
  display: grid;
  gap: var(--s-6);
}
.footer__brand p {
  margin-top: var(--s-4);
  max-width: 36ch;
}
.footer .label {
  margin-bottom: var(--s-3);
}
.footer ul a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  color: var(--fg-muted);
  text-decoration: none;
  word-break: break-word;
  transition: color var(--fast) var(--ease);
}
.footer ul a:hover,
.footer ul a:active {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
.footer__legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--s-2) var(--s-6);
  margin-top: var(--s-6);
  padding-top: var(--s-3);
  border-top: 1px solid var(--line);
  color: var(--fg-subtle);
}
.footer__legal a,
.footer__consent {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--fg-muted);
}
.footer__legal a:hover,
.footer__consent:hover {
  text-decoration-thickness: 2px;
}
.footer__consent {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}
@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }
}
</style>
