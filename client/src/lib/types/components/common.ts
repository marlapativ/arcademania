import type { AnyFunction } from "@chakra-ui/utils";
import type { IconType } from "react-icons";

import type { ReactChildrenProps } from "../globals";

export interface GameInfoProps extends ReactChildrenProps {
  id: number;
}

export interface NavItemProps extends ReactChildrenProps {
  navSize: string;
  title: string;
  icon: IconType;
  active: boolean;
}

export interface GameHeaderProps extends ReactChildrenProps {
  helpContent: string;
  isFavourite: boolean;
}

export type GameInfoCollection = {
  [id: number]: GameInfoComponent;
};

export type GameInfo = {
  id: number;
  name: string;
};

export type GameHelp = {
  helpContent: string;
};

export type GameInfoComponent = GameInfo &
  GameHelp & {
    component: React.ReactNode;
  };

export type UserId = {
  userId: string;
};

export type UserInfo = UserId & {
  name: string;
  icon?: string;
};

export type UseCallbackFunc<T> = {
  apply: () => void;
  data: T;
};

export type AuthInfo = {
  token: string;
};

export type ModalDataProps = {
  modalHeader: string;
  modalCotent: string;
  actionButtonText: string;
  buttonAction: AnyFunction;
};

export type PopOverProps = {
  popOverHeader: string;
  popOverCotent: string;
  triggerButtonText: string;
};

export type ToastMessageProps = {
  messageTitle: string;
  messageDesc: string;
};
