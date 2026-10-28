import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { setFiltersFromUrl } from "@/reducers/JobsSlice";

const DEFAULT_SKILLS = ["JavaScript", "React", "Redux", "Python"];

export function useJobsSearchParams() {
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchParams = useRef(searchParams);

  const searchQuery = useTypedSelector(
    (state) => state.jobsReducer.searchQuery,
  );
  const skills = useTypedSelector((state) => state.jobsReducer.skills);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const params = initialSearchParams.current;

    const hasFilters = params.has("searchQuery") || params.has("skills");

    const nextFilters = hasFilters
      ? {
          searchQuery: params.get("searchQuery"),
          skills: params.has("skills")
            ? params
                .getAll("skills")
                .flatMap((value) => value.split(",").filter(Boolean))
            : [],
        }
      : {
          searchQuery: null,
          skills: DEFAULT_SKILLS,
        };

    dispatch(setFiltersFromUrl(nextFilters));
    setInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) return;

    const nextParams = new URLSearchParams();

    if (searchQuery?.trim()) {
      nextParams.set("searchQuery", searchQuery.trim());
    }

    skills.forEach((skill) => {
      nextParams.append("skills", skill);
    });

    if (nextParams.toString() === searchParams.toString()) {
      return;
    }

    setSearchParams(nextParams, { replace: true });
  }, [initialized, searchQuery, skills, searchParams, setSearchParams]);
}
