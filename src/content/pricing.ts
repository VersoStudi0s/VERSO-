// Pacotes comerciais. Vazio de propósito: a tabela de preços ainda não foi aprovada.
// Enquanto a lista estiver vazia, a seção não aparece no site.
// Não publique valores internos, custos ou divisão financeira da equipe.

export type PricingPackage = {
  id: string;
  name: string;
  /** Valor "a partir de", em reais. */
  priceFrom: number;
  scope: readonly string[];
  serviceId: string;
};

export const pricingPackages: readonly PricingPackage[] = [];
