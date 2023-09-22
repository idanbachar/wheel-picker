export const ScrollWheelToIndex = (
  itemIndex: number,
  items: string[],
  wheelPickerContainer: HTMLUListElement
) => {
  if (itemIndex > items.length) return;
  const wheelItemsElements = Array.from(wheelPickerContainer.children);
  wheelItemsElements[itemIndex].scrollIntoView();
};

export const StartListenForWheelPickerScoll = (
  wheelPickerContainer: HTMLUListElement,
  onChange?: (selectedItem: string) => void
) => {
  let debounceTimer: NodeJS.Timeout;

  wheelPickerContainer?.addEventListener("scroll", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const itemHeight =
        wheelPickerContainer.children.length > 0
          ? wheelPickerContainer?.children[0].getBoundingClientRect().height
          : 32;

      const index = Math.round(wheelPickerContainer.scrollTop / itemHeight);

      wheelPickerContainer.scrollTop = index * itemHeight;
      setHighlightColorForSelectedItem(index, wheelPickerContainer);
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
    // (item as HTMLElement).style.transform =
    //   index !== itemIndex ? `perspective(75em) rotateX(38deg)` : "";
  });
};
