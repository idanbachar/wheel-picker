export const ScrollWheelToIndex = (
  itemIndex: number,
  wheelPickerContainer: HTMLUListElement
) => {
  const itemHeight = getCurrentItemHeight(wheelPickerContainer);
  wheelPickerContainer.scrollTop = itemIndex * itemHeight;
};

export const StartListenForWheelPickerScoll = (
  wheelPickerContainer: HTMLUListElement,
  onChange?: (selectedItem: string, selectedIndex: number) => void,
  colorsProperties?: {
    selectedColor: string | undefined;
    color: string | undefined;
  }
) => {
  let debounceTimer: NodeJS.Timeout;

  wheelPickerContainer?.addEventListener("scroll", function () {
    const itemHeight = getCurrentItemHeight(wheelPickerContainer);
    const index = Math.round(wheelPickerContainer.scrollTop / itemHeight);
    SetHighlightColorForSelectedItem(
      index,
      wheelPickerContainer,
      colorsProperties
    );
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const itemValue = (wheelPickerContainer.children[index] as HTMLElement)
        .innerText;
      ScrollWheelToIndex(index, wheelPickerContainer);
      onChange && onChange(itemValue, index);
    }, 250);
  });
};

export const SetHighlightColorForSelectedItem = (
  itemIndex: number,
  wheelPickerContainer: HTMLUListElement,
  colorsProperties?: {
    selectedColor: string | undefined;
    color: string | undefined;
  }
) => {
  const defaultColor = "white";
  const defaultSelectedColor = "#00ff8d";

  const wheelItemsElements = Array.from(wheelPickerContainer.children);
  wheelItemsElements.forEach((item, index) => {
    if (colorsProperties) {
      (item as HTMLElement).style.color =
        index === itemIndex
          ? colorsProperties.selectedColor
            ? colorsProperties.selectedColor
            : defaultSelectedColor
          : colorsProperties.color
          ? colorsProperties.color
          : defaultColor;
    }
    (item as HTMLElement).style.fontWeight =
      index === itemIndex ? "bold" : "normal";
  });
};

const getCurrentItemHeight = (wheelPickerContainer: HTMLUListElement) => {
  const itemHeight =
    wheelPickerContainer.children.length > 0
      ? wheelPickerContainer?.children[0].getBoundingClientRect().height
      : 32;
  return itemHeight;
};

export const ScrollArrowUp = (wheelPickerContainer: HTMLUListElement) => {
  const itemHeight = getCurrentItemHeight(wheelPickerContainer);
  const currentIndex = Math.round(wheelPickerContainer.scrollTop / itemHeight);
  ScrollWheelToIndex(currentIndex + 1, wheelPickerContainer);
};

export const ScrollArrowDown = (wheelPickerContainer: HTMLUListElement) => {
  const itemHeight = getCurrentItemHeight(wheelPickerContainer);
  const currentIndex = Math.round(wheelPickerContainer.scrollTop / itemHeight);
  ScrollWheelToIndex(currentIndex - 1, wheelPickerContainer);
};
