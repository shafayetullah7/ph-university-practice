export type TerrorSource = {
  path: string | number | null;
  message: string;
};

export type Terror = {
  success: boolean;
  message: string;
  statusCode:number;
  errorSources: TerrorSource[];
  stack: string | null;
  error?:unknown;
};
