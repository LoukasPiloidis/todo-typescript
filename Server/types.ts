export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  items: (items: Array<Item> | unknown) => [];
  addItems: (newItem: object) => void;
  returnFilteredData: (filteredData: Array<Item> | unknown) => [];
  getItems: () => [] | null;
}

export interface ClientToServerEvents {
  hello: () => void;
  filterCompleted: () => void;
  filterPending: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface removeObject {
  title: string
  id: string
}


export type Item = {
  title: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
  desc?: string;
  id: string;
};

export type addListItem = {
  title: string;
  element: string;
  id: string;
};

export const EVENTS = {
  ITEMS: "ITEMS"
};
