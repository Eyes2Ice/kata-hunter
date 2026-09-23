import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "@/store/store";
import { type Job } from "@/Components/Jobs/Jobs.types";

const selectSearchQuery = (state: RootState) => state.jobsReducer.searchQuery;
const selectSkills = (state: RootState) => state.jobsReducer.skills;
const selectCity = (state: RootState) => state.jobsReducer.city;
const selectJobsList = (state: RootState) => state.jobsReducer.jobsList;

export const selectFilteredJobs = createSelector(
  [selectJobsList, selectSearchQuery, selectSkills, selectCity],
  (jobsList, searchQuery, skills, city) => {
    if (!jobsList.length) return [];

    return jobsList.filter((job: Job) => {
      if (searchQuery && searchQuery.trim() !== "") {
        const normalizedQuery = searchQuery.trim().toLowerCase();
        const companyName = (job.companyName || "").toLowerCase();
        const jobName = (job.name || "").toLowerCase();

        const matchesCompany = companyName.includes(normalizedQuery);
        const matchesName = jobName.includes(normalizedQuery);

        if (!matchesCompany && !matchesName) return false;
      }

      if (skills && skills.length > 0) {
        const jobSkills = job.skills || [];
        const normalizedJobSkills = jobSkills.map((s) => s.toLowerCase());
        const hasMatchingSkill = skills.some((skill) =>
          normalizedJobSkills.includes(skill.toLowerCase()),
        );

        if (!hasMatchingSkill) return false;
      }

      if (city && city !== "Все города") {
        const jobCity = (job.city || "").toLowerCase();
        const targetCity = city.trim().toLocaleLowerCase();

        if (jobCity !== targetCity) return false;
      }

      return true;
    });
  },
);
