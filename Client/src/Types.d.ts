type Item = {
  title: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
  desc?: string;
  id: string;
  list?: Array;
  finance?: Array;
  daily?: Array;
};

type financeItem = {
  title: string;
  price: string;
};

// type dailyItem = {
//   title: string;
//   desc: string;
//   complete: boolean;
//   id: string;
// };

type ToggleComplete = (event: React.MouseEvent<HTMLDivElement>) => void;

type ToggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => void;

type ToggleRemove = (event: React.MouseEvent<HTMLButtonElement>) => void;

type HandleToggleButton = (event: React.MouseEvent<HTMLButtonElement>) => void;

type AddItem = (title: string, desc: string) => void;

type AddListItem = (value: object | undefined) => void;

type AddFinanceItem = (value: object | undefined) => void;

type AddDailyItem = (value: object | undefined) => void;


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
  addListItem: (value: object | undefined) => void;
  addFinanceItem: (value: object | undefined) => void;
  addDailyItem: (value: object | undefined) => void;

}