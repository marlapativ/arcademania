import { Avatar } from "@chakra-ui/react";

import type { UserInfo } from "../../../types/components/common";

const GameAvatar: React.FC<UserInfo> = ({ name, icon }) => {
  return <Avatar name={name} src={icon} size="md" />;
};

export default GameAvatar;
