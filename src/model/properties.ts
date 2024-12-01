export interface AccessProperties {
  key: string;
  autoFlush: boolean;
  clientId?: () => Promise<string | undefined>;
  identifyKey?: () => Promise<string>;
}

export const DefaultProperties: Partial<AccessProperties> = {
  autoFlush: false,
};
