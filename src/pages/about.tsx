import { Center, Stack, Title, Text } from "@mantine/core";

export default function About() {
  return (
    <Center component="main" pt={72}>
      <Stack gap={12} maw={658} bdrs={12} p={24} bg="#fff">
        <Title order={1} fz={26}>
          Руслан Денисов
        </Title>
        <Text>
          Привет! Я - Frontend-разработчик. Пишу приложения на React +
          TypeScript + Redux Toolkit.
        </Text>
      </Stack>
    </Center>
  );
}
