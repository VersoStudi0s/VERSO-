import { ref } from "vue";
import { hasAnyProvider, readConsent, saveConsent, type Consent } from "../lib/analytics";

// Estado compartilhado: o botão flutuante se esconde enquanto o banner está aberto.
const consent = ref<Consent | null>(null);
const bannerOpen = ref(false);

export const useConsent = () => {
  const init = () => {
    consent.value = readConsent();
    bannerOpen.value = hasAnyProvider() && consent.value === null;
  };
  const choose = (value: Consent) => {
    saveConsent(value);
    consent.value = value;
    bannerOpen.value = false;
  };
  const reopen = () => {
    bannerOpen.value = hasAnyProvider();
  };
  return { consent, bannerOpen, init, choose, reopen };
};
