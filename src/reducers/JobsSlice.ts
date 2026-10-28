import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/Components/Jobs/Jobs.types";
import { fetchJobs } from "./JobsThunk";

interface JobsState {
  jobsList: Job[];
  searchQuery: string | null;
  skills: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobsList: [],
  searchQuery: null,
  skills: ["JavaScript", "React", "Redux", "Python"],
  isLoading: false,
  error: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addSkill: (state, action: PayloadAction<string>) => {
      const trimmedSkill = action.payload.trim();
      if (trimmedSkill && !state.skills.includes(trimmedSkill)) {
        state.skills.push(trimmedSkill);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },
    setFiltersFromUrl: (
      state,
      action: PayloadAction<Pick<JobsState, "searchQuery" | "skills">>,
    ) => {
      state.searchQuery = action.payload.searchQuery;
      state.skills = action.payload.skills;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobsList = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { addSearchQuery, addSkill, removeSkill, setFiltersFromUrl } =
  jobsSlice.actions;

export default jobsSlice.reducer;
