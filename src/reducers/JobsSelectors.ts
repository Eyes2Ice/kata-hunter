import { type RootState } from "@/store/store";

export const selectJobs = (state: RootState) => state.jobsReducer.jobsList;
