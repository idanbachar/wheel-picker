import { useEffect, useRef } from "react";
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
import { minutesData } from "../../data/time";

const WheelPicker: React.FC<IWheelPicker> = (props) => {
  const {
    name,
    items = minutesData,
    defaultItemIndex = 0,
    onChange,
    selectedColor,
    color,
    isArrows = true,
    arrowsColor = "#f01c74",
  } = props;
  const wheelPickerRef = useRef<HTMLUListElement>(null);
  const colorsProperties = {
    selectedColor,
    color,
  };

  useEffect(() => {
    ScrollWheelToIndex(defaultItemIndex, wheelPickerRef.current!);
    StartListenForWheelPickerScoll(
      wheelPickerRef.current!,
      onChange,
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
          onClick={() => ScrollArrowDown(wheelPickerRef.current!)}
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
          onClick={() => ScrollArrowUp(wheelPickerRef.current!)}
        />
      )}
    </div>
  );
};

export default WheelPicker;
