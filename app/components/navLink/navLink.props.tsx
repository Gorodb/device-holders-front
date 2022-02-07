import {PropsWithChildren, ReactNode} from "react";
import {LinkProps} from "next/dist/client/link";

export interface NavLinkProps extends PropsWithChildren<LinkProps> {
  href: string;
  exact?: boolean;
  children: ReactNode;
  className?: string;
}
