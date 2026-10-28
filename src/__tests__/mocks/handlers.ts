import { http, HttpResponse } from "msw";
import { serverJobs } from "./fixtures";

export const API_URL = "https://kata-jobs.onrender.com/api";

export const handlers = [
  http.get(`${API_URL}/jobs`, () => {
    return HttpResponse.json({ jobs: serverJobs });
  }),
  http.get(`${API_URL}/jobs/:id`, ({ params }) => {
    const job = serverJobs.find(({ id }) => String(id) === params.id);

    if (!job) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ job });
  }),
];
