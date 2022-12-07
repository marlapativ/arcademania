import { Stack, VStack } from "@chakra-ui/react";
import type React from "react";

import DashboardCarousel from "./dashboardCarousel/DashboardCarousel";
import DashboardList from "./dashboardList/DashboardList";
import DashboardSlider from "./dashboardSlider/DashboardSlider";

/**
 * Container Component for entire Dashboard.
 *
 * @returns Dashboard
 */
const Dashboard: React.FC = () => {
  return (
    <Stack>
      <VStack my={1} gap={2}>
        <DashboardCarousel />
        <DashboardSlider />
        <DashboardList />
      </VStack>
    </Stack>
  );
};

export default Dashboard;
