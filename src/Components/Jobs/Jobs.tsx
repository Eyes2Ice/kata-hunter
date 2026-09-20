import { Box, Container, Divider, Group, Stack } from "@mantine/core";
import JobsHeader from "./JobsHeader";
import JobsFilters from "./JobsFilters";
import JobsList from "./JobsList";

import styles from "./Jobs.module.css";

export default function Jobs() {
  return (
    <main>
      <Box component="section" className="jobs">
        <Box className="jobs__inner">
          <JobsHeader />
          <Divider color="#0f0f1033" opacity={0.2}></Divider>
          <Container size={1000}>
            <Group className={styles.jobs__body}>
              <JobsFilters />
              <JobsList />
            </Group>
          </Container>
        </Box>
      </Box>
    </main>
  );
}
