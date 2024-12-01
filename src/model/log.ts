export interface LogItem {
  name: string;
  feature: string | undefined;
  createdAt: number;
}

export interface ErrorLogItem {
  name?: string;
  text: string;
  createdAt: number;
}
