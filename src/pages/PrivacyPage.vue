<script setup lang="ts">
import { channels } from "../config/site";
import { analyticsConfig } from "../config/analytics";
import { useConsent } from "../composables/useConsent";

const { reopen } = useConsent();
const providers = [
  analyticsConfig.metricoolHash && "Metricool (estatísticas de visitas)",
  analyticsConfig.plausibleDomain && "Plausible Analytics (estatísticas sem cookies)",
  analyticsConfig.gaId && "Google Analytics 4 (estatísticas de visitas, IP anonimizado)",
].filter(Boolean) as string[];
</script>

<template>
  <article class="section container privacy theme-dark" aria-labelledby="privacy-title">
    <p class="label">Privacidade</p>
    <h1 id="privacy-title" class="display">Como este site trata seus dados</h1>
    <div class="privacy__paper theme-light">

    <h2>Formulário de contato</h2>
    <p>
      O formulário não envia nem guarda nada em servidor. Ele apenas monta uma mensagem com o que você escreveu e
      abre o WhatsApp, o Instagram ou o seu e-mail. Você revisa e decide se envia. A partir daí, a conversa segue
      as regras do aplicativo escolhido.
    </p>

    <h2>Estatísticas de acesso</h2>
    <p>
      Com a sua permissão, usamos ferramentas de estatística para entender de onde vêm as visitas e quais botões
      são usados (por exemplo, quantas pessoas clicam em "Pedir protótipo"). Não usamos esses dados para
      publicidade nem os vendemos.
    </p>
    <ul v-if="providers.length">
      <li v-for="provider in providers" :key="provider">{{ provider }}</li>
    </ul>
    <div class="privacy__impact">
      <p>Se você recusar, nenhuma dessas ferramentas é carregada. Você pode mudar de ideia a qualquer momento.</p>
      <button type="button" class="btn privacy__btn" @click="reopen">Alterar preferências</button>
    </div>

    </div>

    <h2>Armazenamento no navegador</h2>
    <p>Guardamos apenas a sua escolha sobre as estatísticas (aceitar ou recusar), no próprio navegador.</p>

    <h2>Contato</h2>
    <p>
      Dúvidas sobre privacidade: <a :href="`mailto:${channels.email}`">{{ channels.email }}</a>.
    </p>
  </article>
</template>

<style scoped>
.privacy {
  max-width: calc(var(--max) + var(--gutter) * 2);
  display: grid;
  gap: var(--s-4);
  justify-items: start;
}
.privacy__paper {
  --r-outer: var(--radius-lg);
  --pad: clamp(var(--s-6), 5vw, var(--s-10));
  display: grid;
  gap: var(--s-4);
  justify-items: start;
  width: 100%;
  margin-top: var(--s-4);
  padding: var(--pad);
  border-radius: var(--r-outer);
  box-shadow: var(--shadow-lg);
}
/* Painel de impacto: vermelho, texto preto (5,3:1). Raio concêntrico no botão. */
.privacy__impact {
  --r-outer: var(--radius-lg);
  --pad: var(--s-5);
  display: grid;
  gap: var(--s-4);
  justify-items: start;
  width: 100%;
  padding: var(--pad);
  border-radius: var(--r-outer);
  background: var(--red);
  color: var(--black);
}
.privacy .privacy__impact p {
  color: var(--black);
}
.privacy__btn {
  background: var(--black);
  color: var(--beige);
  border-radius: max(var(--radius-min), calc(var(--r-outer) - var(--pad)));
}
.privacy__btn:hover {
  background: var(--black-3);
}
.privacy__paper > h2:first-child {
  margin-top: 0;
}
.privacy h1 {
  font-size: var(--title-lg);
  margin-bottom: var(--s-3);
}
.privacy h2 {
  margin-top: var(--s-5);
  font: 600 1.2rem / 1.3 var(--font-body);
}
.privacy p,
.privacy li {
  color: var(--fg-muted);
  max-width: 68ch;
}
.privacy ul {
  padding-left: var(--s-5);
}
.privacy a {
  color: var(--link);
}
</style>
