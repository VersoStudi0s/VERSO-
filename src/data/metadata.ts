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
    title: "VERSO* — Design, desenvolvimento e ideias em movimento",
    description:
      "Portfólio de Renata, estudante do SENAI, desenvolvedora e designer em formação. Interfaces, identidades e experiências digitais criativas.",
  };
}
