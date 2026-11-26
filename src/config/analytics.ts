function metricoolHash(value: string | undefined) {
  if (value === "off") return "";
  return /^[a-f0-9]{32}$/.test(value ?? "")
    ? (value as string)
    : "357836f408df9b32ea7977eb1eac66d4";
}

// Provedores de analytics. Nenhum carrega antes do consentimento do visitante.
export const analyticsConfig = {
  /** Hash do Metricool da marca. VITE_METRICOOL_HASH=off desativa. */
  metricoolHash: metricoolHash(import.meta.env.VITE_METRICOOL_HASH),
  plausibleDomain: /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(import.meta.env.VITE_PLAUSIBLE_DOMAIN ?? "")
    ? (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string)
    : "",
  gaId: /^G-[A-Z0-9]+$/.test(import.meta.env.VITE_GA_ID ?? "")
    ? (import.meta.env.VITE_GA_ID as string)
    : "",
  consentKey: "verso:consent:v1",
} as const;
