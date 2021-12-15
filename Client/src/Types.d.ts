type Item = {
  text: string;
  complete: boolean;
};

type ToggleComplete = (selectedItem: Item) => void;

type AddItem = (newItem: string) => void;