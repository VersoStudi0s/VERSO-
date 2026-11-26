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
  <article class="section container privacy" aria-labelledby="privacy-title">
    <p class="label">Privacidade</p>
    <h1 id="privacy-title" class="display">Como este site trata seus dados</h1>

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
    <p>Se você recusar, nenhuma dessas ferramentas é carregada. Você pode mudar de ideia a qualquer momento.</p>
    <button type="button" class="btn btn-secondary" @click="reopen">Alterar preferências</button>

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
  max-width: 760px;
  display: grid;
  gap: 16px;
  justify-items: start;
}
.privacy h1 {
  font-size: var(--title-lg);
  margin-bottom: 12px;
}
.privacy h2 {
  margin-top: 20px;
  font: 700 1.2rem / 1.3 var(--font-body);
}
.privacy p,
.privacy li {
  color: var(--paper-dim);
}
.privacy ul {
  padding-left: 20px;
}
.privacy a {
  color: var(--pink);
}
</style>
