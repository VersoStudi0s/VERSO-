import { channels, site } from "../config/site";
import { findProject, kindLabels } from "../content/projects";
import { services } from "../content/services";

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  image: string;
  noindex?: boolean;
};

const ogImage = "/images/verso-og.jpg";

export const pageMeta = (path: string): PageMeta => {
  const clean = path.replace(/\/$/, "") || "/";
  const slug = clean.match(/^\/projetos\/([^/]+)$/)?.[1];
  const project = slug ? findProject(slug) : undefined;

  if (project)
    return {
      title: `${project.name}, ${kindLabels[project.kind].toLowerCase()} | VERSO*`,
      description: `${project.tagline} ${project.category}: ${project.type}. Estudo de caso do Time VERSO*.`,
      path: clean,
      image: ogImage,
    };
  if (clean === "/privacidade")
    return {
      title: "Privacidade | VERSO*",
      description: "Como o site da VERSO* trata dados, cookies e analytics.",
      path: clean,
      image: ogImage,
    };
  if (clean !== "/")
    return {
      title: "Página não encontrada | VERSO*",
      description: "Esta página não existe. Volte para o início e conheça a VERSO*.",
      path: clean,
      image: ogImage,
      noindex: true,
    };
  return {
    title: "VERSO* | Sites, identidade visual e soluções digitais para negócios",
    description:
      "Estúdio criativo digital, 100% remoto. Sites, landing pages, identidade visual e artes para redes sociais para pequenos negócios. Comece com um protótipo grátis.",
    path: "/",
    image: ogImage,
  };
};

export const absoluteUrl = (path: string) => new URL(path, site.url).href;

/** Dados estruturados da página inicial (schema.org). Só fatos confirmados. */
export const organizationJsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    alternateName: "VERSO Creative Digital Studio",
    description: site.tagline,
    url: site.url,
    image: absoluteUrl(ogImage),
    email: channels.email,
    sameAs: [channels.instagram.url],
    areaServed: "BR",
    knowsAbout: services.map((service) => service.name),
  }).replaceAll("<", "\\u003c");
