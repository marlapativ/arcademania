import type { UserInfo } from "lib/types/components/common";

export const getUser = (): UserInfo => {
  return {
    userId: "1",
    name: "Mock User",
  };
};
