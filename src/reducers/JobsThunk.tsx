import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Job, ServerJob } from "@/Components/Jobs/Jobs.types";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("https://kata-jobs.onrender.com/api/jobs");

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();

      return data.jobs.map(
        (job: ServerJob): Job => ({
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
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Unknown Server Error!");
    }
  },
);
