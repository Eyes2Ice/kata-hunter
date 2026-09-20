import { Stack, Card, Text, Group, Badge, Button } from "@mantine/core";
import clsx from "clsx";

import styles from "./Jobs.module.css";

export default function JobsList() {
  return (
    <Stack className={styles.jobs__list} component="ul">
      <Card component="li" className={styles.item}>
        <Text className={styles.title}>Frontend разработчик в стартап</Text>
        <Group gap={16} mb={16}>
          <Text lh={1.5} c="#0f0f10">
            70 000 ₽
          </Text>
          <Text fz={14} lh={1.7} c="#0f0f1080">
            Без опыта
          </Text>
        </Group>
        <Text mb={8} fz={14} lh={1.7} c="#0f0f1080">
          ТехноСервис
        </Text>
        <Badge className={clsx(styles.badge, {})}>ГИБРИД</Badge>
        <Text mb={16} lh={1.5} c="#0f0f10">
          Замоскворечье
        </Text>
        <Button className={styles.button}>Смотреть вакансию</Button>
      </Card>
    </Stack>
  );
}
