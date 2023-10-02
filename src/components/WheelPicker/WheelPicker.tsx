import { useEffect, useRef, useState } from "react";
import { IWheelPicker } from "../../interfaces/IWheelPicker";
import styles from "./wheel-picker.module.css";
import {
  ScrollArrowDown,
  ScrollArrowUp,
  ScrollWheelToIndex,
  SetHighlightColorForSelectedItem,
  StartListenForWheelPickerScoll,
} from "../../services/wheelPickerService";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const WheelPicker: React.FC<IWheelPicker> = (props) => {
  const {
    name,
    items,
    defaultItemIndex = 0,
    onChange,
    selectedColor,
    color,
    isArrows = true,
    arrowsColor = "#f01c74",
    underlineColor = "#a3a6ff",
    isUnderline = true,
  } = props;
  const [currentWheelItemIndex, setCurrentWheelItemIndex] = useState(-1);
  const wheelPickerRef = useRef<HTMLUListElement>(null);
  const colorsProperties = {
    selectedColor,
    color,
  };
  const isArrowUpEnabled = currentWheelItemIndex > 0;
  const isArrowDownEnabled = currentWheelItemIndex < items.length - 1;

  useEffect(() => {
    ScrollWheelToIndex(defaultItemIndex, wheelPickerRef.current!);
    StartListenForWheelPickerScoll(
      wheelPickerRef.current!,
      (selectedItem, selectedIndex) => {
        onChange && onChange(selectedItem);
        setCurrentWheelItemIndex(selectedIndex);
      },
      colorsProperties
    );
    SetHighlightColorForSelectedItem(
      defaultItemIndex,
      wheelPickerRef.current!,
      colorsProperties
    );
  }, []);

  return (
    <div className={styles.wheelContainer}>
      {isArrows && (
        <IoIosArrowUp
          role={"button"}
          tabIndex={0}
          color={arrowsColor}
          className={styles.arrow}
          onClick={() =>
            isArrowUpEnabled && ScrollArrowDown(wheelPickerRef.current!)
          }
          style={{
            opacity: isArrowUpEnabled ? 1 : 0.5,
            cursor: isArrowUpEnabled ? "pointer" : "default",
          }}
        />
      )}
      <ul
        id={`${name}_wheel`}
        ref={wheelPickerRef}
        className={styles.wheelPicker}
      >
        {items.map((item, index) => (
          <li
            tabIndex={0}
            id={`${name}_wheel_item_${item}`}
            className={styles.wheelItem}
            key={index}
            onClick={() => ScrollWheelToIndex(index, wheelPickerRef.current!)}
            style={{
              borderBottom: isUnderline ? `.2rem solid ${underlineColor}` : "",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {isArrows && (
        <IoIosArrowDown
          role={"button"}
          tabIndex={0}
          color={arrowsColor}
          className={styles.arrow}
          onClick={() =>
            isArrowDownEnabled && ScrollArrowUp(wheelPickerRef.current!)
          }
          style={{
            opacity: isArrowDownEnabled ? 1 : 0.5,
            cursor: isArrowDownEnabled ? "pointer" : "default",
          }}
        />
      )}
    </div>
  );
};

export default WheelPicker;
