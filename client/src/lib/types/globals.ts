import type { ReactNode } from "react";

export type Merge<P, T> = Omit<P, keyof T> & T;

export type ReactChildrenProps = {
  children?: ReactNode;
};
