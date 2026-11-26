<script setup lang="ts">
import { RouterLink } from "vue-router";
import BrandLogo from "./BrandLogo.vue";
import { channels, site } from "../../config/site";
import { navigation } from "../../content/navigation";
import { emailUrl } from "../../lib/contact";
import { track } from "../../lib/analytics";
import { useConsent } from "../../composables/useConsent";

const { reopen } = useConsent();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <BrandLogo />
        <p class="body-muted">{{ site.tagline }}<br />Creative Digital Studio · {{ site.workMode }}.</p>
      </div>
      <nav aria-label="Rodapé">
        <p class="label">Navegar</p>
        <ul role="list">
          <li v-for="item in navigation" :key="item.id">
            <RouterLink :to="{ path: '/', hash: `#${item.id}` }">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>
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
  padding-block: 56px calc(32px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  background: var(--ink);
  font-size: var(--text-sm);
}
.footer__grid {
  display: grid;
  gap: 36px;
}
.footer__brand p {
  margin-top: 14px;
  max-width: 36ch;
}
.footer .label {
  margin-bottom: 10px;
}
.footer ul a {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  color: var(--paper-dim);
  text-decoration: none;
  word-break: break-word;
}
.footer ul a:hover {
  color: var(--paper);
}
.footer__legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}
.footer__legal a,
.footer__consent {
  color: var(--paper-dim);
}
.footer__consent {
  padding: 0;
  border: 0;
  background: none;
  text-decoration: underline;
  cursor: pointer;
}
@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr 1fr;
  }
}
</style>
