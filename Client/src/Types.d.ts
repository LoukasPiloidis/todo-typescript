type Item = {
  title: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
  desc?: string;
};

type ToggleComplete = (event: React.MouseEvent<HTMLParagraphElement>) => void;

type ToggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => void;

type ToggleRemove = (event: React.MouseEvent<HTMLButtonElement>) => void;

type AddItem = (title: string, desc: string) => void;

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  items: (itemList: Array<Item>) => void;
  returnFilteredData: (filteredData: Array<Item>) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  addItem: ({title: string, desc: string}) => void;
  changeStatus: (selectedItem: string | null) => void;
  removeItem: (selectedItem: string | null) => void;
  filterCompleted: () => void;
  filterPending: () => void;
}