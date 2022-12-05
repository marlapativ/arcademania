import type { PlacementWithLogical } from "@chakra-ui/react";
import type { AnyFunction } from "@chakra-ui/utils";
import type { IconType } from "react-icons";

import type { ReactChildrenProps } from "../globals";

export interface GameInfoProps extends ReactChildrenProps {
  id: number;
}

export interface SliderGameProps {
  id: number;
  maxH: number | string;
  maxW: number | string;
  popoverPlacement: PlacementWithLogical;
}

export type GameInfoComponentProps = ReactChildrenProps & {
  game: GameInfoComponent;
};

export interface NavItemProps extends ReactChildrenProps {
  navSize: string;
  title: string;
  icon: IconType;
  active: boolean;
}

export type GameInfoCollection = {
  [id: number]: GameInfoComponent;
};

export type GameInfo = {
  id: number;
  name: string;
  image?: string;
  altImage?: string;
  description?: string;
};

export type GameInfoComponent = GameInfo & {
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

export type ToastMessageProps = {
  messageTitle: string;
  messageDesc: string;
};
