<script setup lang="ts">
import { PhArrowUpRight, PhArrowUp } from "@phosphor-icons/vue";
import { site, navigation } from "../data/site";
</script>
<template>
  <footer class="site-footer">
    <div class="footer-main">
      <RouterLink to="/#inicio" class="footer-logo" aria-label="VERSO, início"
        >VERSO<span>*</span></RouterLink
      >
      <p class="eyebrow">
        Studio de design e desenvolvimento.<br />Sites, apps e sistemas sob
        medida.
      </p>
      <RouterLink to="/#inicio" class="back-top text-link"
        >De volta ao início <PhArrowUp
      /></RouterLink>
    </div>
    <nav aria-label="Navegação do rodapé">
      <RouterLink
        v-for="item in navigation.slice(1)"
        :key="item.id"
        :to="`/#${item.id}`"
        >{{ item.label }}</RouterLink
      >
    </nav>
    <div v-if="site.socials.length" class="social-links">
      <a
        v-for="link in site.socials"
        :key="link.label"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        >{{ link.label }} <PhArrowUpRight
      /></a>
    </div>
    <div class="footer-bottom micro">
      <span>© {{ new Date().getFullYear() }} VERSO*. Feito com intenção.</span
      ><span>Renata, João Gustavo, David e Isaque</span
      ><RouterLink to="/privacidade">Privacidade & créditos</RouterLink>
    </div>
  </footer>
</template>
<style scoped>
.site-footer {
  padding: 55px var(--gutter) 28px;
}
.footer-main {
  display: flex;
  align-items: center;
  gap: 40px;
}
.footer-logo {
  font: 500 clamp(52px, 6vw, 85px) / 1 var(--editorial);
  letter-spacing: -5px;
}
.footer-logo span {
  color: var(--red);
}
.footer-main p {
  font-size: 11px;
}
.back-top {
  margin-left: auto;
}
.site-footer nav {
  display: flex;
  gap: 30px;
  margin-top: 35px;
  font: 11px var(--mono);
}
.site-footer nav a:hover,
.footer-bottom a:hover {
  color: var(--red-light);
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--line-soft);
  font-size: 11px;
}
.social-links {
  display: flex;
  gap: 25px;
  margin-top: 25px;
  font: 11px var(--mono);
}
.social-links a {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 24px;
}
.footer-bottom a {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
}
@media (pointer: coarse) {
  .social-links a,
  .footer-bottom a {
    min-height: 44px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding: 40px 14px 24px;
  }
  .footer-main {
    flex-wrap: wrap;
    gap: 20px;
  }
  .footer-main p {
    font-size: 11px;
  }
  .back-top {
    margin: 0;
    width: 100%;
    font-size: 11px;
  }
  .site-footer nav {
    gap: 19px;
    flex-wrap: wrap;
    font-size: 11px;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 12px;
  }
}
.site-footer nav a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
}
</style>
