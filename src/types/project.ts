export type Category =
  | "Todos"
  | "Websites"
  | "UI/UX"
  | "Identidade"
  | "Experimentos";
export interface Project {
  slug: string;
  repository?: string;
  techStack?: string[];
  selected?: boolean;
  accent?: string;
  gallery?: { image: string; alt: string; caption: string }[];
  number: string;
  name: string;
  subtitle: string;
  description: string;
  categories: Category[];
  tags: string[];
  image: string;
  alt: string;
  status: string;
  summaryRole?: string;
  context: string;
  imageCaption: string;
  technologies?: string;
  documentationNote?: string;
  problem?: string;
  objectives?: string[];
  participation?: string;
  process?: string[];
  solution?: string;
  results: string;
  learning?: string;
}
