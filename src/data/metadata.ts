import { projects } from "./projects";
export function pageMetadata(path: string) {
  const project = projects.find((item) => path === `/projetos/${item.slug}`);
  if (project)
    return {
      title: `${project.name} — Estudo de projeto | VERSO*`,
      description: `${project.name}: ${project.description} ${project.status}.`,
    };
  if (path === "/privacidade")
    return {
      title: "Privacidade — VERSO*",
      description:
        "Como o VERSO trata dados pessoais, cookies, imagens e créditos.",
    };
  if (path !== "/")
    return {
      title: "Página não encontrada — VERSO*",
      description:
        "Esta página não foi encontrada. Explore os projetos do VERSO*.",
    };
  return {
    title: "VERSO* — Sites, interfaces e design digital",
    description:
      "Sites, interfaces e conteúdo visual para marcas e pequenos negócios. Conheça os serviços e projetos de Renata, estudante de Desenvolvimento de Sistemas no SENAI.",
  };
}
