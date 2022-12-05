import { Stack, VStack, Text } from "@chakra-ui/react";
import type React from "react";

import DashboardCarousel from "./dashboardCarousel/DashboardCarousel";
import DashboardSlider from "./dashboardSlider/DashboardSlider";

const Dashboard: React.FC = () => {
  return (
    <Stack>
      <VStack>
        <DashboardCarousel />
        <DashboardSlider />
      </VStack>
    </Stack>
  );
};

export default Dashboard;
