import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { setFiltersFromUrl } from "@/reducers/JobsSlice";

const DEFAULT_SKILLS = ["JavaScript", "React", "Redux", "Python"];

interface ParsedFilters {
  searchQuery: string | null;
  skills: string[];
  currentPage: number;
}

function areSkillsEqual(left: string[], right: string[]) {
  return (
    left.length === right.length &&
    left.every((skill, index) => skill === right[index])
  );
}

function parseFilters(params: URLSearchParams): ParsedFilters {
  const hasSkillsParam = params.has("skills");

  let skills: string[];

  if (hasSkillsParam) {
    skills = params
      .getAll("skills")
      .flatMap((value) => value.split(",").filter(Boolean));
  } else if (params.has("searchQuery")) {
    skills = [];
  } else {
    skills = [...DEFAULT_SKILLS];
  }

  const rawPage = Number(params.get("page"));
  const currentPage =
    Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  return {
    searchQuery: params.get("searchQuery"),
    skills,
    currentPage,
  };
}

export function useJobsSearchParams() {
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchParams = useRef(searchParams);
  const lastWrittenParams = useRef<string | null>(null);
  const previousFilters = useRef<string | null>(null);
  const previousPage = useRef<number | null>(null);
  const syncingFromUrl = useRef(false);

  const searchQuery = useTypedSelector(
    (state) => state.jobsReducer.searchQuery,
  );
  const skills = useTypedSelector((state) => state.jobsReducer.skills);
  const currentPage = useTypedSelector(
    (state) => state.jobsReducer.currentPage,
  );

  const latestFilters = useRef({ searchQuery, skills, currentPage });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const params = initialSearchParams.current;

    lastWrittenParams.current = params.toString();
    dispatch(setFiltersFromUrl(parseFilters(params)));
    setInitialized(true);
  }, [dispatch]);

  useEffect(() => {
    latestFilters.current = { searchQuery, skills, currentPage };
  }, [searchQuery, skills, currentPage]);

  useEffect(() => {
    if (!initialized) return;

    const currentParams = searchParams.toString();

    if (currentParams === lastWrittenParams.current) {
      return;
    }

    const parsedFilters = parseFilters(searchParams);
    const latest = latestFilters.current;

    if (
      parsedFilters.searchQuery === latest.searchQuery &&
      parsedFilters.currentPage === latest.currentPage &&
      areSkillsEqual(parsedFilters.skills, latest.skills)
    ) {
      return;
    }

    syncingFromUrl.current = true;
    dispatch(setFiltersFromUrl(parsedFilters));
  }, [dispatch, initialized, searchParams]);

  useEffect(() => {
    if (!initialized) return;

    if (syncingFromUrl.current) {
      syncingFromUrl.current = false;
      return;
    }

    const nextParams = new URLSearchParams();

    if (searchQuery?.trim()) {
      nextParams.set("searchQuery", searchQuery.trim());
    }

    if (skills.length > 0) {
      skills.forEach((skill) => {
        nextParams.append("skills", skill);
      });
    } else {
      nextParams.set("skills", "");
    }

    if (currentPage > 1) {
      nextParams.set("page", String(currentPage));
    }

    const nextValue = nextParams.toString();
    const filtersKey = JSON.stringify({
      searchQuery: searchQuery?.trim() ?? "",
      skills,
    });

    if (nextValue === searchParams.toString()) {
      lastWrittenParams.current = nextValue;
      previousFilters.current = filtersKey;
      previousPage.current = currentPage;
      return;
    }

    const pageOnlyChanged =
      previousFilters.current === filtersKey &&
      previousPage.current !== null &&
      previousPage.current !== currentPage;

    lastWrittenParams.current = nextValue;
    previousFilters.current = filtersKey;
    previousPage.current = currentPage;
    setSearchParams(nextParams, { replace: !pageOnlyChanged });
  }, [
    initialized,
    searchQuery,
    skills,
    currentPage,
    searchParams,
    setSearchParams,
  ]);

  return initialized;
}
