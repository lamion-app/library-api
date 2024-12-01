import { ErrorLogItem, LogItem } from "../model/log";

export interface DataStorage {
  events(): Array<LogItem>;
  errors(): Array<ErrorLogItem>;
  addEvent: (value: LogItem) => void;
  addError: (value: ErrorLogItem) => void;
  clear: () => void;
}
