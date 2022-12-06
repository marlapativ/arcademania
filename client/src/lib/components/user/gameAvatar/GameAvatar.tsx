import { Avatar } from "@chakra-ui/react";

import type { UserInfoProps } from "../../../types/components/common";

const GameAvatar: React.FC<UserInfoProps> = ({ name, icon, size }) => {
  const sz = size ?? "md";
  return <Avatar name={name} src={icon} size={sz} />;
};

export default GameAvatar;
