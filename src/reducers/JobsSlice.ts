import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/Components/Jobs/Jobs.types";
import { fetchJobs } from "./JobsThunk";

interface JobsState {
  jobsList: Job[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobsList: [],
  isLoading: false,
  error: null,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
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

export default jobsSlice.reducer;
