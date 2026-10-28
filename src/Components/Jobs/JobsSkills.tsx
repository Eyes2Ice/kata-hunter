import {
  PillsInput,
  Pill,
  PillGroup,
  Title,
  Stack,
  Button,
  Group,
} from "@mantine/core";

import styles from "./Jobs.module.css";
import { useTypedDispatch, useTypedSelector } from "@/hooks/redux";
import { useState } from "react";
import { addSkill, removeSkill } from "@/reducers/JobsSlice";

export default function JobsFilters() {
  const [skillInput, setSkillInput] = useState("");
  const dispatch = useTypedDispatch();

  const currentSkills = useTypedSelector((store) => {
    return store.jobsReducer.skills;
  });

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      dispatch(addSkill(skillInput));
      setSkillInput("");
    }
  };

  return (
    <Stack className={styles.jobs__filters}>
      <Stack className={styles.jobs__skills}>
        <Title order={5} className={styles.title}>
          Ключевые навыки
        </Title>
        <Group gap={8}>
          <PillsInput size="xs" className={styles["skills-input"]}>
            <PillsInput.Field
              placeholder="Навык"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            />
          </PillsInput>
          <Button
            className={styles.button}
            onClick={handleAddSkill}
            aria-label="Добавить навык"
          >
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
                key={skill}
                component="li"
                withRemoveButton
                onRemove={() => dispatch(removeSkill(skill))}
                removeButtonProps={{
                  "aria-label": `Удалить навык ${skill}`,
                  "aria-hidden": false,
                }}
                className={styles.item}
              >
                {skill}
              </Pill>
            );
          })}
        </PillGroup>
      </Stack>
    </Stack>
  );
}
