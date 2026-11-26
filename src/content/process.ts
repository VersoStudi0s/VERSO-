export type ProcessStep = { title: string; text: string; free?: boolean; payment?: boolean };

export const processSteps: readonly ProcessStep[] = [
  { title: "Contato", text: "Você conta o que precisa, do seu jeito. Pode ser uma mensagem curta." },
  { title: "Briefing", text: "A gente entende o negócio, o público e o que precisa ser feito." },
  { title: "Protótipo", text: "Apresentamos uma prévia visual gratuita, com escopo combinado.", free: true },
  { title: "Validação", text: "Você avalia e pede ajustes dentro do que foi combinado.", free: true },
  { title: "Proposta", text: "Enviamos orçamento, prazos e condições por escrito." },
  { title: "Entrada", text: "Com a proposta aprovada e formalizada, é feito o pagamento inicial.", payment: true },
  { title: "Desenvolvimento", text: "A equipe produz e mostra a evolução durante o caminho." },
  { title: "Entrega", text: "O trabalho é finalizado, revisado e entregue." },
];
