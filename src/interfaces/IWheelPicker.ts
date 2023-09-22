export interface IWheelPicker {
  name: string;
  items: string[];
  defaultItemIndex?: number;
  onChange?: (selectedItem: string) => void;
}
