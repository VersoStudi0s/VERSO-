// Analytics com consentimento (LGPD). Nenhum script de terceiros carrega antes do "Aceitar".
// Eventos sempre disparam um CustomEvent "verso:track" no window, o que facilita testes.
import { analyticsConfig } from "../config/analytics";

export type Consent = "granted" | "denied";
export type TrackEvent =
  | "cta_prototipo"
  | "cta_projetos"
  | "click_whatsapp"
  | "click_instagram"
  | "click_email"
  | "pedido_orcamento"
  | "formulario_enviado"
  | "abrir_projeto";
export type TrackProps = Record<string, string>;

type Gtag = (...args: unknown[]) => void;
type Plausible = (event: string, options?: { props?: TrackProps }) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    plausible?: Plausible;
    beTracker?: { t: (options: { hash: string }) => void };
  }
}

let providersLoaded = false;

export const readConsent = (): Consent | null => {
  try {
    const value = localStorage.getItem(analyticsConfig.consentKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

export const saveConsent = (consent: Consent) => {
  try {
    localStorage.setItem(analyticsConfig.consentKey, consent);
  } catch {
    // Navegação privada: a escolha vale só para esta visita.
  }
  if (consent === "granted") loadProviders();
};

export const hasAnyProvider = () =>
  Boolean(analyticsConfig.metricoolHash || analyticsConfig.plausibleDomain || analyticsConfig.gaId);

const addScript = (src: string, attributes: Record<string, string> = {}, onload?: () => void) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  if (onload) script.addEventListener("load", onload);
  document.head.appendChild(script);
};

export const loadProviders = () => {
  if (providersLoaded || typeof window === "undefined") return;
  providersLoaded = true;
  const { metricoolHash, plausibleDomain, gaId } = analyticsConfig;

  if (metricoolHash) {
    addScript("https://tracker.metricool.com/resources/be.js", {}, () =>
      window.beTracker?.t({ hash: metricoolHash }),
    );
  }
  if (plausibleDomain) {
    window.plausible =
      window.plausible ??
      ((...args: unknown[]) => {
        const queue = ((window.plausible as unknown as { q?: unknown[] }).q ??= []);
        queue.push(args);
      });
    addScript("https://plausible.io/js/script.tagged-events.js", { "data-domain": plausibleDomain });
  }
  if (gaId) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
  }
};

export const track = (event: TrackEvent, props: TrackProps = {}) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("verso:track", { detail: { event, props } }));
  if (readConsent() !== "granted") return;
  window.plausible?.(event, { props });
  window.gtag?.("event", event, props);
};

export const initAnalytics = () => {
  if (readConsent() === "granted") loadProviders();
};
