import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/Components/Jobs/Jobs.types";
import { fetchJobs } from "./JobsThunk";

interface JobsState {
  jobsList: Job[];
  searchQuery: string | null;
  skills: string[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobsList: [],
  searchQuery: null,
  skills: [],
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  isLoading: false,
  error: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      const trimmedSkill = action.payload.trim();
      if (trimmedSkill && !state.skills.includes(trimmedSkill)) {
        state.skills.push(trimmedSkill);
        state.currentPage = 1;
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      const nextSkills = state.skills.filter(
        (skill) => skill !== action.payload,
      );

      if (nextSkills.length !== state.skills.length) {
        state.skills = nextSkills;
        state.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = Math.max(1, Math.floor(action.payload) || 1);
    },
    setFiltersFromUrl: (
      state,
      action: PayloadAction<
        Pick<JobsState, "searchQuery" | "skills" | "currentPage">
      >,
    ) => {
      state.searchQuery = action.payload.searchQuery;
      state.skills = action.payload.skills;
      state.currentPage = Math.max(
        1,
        Math.floor(action.payload.currentPage) || 1,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      const totalPages = Math.max(action.payload.totalPages, 1);

      state.isLoading = false;
      state.jobsList = action.payload.jobs;
      state.totalPages = totalPages;
      state.totalItems = action.payload.totalItems;
      state.currentPage = Math.min(
        Math.max(action.payload.currentPage, 1),
        totalPages,
      );
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      if (action.meta.aborted) return;

      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  addSearchQuery,
  addSkill,
  removeSkill,
  setCurrentPage,
  setFiltersFromUrl,
} = jobsSlice.actions;

export default jobsSlice.reducer;
