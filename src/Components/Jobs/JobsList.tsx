import {
  Stack,
  Card,
  Text,
  Group,
  Badge,
  NumberFormatter,
  Loader,
  Pagination,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { fetchJobs } from "@/reducers/JobsThunk";
import { setCurrentPage } from "@/reducers/JobsSlice";
import { SPACE_LABELS } from "./Jobs.types";
import clsx from "clsx";

import styles from "./Jobs.module.css";
import { useEffect } from "react";
import { selectJobs } from "@/reducers/JobsSelectors";

interface JobsListProps {
  city: string;
  filtersInitialized?: boolean;
}

export default function JobsList({
  city,
  filtersInitialized = true,
}: JobsListProps) {
  const dispatch = useTypedDispatch();
  const jobs = useTypedSelector(selectJobs);
  const searchQuery = useTypedSelector(
    (state) => state.jobsReducer.searchQuery,
  );
  const skills = useTypedSelector((state) => state.jobsReducer.skills);
  const currentPage = useTypedSelector(
    (state) => state.jobsReducer.currentPage,
  );
  const totalPages = useTypedSelector(
    (state) => state.jobsReducer.totalPages,
  );
  const isLoading = useTypedSelector(
    (state) => state.jobsReducer.isLoading,
  );

  useEffect(() => {
    if (!filtersInitialized) return;

    const promise = dispatch(
      fetchJobs({ searchQuery, skills, city, page: currentPage }),
    );

    return () => {
      promise.abort();
    };
  }, [
    dispatch,
    filtersInitialized,
    city,
    searchQuery,
    skills,
    currentPage,
  ]);

  return (
    <Stack style={{ width: "100%", alignItems: "center" }}>
      <Stack className={styles.jobs__list} component="ul">
        {isLoading && (
          <Loader
            data-testid="loader"
            color="var(--mantine-color-shemeColor-7)"
            size="xl"
            type="dots"
            className={styles.loader}
          />
        )}
        {jobs.map((job) => {
          return (
            <Card component="li" className={styles.item} key={job.id}>
              <Text className={styles.title}>{job.name}</Text>
              <Group gap={16} mb={16}>
                <NumberFormatter
                  value={job.salary}
                  suffix=" ₽"
                  thousandSeparator=" "
                />
                <Text fz={14} lh={1.7} c="#0f0f1080">
                  {job.experience === "Без опыта"
                    ? "Без опыта"
                    : `Опыт: ${job.experience}`}
                </Text>
              </Group>
              <Text mb={8} fz={14} lh={1.7} c="#0f0f1080">
                {job.companyName}
              </Text>
              <Badge
                className={clsx(styles.badge, {
                  [styles["badge-office"]]: job.space === "office",
                  [styles["badge-remote"]]: job.space === "remote",
                  [styles["badge-hybrid"]]: job.space === "hybrid",
                })}
              >
                {SPACE_LABELS[job.space]}
              </Badge>
              <Text mb={16} lh={1.5} c="#0f0f10">
                {job.city}
              </Text>
              <Link to={`/vacancies/${job.id}`} className={styles.button}>
                Смотреть вакансию
              </Link>
            </Card>
          );
        })}
      </Stack>
      <Pagination
        total={Math.max(totalPages, 1)}
        value={currentPage}
        onChange={(page) => dispatch(setCurrentPage(page))}
        radius="sm"
        withEdges
        hideWithOnePage
        disabled={isLoading}
      />
    </Stack>
  );
}
