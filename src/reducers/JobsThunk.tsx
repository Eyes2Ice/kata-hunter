import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Job, ServerJob } from "@/Components/Jobs/Jobs.types";

export const JOBS_PAGE_SIZE = 10;

const JOBS_API_URL = "https://kata-jobs.onrender.com/api/jobs";

export interface FetchJobsArgs {
  searchQuery: string | null;
  skills: string[];
  city: string;
  page: number;
}

export interface FetchJobsResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

function mapServerJob(job: ServerJob): Job {
  return {
    id: job.id,
    name: job.name,
    city: job.city,
    space: job.space,
    experience: job.experience,
    companyName: job.company_name,
    publishedAt: job.published_at,
    shortDescription: job.short_description,
    salary: Number(job.salary) || 0,
    skills: job.skills ? job.skills.split(", ") : [],
  };
}

export const fetchJobs = createAsyncThunk<
  FetchJobsResponse,
  FetchJobsArgs,
  { rejectValue: string }
>(
  "jobs/fetchJobs",
  async (
    { searchQuery, skills, city, page },
    { rejectWithValue, signal },
  ) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(JOBS_PAGE_SIZE),
      });

      if (searchQuery?.trim()) {
        params.set("search", searchQuery.trim());
      }

      if (skills.length > 0) {
        params.set("skills", skills.join(","));
      }

      if (city) {
        params.set("city", city);
      }

      const response = await fetch(
        `${JOBS_API_URL}?${params.toString()}`,
        { signal },
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();
      const pagination = data.pagination;
      const jobs: Job[] = Array.isArray(data.jobs)
        ? data.jobs.map(mapServerJob)
        : [];

      return {
        jobs,
        currentPage: Number(pagination?.currentPage) || page,
        totalPages: Number(pagination?.totalPages) || 1,
        totalItems: Number(pagination?.totalItems) || jobs.length,
      };
    } catch (error) {
      if (signal.aborted) {
        throw error;
      }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Unknown Server Error!");
    }
  },
);
