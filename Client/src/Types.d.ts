type Item = {
  text: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
};

type ToggleComplete = (selectedItem: Item) => void;

type AddItem = (newItem: string) => void;

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  items: (items: Item) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}