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

type dailyItem = {
  title: string;
  desc: string;
};

type toggleDailyItem = {
  parentItem: string;
  selectedItem: dailyItem;
}

type loginInfo = {
  username: string;
  password: string;
  id: string;
}

type burgerItem = {
  name: string;
  url: string;
}

type ToggleComplete = (event: React.MouseEvent<HTMLDivElement>) => void;

type ToggleCompleteDaily = (event: React.MouseEvent<HTMLDivElement>, parentItem: string) => void;

type ToggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => void;

type ToggleRemove = (event: React.MouseEvent<HTMLButtonElement>) => void;

type HandleToggleButton = (event: React.MouseEvent<HTMLButtonElement>) => void;

type AddItem = (title: string, desc: string) => void;

type AddListItem = (value: object | undefined) => void;

type AddFinanceItem = (value: object | undefined) => void;

type AddDailyItem = (value: object | undefined) => void;

type GetUser = (user: string | null) => void;

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  items: (itemList: Array<Item>) => void;
  returnFilteredData: (filteredData: Array<Item>) => void;
  loginResult: (user: loginInfo | null) => Function | void;
}

interface ClientToServerEvents {
  hello: () => void;
  addItem: ({title: string, desc: string, id: string}) => void;
  changeStatus: (selectedItem: Item | null) => void;
  removeItem: (selectedItem: object) => void;
  filterCompleted: (id: string | null) => void;
  filterPending: (id: string | null) => void;
  filterReset: (id: string | null) => void;
  getItems: (id: string | null) => void;
  addListItem: (value: object | undefined) => void;
  addFinanceItem: (value: object | undefined) => void;
  addDailyItem: (value: object | undefined) => void;
  changeDailyStatus: (object: object) => void;
  login: (object: object) => void;
  signup: (object: object) => void;
}