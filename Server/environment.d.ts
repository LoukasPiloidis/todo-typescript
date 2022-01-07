declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_NAME_TEST: string;
      DB_COLLECTION: string;
      DB_COLLECTION_TEST: string;
      DB_COLLECTION2: string;
      DB_COLLECTION2_TEST: string;
    }
  }
  type Item = {
    title: string;
    complete: boolean;
    description?: string;
    subItems?: Item;
    desc?: string;
    id: string;
    list?: Array<string>;
    finance?: Array<object>;
    daily?: Array<object>;
  };

 interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    items: (items: Array<Item> | unknown) => [];
    addItems: (newItem: object) => void;
    returnFilteredData: (filteredData: Array<Item> | unknown) => [];
    getItems: () => [] | null;
  };

 interface ClientToServerEvents {
    hello: () => void;
    filterCompleted: () => void;
    filterPending: () => void;
  };

 interface InterServerEvents {
    ping: () => void;
  };

 interface SocketData {
    name: string;
    age: number;
  };

 interface removeObject {
    title: string
    id: string
  };

  type fullElement = {
    element: string;
    complete: boolean;
  }

 type addListItem = {
    title: string;
    fullElement: fullElement;
    id: string;
    complete: boolean;
  };

 type addFinanceItem = {
    title: string;
    item: object;
    id: string;
  };

 type addDailyItem = {
    title: string;
    item: object;
    id: string;
  };

 type dailyItem = {
    title: string;
    desc?: string;
    complete: boolean;
    index?: string;
    id: string;
  };

 type toggleDailyItem = {
    parentItem: string;
    selectedItem: dailyItem;
  };

 type userLoginInfo = {
    userName: string;
    pass: string;
  };

 type userSignupInfo = {
    username: string;
    password: string;
    id: number;
  };
  
};

export {}
