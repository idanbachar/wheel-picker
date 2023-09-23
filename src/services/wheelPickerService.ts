export const ScrollWheelToIndex = (
  itemIndex: number,
  items: string[],
  wheelPickerContainer: HTMLUListElement
) => {
  if (itemIndex > items.length) return;
  const itemHeight =
    wheelPickerContainer.children.length > 0
      ? wheelPickerContainer?.children[0].getBoundingClientRect().height
      : 32;

  wheelPickerContainer.scrollTop = itemIndex * itemHeight;
};

export const StartListenForWheelPickerScoll = (
  wheelPickerContainer: HTMLUListElement,
  onChange?: (selectedItem: string) => void
) => {
  let debounceTimer: NodeJS.Timeout;

  wheelPickerContainer?.addEventListener("scroll", function () {
    const itemHeight =
      wheelPickerContainer.children.length > 0
        ? wheelPickerContainer?.children[0].getBoundingClientRect().height
        : 32;

    const index = Math.round(wheelPickerContainer.scrollTop / itemHeight);
    setHighlightColorForSelectedItem(index, wheelPickerContainer);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      wheelPickerContainer.scrollTop = index * itemHeight;
      onChange && onChange(index.toString());
    }, 250);
  });
};

const setHighlightColorForSelectedItem = (
  itemIndex: number,
  wheelPickerContainer: HTMLUListElement
) => {
  const wheelItemsElements = Array.from(wheelPickerContainer.children);
  wheelItemsElements.forEach((item, index) => {
    (item as HTMLElement).style.color = index === itemIndex ? "red" : "white";
    (item as HTMLElement).style.fontWeight =
      index === itemIndex ? "bold" : "regular";
  });
};
