<script setup lang="ts">
import { ref, reactive, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import {
  PhArrowUpRight,
  PhPlus,
  PhCheck,
  PhCircleNotch,
  PhWhatsappLogo,
} from "@phosphor-icons/vue";
import {
  sendContact,
  ContactError,
  type ContactPayload,
} from "../services/contact";
import { site } from "../data/site";
const route = useRoute();
const contactEnabled = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT);
const form = ref<HTMLFormElement>();
const values = reactive<ContactPayload>({
  name: "",
  email: "",
  projectType: "",
  message: "",
  website: "",
});
const errors = reactive<Record<string, string>>({});
const state = ref<"idle" | "loading" | "success" | "error">("idle"),
  feedback = ref("");
const types = [
  { value: "website", label: "Website / Landing page" },
  { value: "uiux", label: "UI/UX Design" },
  { value: "identidade", label: "Identidade visual" },
  { value: "grafico", label: "Materiais gráficos" },
  { value: "outro", label: "Outra ideia" },
];
watch(
  () => route.query.servico,
  (value) => {
    if (types.some((type) => type.value === value))
      values.projectType = String(value);
  },
  { immediate: true },
);
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
    <h2 id="contact-title">
      TRANSFORME<br />SUA IDEIA<br />EM <em>REALIDADE.</em>
    </h2>
    <PhPlus
      class="contact-plus red"
      :size="30"
      weight="thin"
      aria-hidden="true"
    />
    <p class="contact-intro">
      Tem uma ideia em mente?<br />Vamos descobrir o que ela pode se tornar.
    </p>
    <p v-if="!contactEnabled" class="contact-availability">
      Envio em preparação. Este canal ainda não recebe mensagens.
    </p>
    <form
      ref="form"
      novalidate
      :aria-busy="state === 'loading'"
      @submit.prevent="submit"
    >
      <div class="contact-fields">
        <div class="field">
          <label for="contact-name"
            >Nome <span aria-hidden="true">*</span></label
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
            >E-mail <span aria-hidden="true">*</span></label
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
          >Tipo de projeto <span aria-hidden="true">*</span></label
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
          >Mensagem <span aria-hidden="true">*</span></label
        ><textarea
          id="contact-message"
          v-model="values.message"
          name="message"
          rows="4"
          maxlength="5000"
          placeholder="Conte um pouco sobre sua ideia..."
          required
          :aria-invalid="!!errors.message"
          :aria-describedby="errors.message ? 'message-error' : 'contact-data'"
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
        Dados usados apenas para responder ao seu contato.
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
        ><template v-else>Enviar mensagem <PhArrowUpRight /></template>
      </button>
      <p
        v-if="feedback"
        class="form-feedback"
        :class="state"
        :role="state === 'error' ? 'alert' : 'status'"
      >
        {{ feedback }}
      </p>
    </form>
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
  background: url("/images/textura-editorial-mobile.webp") no-repeat 70% 5%/100%
    auto;
  opacity: 0.09;
  pointer-events: none;
  z-index: -1;
}
.contact .section-topline {
  margin-bottom: 36px;
}
.contact .section-number {
  margin-left: 14px;
  font-size: 8px;
}
.contact-label {
  border: 1px solid #63242f;
  border-radius: 20px;
  padding: 8px 10px;
  font-size: 6px;
  color: var(--red-light);
  white-space: nowrap;
}
.contact h2 {
  font: 700 clamp(38px, 3.5vw, 60px)/0.98 var(--display);
  letter-spacing: -0.02em;
}
.contact h2 em {
  font-style: normal;
  color: var(--red);
}
.contact-plus {
  position: absolute;
  top: 171px;
  right: 40px;
}
.contact-intro {
  font-size: 10px;
  color: var(--muted);
  margin: 20px 0 25px;
}
.contact-availability {
  color: var(--pink);
  border-left: 1px solid var(--red);
  padding-left: 10px;
  font-size: 10px;
  line-height: 1.6;
  margin-bottom: 18px;
}
.contact-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}
.field {
  margin-top: 12px;
  min-width: 0;
}
.field label {
  display: block;
  font: 8px var(--mono);
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
  border: 1px solid var(--control-line);
  border-radius: 6px;
  background: #18171add;
  color: var(--white);
  padding: 12px 10px;
  font-size: 10px;
  transition: border-color 0.2s;
  min-height: 44px;
}
.field input::placeholder,
.field textarea::placeholder {
  color: #a09a9f;
  font-size: 9px;
}
.field select {
  font-size: 9px;
  appearance: auto;
}
.field textarea {
  resize: vertical;
  min-height: 105px;
}
.field [aria-invalid="true"] {
  border-color: var(--red-light);
}
.field-error {
  font-size: 9px;
  line-height: 1.5;
  color: var(--red-light);
  margin-top: 6px;
}
.privacy-note {
  font-size: 8px;
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
  min-height: 47px;
  font-size: 9px;
  padding: 14px;
}
.form-feedback {
  font-size: 11px;
  margin-top: 15px;
  line-height: 1.6;
}
.form-feedback.error {
  color: var(--red-light);
}
.form-feedback.success {
  color: var(--pink);
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
  font-size: 5px;
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
  font-size: 9px;
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
  .contact-plus {
    right: 24px;
    top: 165px;
  }
  .contact h2 {
    font-size: 43px;
  }
}
@media (max-width: 767px) {
  .contact h2 {
    font-size: 55px;
  }
  .contact .section-topline {
    margin-bottom: 30px;
  }
  .contact-label {
    font-size: 7px;
  }
  .contact-plus {
    top: 170px;
    right: 26px;
  }
  .contact-intro {
    font-size: 12px;
  }
  .contact-fields {
    grid-template-columns: 1fr;
  }
  .field {
    margin-top: 17px;
  }
  .field label {
    font-size: 10px;
  }
  .field input,
  .field select,
  .field textarea {
    font-size: 16px;
    min-height: 49px;
    padding: 14px 12px;
  }
  .field input::placeholder,
  .field textarea::placeholder {
    font-size: 12px;
  }
  .field select {
    font-size: 12px;
  }
  .field textarea {
    min-height: 135px;
  }
  .privacy-note {
    font-size: 10px;
    margin: 18px 0;
  }
  .submit-contact {
    font-size: 10px;
    min-height: 52px;
  }
  .field-error {
    font-size: 11px;
  }
  .contact-baseline {
    margin-top: 30px;
  }
  .contact-baseline .micro {
    font-size: 6px;
  }
}
</style>
