import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IBreadcrumbs} from "../../types/breadcrumbs.types";

export interface IBreadcrumbsProps {
  path: IBreadcrumbs[];
}

export interface BreadcrumbsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, IBreadcrumbsProps{}
