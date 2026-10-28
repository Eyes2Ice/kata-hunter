import type { ServerJob } from "@/Components/Jobs/Jobs.types";

export const moscowJob: ServerJob = {
  id: 1,
  company_name: "KataCorp",
  about_company: "Компания, которая делает удобные сервисы.",
  name: "Junior Frontend Developer",
  city: "Москва",
  salary: "80000",
  published_at: "2024-01-10",
  short_description: "Работа над внутренними проектами",
  space: "office",
  skills: "JavaScript, React",
  experience: "Без опыта",
  description: "Разработка интерфейсов на React.",
};

export const petersburgJob: ServerJob = {
  id: 2,
  company_name: "WebStudio",
  about_company: "Студия веб-разработки.",
  name: "Middle React Developer",
  city: "Санкт-Петербург",
  salary: "180000",
  published_at: "2024-01-12",
  short_description: "Разработка SPA приложений",
  space: "hybrid",
  skills: "React, TypeScript, Redux",
  experience: "От 2 лет",
  description: "Разработка и поддержка SPA.",
};

export const remoteMoscowJob: ServerJob = {
  id: 3,
  company_name: "DataLab",
  about_company: "Продуктовая компания.",
  name: "Senior Python Developer",
  city: "Москва",
  salary: "220000",
  published_at: "2024-02-01",
  short_description: "Разработка backend-сервисов",
  space: "remote",
  skills: "Python, Redux, TypeScript",
  experience: "От 3 лет",
  description: "Проектирование и разработка сервисов.",
};

export const serverJobs = [moscowJob, petersburgJob, remoteMoscowJob];
