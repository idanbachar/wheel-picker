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
    arrowsColor = "white",
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
        {items.map((item, key) => (
          <li
            tabIndex={0}
            id={`${name}_wheel_item_${item}`}
            className={styles.wheelItem}
            key={key}
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
