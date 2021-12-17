type Item = {
  text: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
};

type ToggleComplete = (event: React.MouseEvent<HTMLParagraphElement>) => void;

type AddItem = (newItem: string) => void;

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  items: (itemList: Array<Item>) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  addItem: (newItem: string) => void;
  changeStatus: (updatedItem: string) => void;
}