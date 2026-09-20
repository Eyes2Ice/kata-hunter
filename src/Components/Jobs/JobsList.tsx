import { Stack, Card, Text, Group, Badge, Button } from "@mantine/core";
import styles from "./Jobs.module.css";

export default function JobsList() {
  return (
    <Stack className={styles.jobs__list} component="ul">
      <Card withBorder>
        <Stack>
          <Text>Frontend разработчик в стартап</Text>
          <Group>
            <Text>70 000 ₽</Text>
            <Text>Без опыта</Text>
          </Group>
          <Text>ТехноСервис</Text>
          <Badge>ГИБРИД</Badge>
          <Text>Замоскворечье</Text>
          <Button>Смотреть вакансию</Button>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Text>Frontend разработчик в стартап</Text>
          <Group>
            <Text>70 000 ₽</Text>
            <Text>Без опыта</Text>
          </Group>
          <Text>ТехноСервис</Text>
          <Badge>ГИБРИД</Badge>
          <Text>Замоскворечье</Text>
          <Button>Смотреть вакансию</Button>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Text>Frontend разработчик в стартап</Text>
          <Group>
            <Text>70 000 ₽</Text>
            <Text>Без опыта</Text>
          </Group>
          <Text>ТехноСервис</Text>
          <Badge>ГИБРИД</Badge>
          <Text>Замоскворечье</Text>
          <Button>Смотреть вакансию</Button>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Text>Frontend разработчик в стартап</Text>
          <Group>
            <Text>70 000 ₽</Text>
            <Text>Без опыта</Text>
          </Group>
          <Text>ТехноСервис</Text>
          <Badge>ГИБРИД</Badge>
          <Text>Замоскворечье</Text>
          <Button>Смотреть вакансию</Button>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Text>Frontend разработчик в стартап</Text>
          <Group>
            <Text>70 000 ₽</Text>
            <Text>Без опыта</Text>
          </Group>
          <Text>ТехноСервис</Text>
          <Badge>ГИБРИД</Badge>
          <Text>Замоскворечье</Text>
          <Button>Смотреть вакансию</Button>
        </Stack>
      </Card>
    </Stack>
  );
}
