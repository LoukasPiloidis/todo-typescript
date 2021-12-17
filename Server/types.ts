export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  items: (items: Array<Item>) => [];
  addItems: (newItem: object) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}


export type Item = {
  text: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
};

export const EVENTS = {
  ITEMS: "ITEMS"
};
