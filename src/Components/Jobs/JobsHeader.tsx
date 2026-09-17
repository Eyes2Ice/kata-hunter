import {
  Container,
  Box,
  Title,
  Text,
  TextInput,
  Button,
  Group,
} from "@mantine/core";

import styles from "@/Components/Jobs/Jobs.module.css";

export default function JobsHeader() {
  return (
    <Container size={1000}>
      <Box component="header" className={styles.jobs__header}>
        <Title order={1} className={styles.jobs__title}>
          Список вакансий <br />
          <Text span>по профессии Frontend-разработчик</Text>
        </Title>
        <Group className={styles.jobs__search}>
          <TextInput
            className={styles["search-input"]}
            leftSection={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                  stroke="#0F0F10"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            placeholder="Должность или название компании"
          ></TextInput>
          <Button className={styles["search-button"]}>Найти</Button>
        </Group>
      </Box>
    </Container>
  );
}
