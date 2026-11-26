<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import SectionHeading from "../components/ui/SectionHeading.vue";
import AppIcon from "../components/ui/AppIcon.vue";
import { channels } from "../config/site";
import { findService, services } from "../content/services";
import {
  buildMessage,
  conversationChannel,
  conversationUrl,
  defaultMessage,
  emailUrl,
  type ContactDraft,
} from "../lib/contact";
import { track } from "../lib/analytics";

const route = useRoute();
const channel = conversationChannel();
const isWhatsapp = channel.kind === "whatsapp";

const form = reactive<ContactDraft>({ name: "", contact: "", serviceId: "", description: "" });
const errors = reactive<Partial<Record<keyof ContactDraft, string>>>({});
const status = ref<"" | "sent" | "copied" | "manual">("");
const fallbackText = ref("");
const formEl = ref<HTMLFormElement>();

// Serviço escolhido em "Pedir orçamento" chega pela URL (?servico=site).
watch(
  () => route.query.servico,
  (value) => {
    if (findService(value)) form.serviceId = value as string;
  },
  { immediate: true },
);
watch(form, () => {
  if (status.value) status.value = "";
});

const validate = () => {
  errors.name = form.name.trim().length < 2 ? "Escreva seu nome." : "";
  errors.contact = form.contact.trim().length < 6 ? "Informe um WhatsApp ou e-mail para resposta." : "";
  errors.description =
    form.description.trim().length < 10 ? "Conte em poucas palavras o que você precisa." : "";
  const firstInvalid = (["name", "contact", "description"] as const).find((key) => errors[key]);
  if (firstInvalid) {
    nextTick(() => formEl.value?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus());
    return false;
  }
  return true;
};

const message = computed(() => buildMessage(form));

const submit = () => {
  if (!validate()) return;
  track("formulario_enviado", { servico: form.serviceId || "indefinido", canal: channel.kind });
  if (isWhatsapp) {
    window.open(conversationUrl(message.value), "_blank", "noopener");
    status.value = "sent";
    return;
  }
  // Direct do Instagram não aceita texto pronto: copiamos a mensagem antes de abrir.
  const copy = navigator.clipboard?.writeText(message.value);
  window.open(channels.instagram.direct, "_blank", "noopener");
  if (!copy) {
    fallbackText.value = message.value;
    status.value = "manual";
    return;
  }
  copy
    .then(() => (status.value = "copied"))
    .catch(() => {
      fallbackText.value = message.value;
      status.value = "manual";
    });
};

const sendByEmail = () => {
  if (!validate()) return;
  track("click_email", { posicao: "formulario", servico: form.serviceId || "indefinido" });
  window.location.href = emailUrl(message.value);
};
</script>

<template>
  <section id="contato" class="section contact" aria-labelledby="contato-title">
    <div class="container contact__grid">
      <div class="contact__intro">
        <SectionHeading id="contato-title" number="06" label="Contato">
          Conta pra gente o que o seu negócio <em class="accent-word">precisa</em>
          <template #lead>
            Resposta de gente, sem robô. A primeira conversa e o protótipo não custam nada e não te comprometem
            com nada.
          </template>
        </SectionHeading>

        <ul role="list" class="channels">
          <li>
            <a
              class="channel channel--main"
              :href="conversationUrl(defaultMessage())"
              target="_blank"
              rel="noopener"
              :data-channel="channel.kind"
              @click="track(isWhatsapp ? 'click_whatsapp' : 'click_instagram', { posicao: 'contato' })"
            >
              <AppIcon :name="isWhatsapp ? 'whatsapp' : 'chat'" :size="26" />
              <span>
                <strong>{{ isWhatsapp ? "WhatsApp" : "Direct do Instagram" }}</strong>
                <small>{{ isWhatsapp ? "O jeito mais rápido de falar com a gente" : 'Manda um "oi" que a gente responde' }}</small>
              </span>
              <AppIcon name="arrow-up-right" />
            </a>
          </li>
          <li>
            <a
              class="channel"
              :href="channels.instagram.url"
              target="_blank"
              rel="noopener"
              @click="track('click_instagram', { posicao: 'contato-perfil' })"
            >
              <AppIcon name="instagram" :size="26" />
              <span>
                <strong>@{{ channels.instagram.handle }}</strong>
                <small>Processo, dicas e projetos toda semana</small>
              </span>
              <AppIcon name="arrow-up-right" />
            </a>
          </li>
          <li>
            <a class="channel" :href="emailUrl()" @click="track('click_email', { posicao: 'contato' })">
              <AppIcon name="mail" :size="26" />
              <span>
                <strong>E-mail</strong>
                <small class="channel__email">{{ channels.email }}</small>
              </span>
              <AppIcon name="arrow-up-right" />
            </a>
          </li>
        </ul>
      </div>

      <form ref="formEl" class="form" novalidate aria-labelledby="form-title" @submit.prevent="submit">
        <h3 id="form-title" class="form__title">Prefere deixar tudo escrito?</h3>
        <p class="form__help">
          Quatro campos. A mensagem fica pronta para você enviar {{ isWhatsapp ? "no seu WhatsApp" : "no direct" }}
          ou por e-mail. Nada é guardado neste site.
        </p>

        <div class="field">
          <label for="f-name">Seu nome</label>
          <input
            id="f-name"
            v-model="form.name"
            name="name"
            autocomplete="name"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="errors.name ? 'e-name' : undefined"
          />
          <p v-if="errors.name" id="e-name" class="field__error">{{ errors.name }}</p>
        </div>
        <div class="field">
          <label for="f-contact">WhatsApp ou e-mail para resposta</label>
          <input
            id="f-contact"
            v-model="form.contact"
            name="contact"
            autocomplete="email"
            inputmode="email"
            :aria-invalid="Boolean(errors.contact)"
            :aria-describedby="errors.contact ? 'e-contact' : undefined"
          />
          <p v-if="errors.contact" id="e-contact" class="field__error">{{ errors.contact }}</p>
        </div>
        <div class="field">
          <label for="f-service">Serviço <span>(opcional)</span></label>
          <select id="f-service" v-model="form.serviceId" name="serviceId">
            <option value="">Ainda não sei</option>
            <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
          </select>
        </div>
        <div class="field">
          <label for="f-description">O que você precisa?</label>
          <textarea
            id="f-description"
            v-model="form.description"
            name="description"
            rows="4"
            maxlength="800"
            placeholder="Ex.: tenho uma confeitaria e quero um site simples com cardápio e botão de pedido."
            :aria-invalid="Boolean(errors.description)"
            :aria-describedby="errors.description ? 'e-description' : undefined"
          ></textarea>
          <p v-if="errors.description" id="e-description" class="field__error">{{ errors.description }}</p>
        </div>

        <div class="form__actions">
          <button type="submit" class="btn btn-primary btn-block">
            <AppIcon :name="isWhatsapp ? 'whatsapp' : 'copy'" />
            {{ isWhatsapp ? "Enviar pelo WhatsApp" : "Copiar mensagem e abrir o direct" }}
          </button>
          <button type="button" class="btn btn-secondary btn-block" @click="sendByEmail">
            <AppIcon name="mail" /> Enviar por e-mail
          </button>
        </div>

        <p class="form__status" role="status" aria-live="polite">
          <template v-if="status === 'sent'">Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar.</template>
          <template v-else-if="status === 'copied'"
            >Mensagem copiada. No direct, cole e envie. Se a aba não abriu,
            <a :href="channels.instagram.direct" target="_blank" rel="noopener">abra o direct aqui</a>.</template
          >
          <template v-else-if="status === 'manual'">Não deu para copiar sozinho. Selecione o texto abaixo e copie:</template>
        </p>
        <textarea
          v-if="status === 'manual'"
          class="form__fallback"
          readonly
          rows="6"
          aria-label="Mensagem pronta para copiar"
          :value="fallbackText"
        ></textarea>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--graphite);
}
.contact__grid {
  display: grid;
  gap: 48px;
}
.channels {
  display: grid;
  gap: 12px;
}
.channel {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  min-height: 72px;
  padding: 14px 18px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  text-decoration: none;
  transition:
    border-color var(--fast) var(--ease),
    background-color var(--fast) var(--ease);
}
.channel:hover {
  border-color: var(--paper);
}
.channel strong,
.channel small {
  display: block;
}
.channel small {
  color: var(--paper-dim);
  font-size: var(--text-sm);
}
.channel__email {
  word-break: break-all;
}
.channel--main {
  border-color: var(--red);
  background: var(--red);
  color: #120607;
}
.channel--main small {
  color: #1d0a0d;
}
.channel--main:hover {
  background: var(--red-ink);
  border-color: var(--red-ink);
}

.form {
  display: grid;
  gap: 18px;
  padding: clamp(20px, 4vw, 36px);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--graphite-2);
}
.form__title {
  font: 400 1.8rem / 1 var(--font-display);
  text-transform: uppercase;
}
.form__help {
  margin-top: -6px;
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.field {
  display: grid;
  gap: 6px;
}
.field label {
  font-weight: 700;
  font-size: var(--text-sm);
}
.field label span {
  font-weight: 400;
  color: var(--muted);
}
.field input,
.field select,
.field textarea,
.form__fallback {
  width: 100%;
  min-height: 50px;
  padding: 12px 14px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--ink);
  font-size: 1rem;
}
.field textarea {
  resize: vertical;
  line-height: 1.5;
}
.field textarea::placeholder {
  color: #8d878a;
}
.field select {
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--paper-dim) 50%),
    linear-gradient(135deg, var(--paper-dim) 50%, transparent 50%);
  background-position:
    calc(100% - 20px) 50%,
    calc(100% - 14px) 50%;
  background-size: 6px 6px;
  background-repeat: no-repeat;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--pink);
}
.field [aria-invalid="true"] {
  border-color: var(--red-ink);
}
.field__error {
  font-size: var(--text-sm);
  color: var(--red-ink);
}
.form__actions {
  display: grid;
  gap: 10px;
}
.form__status {
  font-size: var(--text-sm);
  color: var(--paper-dim);
}
.form__status:empty {
  display: none;
}
.form__status a {
  color: var(--pink);
}
@media (min-width: 1000px) {
  .contact__grid {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }
}
</style>
