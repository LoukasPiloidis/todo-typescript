type Item = {
  text: string;
  complete: boolean;
  description?: string;
  subItems?: Item;
};

type ToggleComplete = (selectedItem: Item) => void;

type AddItem = (newItem: string) => void;