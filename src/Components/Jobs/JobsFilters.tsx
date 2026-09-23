import {
  PillsInput,
  Pill,
  PillGroup,
  Select,
  Box,
  Title,
  Stack,
  Button,
  Group,
} from "@mantine/core";

import styles from "./Jobs.module.css";
import { useTypedSelector } from "@/hooks/redux";
import { nanoid } from "nanoid";

export default function JobsFilters() {
  const currentSkills = useTypedSelector((store) => {
    return store.jobsReducer.skills;
  });

  return (
    <Stack className={styles.jobs__filters}>
      <Stack className={styles.jobs__skills}>
        <Title order={5} className={styles.title}>
          Ключевые навыки
        </Title>
        <Group gap={8}>
          <PillsInput size="xs" className={styles["skills-input"]}>
            <PillsInput.Field placeholder="Навык" />
          </PillsInput>
          <Button className={styles.button}>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0001 5.41675V20.5834M5.41675 13.0001H20.5834"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Group>
        <PillGroup gap={4} component="ul" className={styles.list}>
          {currentSkills.map((skill) => {
            return (
              <Pill
                key={nanoid(10)}
                component="li"
                withRemoveButton
                className={styles.item}
              >
                {skill}
              </Pill>
            );
          })}
        </PillGroup>
      </Stack>
      <Box className={styles.jobs__locations}>
        <Select
          placeholder="Все города"
          leftSection={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00008 9.33338C9.10465 9.33338 10.0001 8.43795 10.0001 7.33338C10.0001 6.22881 9.10465 5.33338 8.00008 5.33338C6.89551 5.33338 6.00008 6.22881 6.00008 7.33338C6.00008 8.43795 6.89551 9.33338 8.00008 9.33338Z"
                stroke="#0F0F10"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.7714 11.1047L8.94275 13.9334C8.69274 14.1831 8.35381 14.3234 8.00042 14.3234C7.64703 14.3234 7.30809 14.1831 7.05808 13.9334L4.22875 11.1047C3.4829 10.3588 2.97497 9.40852 2.76921 8.37396C2.56344 7.3394 2.66908 6.26706 3.07275 5.29254C3.47643 4.31801 4.16002 3.48508 5.03707 2.89905C5.91413 2.31303 6.94526 2.00024 8.00008 2.00024C9.05491 2.00024 10.086 2.31303 10.9631 2.89905C11.8402 3.48508 12.5237 4.31801 12.9274 5.29254C13.3311 6.26706 13.4367 7.3394 13.231 8.37396C13.0252 9.40852 12.5173 10.3588 11.7714 11.1047Z"
                stroke="#0F0F10"
                strokeOpacity="0.3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          data={["Все города", "Москва", "Санкт-петербург"]}
        ></Select>
      </Box>
    </Stack>
  );
}
