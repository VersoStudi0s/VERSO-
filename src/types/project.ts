export type Category =
  "Todos" | "Websites" | "UI/UX" | "Identidade" | "Experimentos";
export interface Project {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  categories: Category[];
  tags: string[];
  image: string;
  alt: string;
  status: string;
  context: string;
  problem: string;
  objectives: string[];
  participation: string;
  process: string[];
  solution: string;
  results: string;
  learning: string;
}
