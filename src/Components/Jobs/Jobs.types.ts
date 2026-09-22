export interface ServerJob {
  id: number;
  company_name: string;
  name: string;
  city: string;
  salary: string;
  published_at: string;
  short_description: string;
  space: string;
  skills: string;
  experience: string;
}

export interface Job {
  id: number;
  companyName: string;
  name: string;
  city: string;
  salary: number;
  publishedAt: string;
  shortDescription: string;
  space: string;
  skills: string[];
  experience: string;
}

export const SPACE_LABELS: Record<string, string> = {
  office: "ОФИС",
  remote: "МОЖНО УДАЛЁННО",
  hybrid: "ГИБРИД",
};
