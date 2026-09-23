import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";
import { type Job } from "@/Components/Jobs/Jobs.types";

const selectJobsList = (state: RootState) => state.jobsReducer.jobsList;
const selectSearchQuery = (state: RootState) => state.jobsReducer.searchQuery;

export const selectFilteredJobs = createSelector(
  [selectJobsList, selectSearchQuery],
  (jobsList, searchQuery) => {
    if (!searchQuery) return jobsList;

    const normalizedQuery = searchQuery.trim().toLowerCase();

    return jobsList.filter((job: Job) => {
      const companyName = (job.companyName || "").toLowerCase();
      const jobName = (job.name || "").toLowerCase();

      const matchesCompany = companyName.includes(normalizedQuery);
      const matchesName = jobName.includes(normalizedQuery);

      return matchesCompany || matchesName;
    });
  },
);
