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
  wheelPickerContainer: HTMLUListElement
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
    }, 250);
  });
};
