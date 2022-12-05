import { Stack, VStack } from "@chakra-ui/react";
import type React from "react";

import DashboardCarousel from "./dashboardCarousel/DashboardCarousel";
import DashboardSlider from "./dashboardSlider/DashboardSlider";

const Dashboard: React.FC = () => {
  return (
    <Stack>
      <VStack my={1}>
        <DashboardCarousel />
        <DashboardSlider />
      </VStack>
    </Stack>
  );
};

export default Dashboard;
