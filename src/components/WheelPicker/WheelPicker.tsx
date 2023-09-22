import { useEffect, useRef } from "react";
import { IWheelPicker } from "../../interfaces/IWheelPicker";
import styles from "./wheel-picker.module.css";
import {
  ScrollWheelToIndex,
  StartListenForWheelPickerScoll,
} from "../../services/wheelPickerService";

const WheelPicker: React.FC<IWheelPicker> = (props) => {
  const { name, items, defaultItemIndex } = props;
  const wheelPickerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    ScrollWheelToIndex(defaultItemIndex || 0, items, wheelPickerRef.current!);
    StartListenForWheelPickerScoll(wheelPickerRef.current!);
  }, []);

  return (
    <ul
      id={`${name}_wheel`}
      ref={wheelPickerRef}
      className={styles.wheelPicker}
    >
      {items.map((item, key) => (
        <li
          id={`${name}_wheel_item_${item}`}
          className={styles.wheelItem}
          key={key}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default WheelPicker;
