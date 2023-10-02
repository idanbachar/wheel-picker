export interface IWheelPicker {
  name: string;
  items?: string[];
  defaultItemIndex?: number;
  color?: string;
  selectedColor?: string;
  onChange?: (selectedItem: string) => void;
  isArrows?: boolean;
  arrowsColor?: string;
  isUnderline?: boolean;
  underlineColor?: string;
}
