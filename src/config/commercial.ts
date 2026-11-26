// Condições comerciais exibidas no site. Nada aqui é regra automática:
// cada proposta define seus próprios valores.

export const commercial = {
  /**
   * Faixa de entrada usada como referência pública.
   * Para esconder a faixa, troque `showRange` para false.
   */
  downPayment: { min: 40, max: 50, showRange: true },

  freePrototype: {
    includes: [
      "Uma tela ou uma proposta visual inicial",
      "Direção de cores, tipografia e layout",
      "Uma rodada de ajuste dentro do que foi combinado",
    ],
    excludes: [
      "Desenvolvimento funcional ou site no ar",
      "Entrega de código-fonte ou arquivos editáveis",
      "Projeto completo antes da contratação",
    ],
  },
} as const;

export const downPaymentText = () => {
  const { min, max, showRange } = commercial.downPayment;
  return showRange
    ? `Entrada definida na proposta, normalmente entre ${min}% e ${max}% do valor.`
    : "Entrada definida na proposta, de acordo com o projeto.";
};
