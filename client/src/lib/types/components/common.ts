import type { ReactChildrenProps } from "../globals";

export interface GameInfoProps extends ReactChildrenProps {
  id: number;
}

export type GameInfo = {
  [id: number]: GameInfoComponent;
};

export type GameInfoComponent = {
  id: number;
  name: string;
  component: React.ReactNode;
};

export type UserInfo = {
  id: number;
  name: string;
  icon?: string;
};
