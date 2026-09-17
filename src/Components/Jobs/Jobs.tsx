import { Box, Container, Divider, Group } from "@mantine/core";
import JobsHeader from "./JobsHeader";

export default function Jobs() {
  return (
    <main>
      <Box component="section" className="jobs">
        <Box className="jobs__inner">
          <JobsHeader />
          <Container size={1000}>
            <Group className="jobs__body"></Group>
          </Container>
          <Divider color="#0f0f1033" opacity={0.2}></Divider>
        </Box>
      </Box>
    </main>
  );
}
