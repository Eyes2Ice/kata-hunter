import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/Components/Jobs/Jobs.types";
import { fetchJobs } from "./JobsThunk";

interface JobsState {
  jobsList: Job[];
  searchQuery: string | null;
  skills: string[];
  city: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobsList: [],
  searchQuery: null,
  skills: ["JavaScript", "React", "Redux", "Python"],
  city: null,
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

export const { addSearchQuery } = jobsSlice.actions;

export default jobsSlice.reducer;
