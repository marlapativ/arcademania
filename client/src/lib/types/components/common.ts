import type { ReactChildrenProps } from "../globals";

export interface GameInfoProps extends ReactChildrenProps {
  id: number;
}

export type GameInfoCollection = {
  [id: number]: GameInfoComponent;
};

export type GameInfo = {
  id: number;
  name: string;
};

export type GameInfoComponent = GameInfo & {
  component: React.ReactNode;
};

export type UserInfo = {
  id: number;
  name: string;
  icon?: string;
};
