import { getIdentifyKey } from "../func/identify";

export interface AccessProperties {
  key: string;
  autoFlush: boolean;
  clientId: () => Promise<string | undefined>;
  identifyKey: () => Promise<string | undefined>;
}

export const DefaultProperties: Partial<AccessProperties> = {
  autoFlush: false,
  identifyKey: async () => {
    return getIdentifyKey();
  },
};
