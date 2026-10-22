<script setup lang="ts">
import { ref, reactive, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import {
  PhArrowUpRight,
  PhCheck,
  PhCircleNotch,
  PhWhatsappLogo,
  PhCopy,
} from "@phosphor-icons/vue";
import {
  sendContact,
  ContactError,
  type ContactPayload,
} from "../services/contact";
import { site } from "../data/site";
import { contactTypes as types } from "../data/services";
const route = useRoute();
const contactEnabled = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT);
const form = ref<HTMLFormElement>();
const generated = ref("");
const draftTextarea = ref<HTMLTextAreaElement>();
const values = reactive<ContactPayload>({
  name: "",
  email: "",
  projectType: "",
  message: "",
  website: "",
});
const errors = reactive<Record<string, string>>({});
const state = ref<"idle" | "loading" | "success" | "error" | "draft">("idle"),
  feedback = ref("");
watch(
  () => route.query.servico,
  (value) => {
    if (types.some((type) => type.value === value))
      values.projectType = String(value);
  },
  { immediate: true },
);
watch(values, () => {
  generated.value = "";
  if (state.value === "draft") {
    state.value = "idle";
    feedback.value = "";
  }
});
async function copyMessage() {
  try {
    await navigator.clipboard.writeText(generated.value);
    feedback.value =
      "Mensagem copiada. Você escolhe onde compartilhar; nada foi enviado pelo site.";
  } catch {
    draftTextarea.value?.focus();
    draftTextarea.value?.select();
    feedback.value =
      "O texto está selecionado. Use a opção Copiar do seu dispositivo; a cópia automática não ficou disponível.";
  }
}
function validate() {
  Object.keys(errors).forEach((key) => delete errors[key]);
  if (values.name.trim().length < 2)
    errors.name = "Informe seu nome (mínimo de 2 caracteres).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Informe um e-mail válido.";
  if (!types.some((type) => type.value === values.projectType))
    errors.projectType = "Selecione o tipo de projeto.";
  if (values.message.trim().length < 20)
    errors.message = "Conte um pouco mais (mínimo de 20 caracteres).";
  return !Object.keys(errors).length;
}
async function submit() {
  if (state.value === "loading") return;
  feedback.value = "";
  state.value = "idle";
  if (!validate()) {
    await nextTick();
    form.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    return;
  }
  if (!contactEnabled) {
    const service = types.find(
      (type) => type.value === values.projectType,
    )?.label;
    generated.value = `Olá, Renata! Gostaria de conversar sobre um projeto.\n\nNome ou negócio: ${values.name.trim()}\nE-mail para retorno: ${values.email.trim()}\nServiço de interesse: ${service}\n\nMinha ideia:\n${values.message.trim()}`;
    state.value = "draft";
    feedback.value =
      "Mensagem preparada para copiar. Nenhuma mensagem foi enviada.";
    await nextTick();
    draftTextarea.value?.focus({ preventScroll: true });
    return;
  }
  state.value = "loading";
  try {
    await sendContact({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    state.value = "success";
    feedback.value =
      "Mensagem enviada ao serviço de e-mail. Obrigada pelo contato!";
    Object.assign(values, {
      name: "",
      email: "",
      projectType: "",
      message: "",
      website: "",
    });
  } catch (error) {
    state.value = "error";
    feedback.value =
      error instanceof ContactError
        ? error.message
        : "Falha de conexão. Não foi possível confirmar o envio. Tente novamente.";
  }
}
</script>
<template>
  <section
    id="contato"
    class="contact frame section-pad reveal"
    aria-labelledby="contact-title"
  >
    <div class="section-topline">
      <span class="eyebrow"
        >Contato <span class="section-number">[07]</span></span
      ><span class="contact-label micro">Vamos conversar?</span>
    </div>
    <div class="contact-layout">
      <div class="contact-copy" data-reveal>
        <h2 id="contact-title">
          Transforme<br />sua ideia em<br /><em>realidade.</em>
        </h2>
        <p class="contact-intro">
          Conte o que você precisa criar. Objetivo, escopo e próximos passos
          começam por uma boa conversa.
        </p>
        <p v-if="!contactEnabled" class="contact-availability">
          Prepare e copie sua mensagem de orçamento. Nada será enviado
          automaticamente; você decide onde compartilhar.
        </p>
      </div>
      <form
        ref="form"
        novalidate
        data-reveal
        :aria-busy="state === 'loading'"
        @submit.prevent="submit"
      >
        <div class="contact-fields">
          <div class="field">
            <label for="contact-name"
              >Nome ou negócio <span aria-hidden="true">*</span></label
            ><input
              id="contact-name"
              v-model="values.name"
              name="name"
              autocomplete="name"
              maxlength="100"
              placeholder="Como posso te chamar?"
              required
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'name-error' : undefined"
            />
            <p v-if="errors.name" id="name-error" class="field-error">
              {{ errors.name }}
            </p>
          </div>
          <div class="field">
            <label for="contact-email"
              >E-mail para retorno <span aria-hidden="true">*</span></label
            ><input
              id="contact-email"
              v-model="values.email"
              name="email"
              type="email"
              autocomplete="email"
              maxlength="254"
              placeholder="seu@email.com"
              required
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : undefined"
            />
            <p v-if="errors.email" id="email-error" class="field-error">
              {{ errors.email }}
            </p>
          </div>
        </div>
        <div class="field">
          <label for="contact-type"
            >Serviço de interesse <span aria-hidden="true">*</span></label
          ><select
            id="contact-type"
            v-model="values.projectType"
            name="projectType"
            required
            :aria-invalid="!!errors.projectType"
            :aria-describedby="errors.projectType ? 'type-error' : undefined"
          >
            <option value="" disabled>Selecione uma possibilidade</option>
            <option v-for="type in types" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
          <p v-if="errors.projectType" id="type-error" class="field-error">
            {{ errors.projectType }}
          </p>
        </div>
        <div class="field">
          <label for="contact-message"
            >Sua ideia <span aria-hidden="true">*</span></label
          ><textarea
            id="contact-message"
            v-model="values.message"
            name="message"
            rows="4"
            maxlength="5000"
            placeholder="Conte um pouco sobre sua ideia..."
            required
            :aria-invalid="!!errors.message"
            :aria-describedby="
              errors.message ? 'message-error' : 'contact-data'
            "
          />
          <p v-if="errors.message" id="message-error" class="field-error">
            {{ errors.message }}
          </p>
        </div>
        <div class="honeypot" aria-hidden="true">
          <label for="contact-website">Deixe este campo vazio</label
          ><input
            id="contact-website"
            v-model="values.website"
            name="website"
            tabindex="-1"
            autocomplete="off"
          />
        </div>
        <p id="contact-data" class="privacy-note">
          {{
            contactEnabled
              ? "Dados usados apenas para responder ao seu contato."
              : "Os dados ficam nesta página e compõem o texto que você pode copiar. Não são armazenados pelo site."
          }}
          <RouterLink to="/privacidade"
            >Leia a política de privacidade.</RouterLink
          >
        </p>
        <button
          class="btn btn-primary submit-contact"
          type="submit"
          :disabled="state === 'loading'"
        >
          <template v-if="state === 'loading'"
            >Enviando <PhCircleNotch class="spinner" /></template
          ><template v-else-if="state === 'success'"
            >Enviar outra mensagem <PhCheck /></template
          ><template v-else
            >{{
              contactEnabled ? "Enviar mensagem" : "Gerar mensagem de orçamento"
            }}
            <PhArrowUpRight
          /></template>
        </button>
        <p
          v-if="feedback"
          class="form-feedback"
          :class="state"
          :role="state === 'error' ? 'alert' : 'status'"
        >
          {{ feedback }}
        </p>
        <div v-if="generated" class="budget-draft">
          <label for="budget-message">Sua mensagem de orçamento</label>
          <textarea
            id="budget-message"
            ref="draftTextarea"
            :value="generated"
            readonly
            rows="9"
            aria-describedby="budget-help"
          />
          <p id="budget-help">
            Revise o texto antes de compartilhar. Gerar ou copiar não envia a
            mensagem para o VERSO*.
          </p>
          <button type="button" class="btn btn-outline" @click="copyMessage">
            Copiar mensagem <PhCopy />
          </button>
        </div>
      </form>
    </div>
    <div v-if="site.email || site.whatsapp" class="direct-contact">
      <a v-if="site.email" :href="`mailto:${site.email}`" class="text-link"
        >{{ site.email }} <PhArrowUpRight /></a
      ><a
        v-if="site.whatsapp"
        :href="`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Olá, Renata! Conheci o VERSO e gostaria de conversar sobre um projeto.')}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-link"
        >Conversar no WhatsApp <PhWhatsappLogo
      /></a>
    </div>
    <div class="contact-baseline" aria-hidden="true">
      <PhArrowUpRight :size="20" /><span></span
      ><span class="micro">O PRÓXIMO VERSO É SEU.</span>
    </div>
  </section>
</template>
<style scoped>
.contact {
  isolation: isolate;
  overflow: hidden;
}
.contact::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("/images/textura-editorial-960.webp") no-repeat 70% 5%/100%
    auto;
  opacity: 0.2;
  pointer-events: none;
  z-index: -1;
}
.contact .section-topline {
  margin-bottom: 36px;
}
.contact .section-number {
  margin-left: 14px;
  font-size: 9px;
}
.contact-label {
  border: 1px solid #63242f;
  border-radius: 20px;
  padding: 8px 10px;
  font-size: 9px;
  color: var(--red-light);
  white-space: nowrap;
}
.contact-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 7%;
  align-items: start;
}
.contact h2 {
  font: 600 clamp(64px, 6.7vw, 112px) / 0.9 var(--display);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.contact h2 em {
  font: 700 italic 1.12em/0.9 var(--editorial);
  color: var(--red);
  text-transform: none;
}
.contact-intro {
  font-size: 15px;
  max-width: 37ch;
  color: var(--muted);
  margin: 30px 0 25px;
}
.contact-availability {
  color: var(--pink);
  border-left: 1px solid var(--red);
  padding-left: 10px;
  font-size: 12px;
  max-width: 42ch;
  line-height: 1.75;
  margin-bottom: 18px;
}
.contact form {
  counter-reset: contact-field;
  padding-top: 12px;
}
.field label::before {
  content: "0" counter(contact-field) " / ";
  color: var(--red-light);
  margin-right: 6px;
}
.contact-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}
.field {
  counter-increment: contact-field;
  margin-top: 12px;
  min-width: 0;
}
.field label {
  display: block;
  font: 11px var(--mono);
  color: var(--muted);
  margin-bottom: 8px;
}
.field label > span {
  color: var(--red-light);
}
.field input,
.field select,
.field textarea {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--control-line);
  border-radius: 0;
  background: #181117dd;
  color: var(--white);
  padding: 13px;
  font-size: 16px;
  transition: border-color 0.2s;
  min-height: 50px;
}
.field input::placeholder,
.field textarea::placeholder {
  color: #a09a9f;
  font-size: 13px;
}
.field select {
  appearance: auto;
}
.field textarea {
  resize: vertical;
  min-height: 130px;
}
.field [aria-invalid="true"] {
  border-color: var(--red-light);
}
.field-error {
  font-size: 11px;
  line-height: 1.5;
  color: var(--red-light);
  margin-top: 6px;
}
.privacy-note {
  font-size: 11px;
  color: var(--muted);
  margin: 14px 0;
  line-height: 1.6;
}
.privacy-note a {
  text-decoration: underline;
  text-underline-offset: 2px;
}
.submit-contact {
  width: 100%;
  min-height: 60px;
  border-radius: 2px;
  font-size: 11px;
  padding: 14px;
}
.form-feedback {
  font-size: 12px;
  margin-top: 15px;
  line-height: 1.6;
}
.form-feedback.error {
  color: var(--red-light);
}
.form-feedback.success,
.form-feedback.draft {
  color: var(--pink);
}
.budget-draft {
  margin-top: 24px;
  border-top: 1px solid var(--line);
  padding-top: 23px;
}
.budget-draft label {
  display: block;
  color: var(--pink);
  font: 12px var(--mono);
  margin-bottom: 12px;
}
.budget-draft textarea {
  width: 100%;
  padding: 15px;
  background: var(--surface);
  color: var(--white);
  border: 1px solid var(--control-line);
  border-radius: 0;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
}
.budget-draft p {
  font-size: 12px;
  color: var(--muted);
  margin: 12px 0 18px;
}
.contact-baseline {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 26px;
  color: var(--red);
}
.contact-baseline > span:nth-child(2) {
  height: 1px;
  background: #6a2e37;
  flex: 1;
}
.contact-baseline .micro {
  font-size: 9px;
  color: var(--muted);
}
.honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
}
.spinner {
  animation: spin 1s linear infinite;
}
.direct-contact {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
.direct-contact .text-link {
  font-size: 12px;
  min-height: 44px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 1100px) {
  .contact-fields {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 767px) {
  .contact::before {
    background-image: url("/images/textura-editorial-480.webp");
  }
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .contact h2 {
    font-size: clamp(53px, 14vw, 80px);
  }
  .contact .section-topline {
    margin-bottom: 30px;
    gap: 10px;
  }
  .contact-label {
    font-size: 8px;
  }
  .contact-intro {
    font-size: 14px;
    margin-top: 23px;
  }
  .field {
    counter-increment: contact-field;
    margin-top: 17px;
  }
  .field input,
  .field select,
  .field textarea {
    padding: 14px 12px;
  }
  .field textarea {
    min-height: 135px;
  }
  .privacy-note {
    margin: 18px 0;
  }
  .budget-draft textarea {
    font-size: 16px;
  }
  .contact-baseline {
    margin-top: 30px;
  }
  .contact-baseline .micro {
    font-size: 7px;
  }
}
</style>
