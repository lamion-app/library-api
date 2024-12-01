import { DataStorage } from "../repository/store";
import { DeviceInfo } from "./meta";

export interface Properties {
  accessKey: string;
  autoFlush: boolean;
  createStore: () => DataStorage;
  meta: {
    clientId?: () => Promise<string | undefined>;
    identifyKey?: () => Promise<string>;
    device: () => DeviceInfo;
  };
}

export interface Context {
  dataStore: DataStorage;
  device: DeviceInfo;
}
