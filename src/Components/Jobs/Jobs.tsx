import { Box, Container, Divider, Group } from "@mantine/core";
import JobsHeader from "./JobsHeader";
import JobsSkills from "./JobsSkills";
import JobsList from "./JobsList";
import { useJobsSearchParams } from "@/hooks/useJobsSearchParams";

import styles from "./Jobs.module.css";
import JobsLocation from "./JobsLocation";

interface JobsProps {
  city: string;
}

export default function Jobs({ city }: JobsProps) {
  useJobsSearchParams();

  return (
    <main>
      <Box component="section" className="jobs">
        <Box className="jobs__inner">
          <JobsHeader />
          <Divider color="#0f0f1033" opacity={0.2}></Divider>
          <Container size={1000}>
            <JobsLocation />
            <Group className={styles.jobs__body}>
              <JobsSkills />
              <JobsList city={city} />
            </Group>
          </Container>
        </Box>
      </Box>
    </main>
  );
}
