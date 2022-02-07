export interface IData {
  statusCode: number;
  message: string;
  error: string;
}

export interface IError {
  status: number;
  data: IData;
}
