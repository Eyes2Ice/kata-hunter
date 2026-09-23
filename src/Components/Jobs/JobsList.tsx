import {
  Stack,
  Card,
  Text,
  Group,
  Badge,
  Button,
  NumberFormatter,
  Loader,
} from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { fetchJobs } from "@/reducers/JobsThunk";
import { SPACE_LABELS } from "./Jobs.types";
import clsx from "clsx";

import styles from "./Jobs.module.css";
import { useEffect } from "react";
import { selectFilteredJobs } from "@/reducers/JobsSelectors";

export default function JobsList() {
  const dispatch = useTypedDispatch();
  const jobs = useTypedSelector(selectFilteredJobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <Stack className={styles.jobs__list} component="ul">
      {useTypedSelector((store) => store.jobsReducer.isLoading) && (
        <Loader
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
                {job.experience}
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
            <Button className={styles.button}>Смотреть вакансию</Button>
          </Card>
        );
      })}
    </Stack>
  );
}
