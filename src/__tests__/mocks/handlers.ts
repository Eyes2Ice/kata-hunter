import { http, HttpResponse } from "msw";
import { serverJobs } from "./fixtures";

export const API_URL = "https://kata-jobs.onrender.com/api";

function filterJobs(url: URL) {
  let jobs = [...serverJobs];

  const search = url.searchParams.get("search");
  if (search) {
    const normalizedSearch = search.toLowerCase();

    jobs = jobs.filter(
      (job) =>
        job.company_name.toLowerCase().includes(normalizedSearch) ||
        job.name.toLowerCase().includes(normalizedSearch),
    );
  }

  const skills = url.searchParams.get("skills");
  if (skills) {
    const normalizedSkills = skills
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter(Boolean);

    jobs = jobs.filter((job) => {
      const jobSkills = job.skills.toLowerCase();
      return normalizedSkills.some((skill) => jobSkills.includes(skill));
    });
  }

  const city = url.searchParams.get("city");
  if (city) {
    jobs = jobs.filter(
      (job) => job.city.toLowerCase() === city.toLowerCase(),
    );
  }

  return jobs;
}

export const handlers = [
  http.get(`${API_URL}/jobs`, ({ request }) => {
    const url = new URL(request.url);
    const jobs = filterJobs(url);

    const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
    const limit = Math.max(Number(url.searchParams.get("limit")) || 10, 1);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalItems = jobs.length;
    const totalPages = Math.ceil(totalItems / limit);

    return HttpResponse.json({
      success: true,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: endIndex < totalItems,
        hasPrevPage: startIndex > 0,
      },
      jobs: jobs.slice(startIndex, endIndex),
    });
  }),
  http.get(`${API_URL}/jobs/:id`, ({ params }) => {
    const job = serverJobs.find(({ id }) => String(id) === params.id);

    if (!job) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ job });
  }),
];
