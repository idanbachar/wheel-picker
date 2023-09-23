import { useEffect, useRef } from "react";
import { IWheelPicker } from "../../interfaces/IWheelPicker";
import styles from "./wheel-picker.module.css";
import {
  ScrollArrowDown,
  ScrollArrowUp,
  ScrollWheelToIndex,
  StartListenForWheelPickerScoll,
} from "../../services/wheelPickerService";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const WheelPicker: React.FC<IWheelPicker> = (props) => {
  const {
    name,
    items,
    defaultItemIndex,
    onChange,
    selectedColor,
    color,
    isArrows = true,
    arrowsColor = "#f01c74",
  } = props;
  const wheelPickerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    ScrollWheelToIndex(defaultItemIndex || 0, wheelPickerRef.current!);
    StartListenForWheelPickerScoll(wheelPickerRef.current!, onChange, {
      selectedColor,
      color,
    });
  }, []);

  return (
    <div className={styles.wheelContainer}>
      {isArrows && (
        <IoIosArrowUp
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
          color={arrowsColor}
          className={styles.arrow}
          onClick={() => ScrollArrowUp(wheelPickerRef.current!)}
        />
      )}
    </div>
  );
};

export default WheelPicker;
