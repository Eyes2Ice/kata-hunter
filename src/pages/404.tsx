import { Center, Group, Stack, Title, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Pagenotfound() {
  return (
    <Center component="main" pt={72}>
      <Stack bdrs={12} p={32} bg="#fff">
        <Group justify="space-between" align="flex-end">
          <Title order={1} maw={400}>
            Упс! Такой страницы не существует
          </Title>
          <Link
            to="/"
            style={{
              borderRadius: 4,
              paddingInline: 22,
              backgroundColor: "#4263eb",
              lineHeight: 2.5,
              color: "#fff",
            }}
          >
            На главную
          </Link>
        </Group>
        <Text fz={18} lh={1.33}>
          Давайте перейдём к началу.
        </Text>
        <Image
          bdrs={12}
          src="https://media1.tenor.com/m/baBulgRz6XkAAAAd/sad-cat.gif"
        />
      </Stack>
    </Center>
  );
}
