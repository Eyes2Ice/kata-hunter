import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { setFiltersFromUrl } from "@/reducers/JobsSlice";

const DEFAULT_SKILLS = ["JavaScript", "React", "Redux", "Python"];
const DEFAULT_CITY = "Все города";

export function useJobsSearchParams() {
  const dispatch = useTypedDispatch();
  const [searchParams] = useSearchParams();

  const searchQuery = useTypedSelector(
    (state) => state.jobsReducer.searchQuery,
  );
  const skills = useTypedSelector((state) => state.jobsReducer.skills);
  const city = useTypedSelector((state) => state.jobsReducer.city);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const hasFilters =
      params.has("searchQuery") || params.has("skills") || params.has("city");

    const nextFilters = hasFilters
      ? {
          searchQuery: params.get("searchQuery"),
          skills: params.has("skills")
            ? params
                .getAll("skills")
                .flatMap((value) => value.split(",").filter(Boolean))
            : [],
          city: params.get("city") || DEFAULT_CITY,
        }
      : {
          searchQuery: null,
          skills: DEFAULT_SKILLS,
          city: DEFAULT_CITY,
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

    if (city && city !== DEFAULT_CITY) {
      nextParams.set("city", city);
    }

    if (nextParams.toString() === searchParams.toString()) {
      return;
    }

    const queryString = nextParams.toString();
    const newSuffix = queryString ? `?${queryString}` : "";
    window.history.pushState(null, "", window.location.pathname + newSuffix);
  }, [initialized, searchQuery, skills, city, searchParams]);
}
