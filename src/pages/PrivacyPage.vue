<script setup lang="ts">
import { PhArrowLeft } from "@phosphor-icons/vue";
import { site } from "../data/site";
const configured = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT);
</script>
<template>
  <article class="privacy-page route-page frame section-pad prose">
    <RouterLink to="/#contato" class="text-link"
      ><PhArrowLeft /> Voltar ao contato</RouterLink
    ><span class="eyebrow red">Transparência / VERSO*</span>
    <h1>Privacidade<br /><em>& créditos.</em></h1>
    <p>
      Atualização: 22 de outubro de 2026. Esta página descreve o funcionamento
      desta versão do portfólio de Renata, desenvolvedora e designer em
      formação.
    </p>
    <h2>Quais dados são solicitados?</h2>
    <p>
      O formulário pede nome, e-mail, tipo de projeto e mensagem. A finalidade é
      compreender sua solicitação e responder ao contato. Evite enviar dados
      sensíveis ou informações de outras pessoas. Os campos não são armazenados
      no navegador.
    </p>
    <h2>O que acontece com a mensagem?</h2>
    <p v-if="!configured">
      Nesta versão, o formulário gera um texto de orçamento para você revisar e
      copiar. Os dados ficam na memória da página e não são enviados a um
      serviço de e-mail nem armazenados pelo site. A cópia para a área de
      transferência só acontece ao acionar “Copiar mensagem”. Você decide se e
      onde compartilhar esse texto. Ao recarregar ou fechar a página, o rascunho
      é descartado.
    </p>
    <p v-else>
      O formulário transmite os dados ao endpoint configurado para atendimento.
      O envio só é confirmado depois que o serviço responde explicitamente que
      aceitou a mensagem. A identidade do provedor, suas condições e eventuais
      transferências internacionais devem ser informadas pela responsável antes
      da publicação desta integração.
    </p>
    <p>
      O adaptador opcional incluído no código é compatível com Resend e usa
      credenciais exclusivamente no servidor. A retenção na caixa de e-mail, os
      operadores, a identificação completa da responsável e a base legal
      aplicável precisam ser definidos antes de ativar o formulário
      publicamente.
    </p>
    <h2>Cookies, métricas e terceiros</h2>
    <p>
      Esta aplicação não instala cookies, ferramentas de analytics, pixels de
      publicidade ou SDKs de rastreamento. As fontes são hospedadas localmente.
      Não há vídeos ou mapas de terceiros incorporados. Por isso, não há banner
      de consentimento decorativo. O serviço de hospedagem poderá manter logs
      técnicos, conforme sua configuração e política.
    </p>
    <h2>Seus direitos e solicitações</h2>
    <p>
      Você pode solicitar informações sobre o tratamento, correção ou exclusão
      de dados pessoais, observadas as hipóteses legais de conservação.
    </p>
    <p v-if="site.email">
      Canal da responsável:
      <a :href="`mailto:${site.email}`">{{ site.email }}</a
      >.
    </p>
    <p v-else>
      O canal profissional para solicitações de privacidade ainda não foi
      informado. Ele deve ser configurado antes da publicação e da ativação de
      qualquer coleta.
    </p>
    <h2>Links externos</h2>
    <p>
      Se forem configurados links sociais ou WhatsApp, esses serviços terão suas
      próprias políticas de privacidade. Os links externos abrem apenas após uma
      ação sua.
    </p>
    <h2>Imagens, fontes e créditos</h2>
    <p>
      As artes editoriais e os mockups foram fornecidos no kit VERSO*. A pessoa
      retratada nas composições é uma referência visual e não é Renata. As
      imagens de projetos são ilustrativas e não comprovam produtos, clientes ou
      resultados. A origem e os direitos de publicação desses materiais ainda
      precisam ser confirmados pela responsável.
    </p>
    <p>
      Barlow Condensed, Cormorant Garamond e IBM Plex Mono são distribuídas sob
      a SIL Open Font License. Os ícones são da biblioteca Phosphor, sob licença
      MIT. As licenças estão preservadas nas dependências e documentadas em
      <span class="inline-code">docs/ASSETS.md</span>.
    </p>
    <h2>Serviços e condições comerciais</h2>
    <p>
      Este portfólio não realiza pagamentos, vendas automáticas, assinaturas ou
      contratação online. Escopo, condições e valores de um eventual projeto
      devem ser combinados diretamente. Não há política de reembolso de compras
      no site, pois ele não processa compras.
    </p>
    <h2>Acessibilidade</h2>
    <p>
      A interface oferece navegação por teclado, foco visível, rótulos de
      formulário e respeito à preferência por movimento reduzido. As
      verificações técnicas estão registradas no repositório; elas não
      constituem certificação legal ou garantia de conformidade absoluta.
    </p>
  </article>
</template>
<style scoped>
.privacy-page {
  padding-bottom: 70px;
}
.privacy-page > .eyebrow {
  display: block;
  margin-top: 60px;
  color: var(--red-light);
}
.privacy-page h1 {
  font: 600 clamp(55px, 8vw, 110px) / 0.9 var(--display);
  margin: 22px 0 35px;
}
.privacy-page h1 em {
  font: 500 italic 1.1em/0.9 var(--editorial);
  color: var(--red);
}
.privacy-page p {
  font-size: 15px;
}
.privacy-page a:not(.text-link) {
  text-decoration: underline;
}
.inline-code {
  font: 12px var(--mono);
  color: var(--pink);
}
@media (max-width: 767px) {
  .privacy-page p {
    font-size: 14px;
  }
  .privacy-page h2 {
    font-size: 29px;
  }
}
</style>
