type Item = {
  title: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
  desc?: string;
};

type ToggleComplete = (event: React.MouseEvent<HTMLDivElement>) => void;

type ToggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => void;

type ToggleRemove = (event: React.MouseEvent<HTMLButtonElement>) => void;

type HandleToggleButton = (event: React.MouseEvent<HTMLButtonElement>) => void;

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
  addItem: ({title: string, desc: string, id: string}) => void;
  changeStatus: (selectedItem: Item | null) => void;
  removeItem: (selectedItem: object) => void;
  filterCompleted: (id: string | undefined) => void;
  filterPending: (id: string | undefined) => void;
  getItems: (id: string | undefined) => void;
}