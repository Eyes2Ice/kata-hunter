import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Text,
  Group,
  Badge,
  NumberFormatter,
  Loader,
  Container,
  Stack,
  Title,
} from "@mantine/core";
import styles from "../Components/Jobs/Jobs.module.css";
import type { ServerJob } from "@/Components/Jobs/Jobs.types";
import clsx from "clsx";
import { SPACE_LABELS } from "../Components/Jobs/Jobs.types";

export default function SingleJobPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<ServerJob | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://kata-jobs.onrender.com/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки");
        return res.json();
      })
      .then((data) => setJob(data.job))
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <main>
      <Container size={1000}>
        <Stack
          style={{ alignItems: "center", marginBlock: 24 }}
          component="section"
        >
          {!job ? (
            <Loader className="loader" size={50} />
          ) : (
            <>
              <Card className={styles.job} component="article">
                <Text className={styles.title} component="h1">
                  {job.name}
                </Text>
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
                  {job.company_name}
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
              </Card>
              <Stack className={styles["job-body"]}>
                <Title component="h2" mb={12} fw={600} lh={1.2} fz={20}>
                  Компания
                </Title>
                <Text mb={16}>{job.about_company}</Text>
                <Title component="h3" mb={8} fw={600} fz={16}>
                  О вакансии:
                </Title>
                <Text>{job.description}</Text>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </main>
  );
}
