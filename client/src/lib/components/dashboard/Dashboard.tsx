import { Stack, VStack } from "@chakra-ui/react";
import type React from "react";

import DashboardCarousel from "./dashboardCarousel/DashboardCarousel";

const Dashboard: React.FC = () => {
  return (
    <Stack>
      <VStack>
        <DashboardCarousel />
      </VStack>
    </Stack>
  );
};

export default Dashboard;
