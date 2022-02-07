import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface ITableData {
  columns: string[];
  head: ITableDataHead[];
  tableData: any;
}

export interface ITableDataHead {
  name: string;
  title: string;
}

export interface TableProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>{
  tableData: ITableData,
  onDelete: any;
  onDeleteMany: any;
  onEdit: any;
  showSpinner: boolean;
}
