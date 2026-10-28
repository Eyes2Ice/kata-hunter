import { Tabs } from "@mantine/core";
import styles from "./Jobs.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const CITY_ROUTES = {
  moscow: "/vacancies/moscow",
  petersburg: "/vacancies/petersburg",
} as const;

export default function JobsLocation() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = location.pathname;
  const handleChange = (value: string | null) => {
    if (!value || value === currentRoute) return;
    navigate({ pathname: value, search: location.search });
  };

  return (
    <Tabs
      onChange={handleChange}
      value={currentRoute}
      className={styles.jobs__tabs}
      color="#4263eb"
    >
      <Tabs.List justify="center" component="ul">
        <Tabs.Tab value={CITY_ROUTES.moscow}>Москва</Tabs.Tab>
        <Tabs.Tab value={CITY_ROUTES.petersburg}>Санкт-Петербург</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
