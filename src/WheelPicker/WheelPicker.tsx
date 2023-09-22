import { useEffect, useRef } from "react";
import { IWheelPicker } from "../interfaces/IWheelPicker";
import styles from "./wheel-picker.module.css";

const WheelPicker: React.FC<IWheelPicker> = (props) => {
  const { name, items } = props;
  const wheelPickerRef = useRef<HTMLUListElement>(null);
  let debounceTimer: NodeJS.Timeout;
  const defaultHeight = 32;

  useEffect(() => {
    wheelPickerRef.current?.addEventListener("scroll", function () {
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        if (wheelPickerRef.current) {
          const itemHeight =
            wheelPickerRef.current.children.length > 0
              ? wheelPickerRef.current?.children[0].getBoundingClientRect()
                  .height
              : defaultHeight;

          const index = Math.round(
            wheelPickerRef.current.scrollTop / itemHeight
          );

          wheelPickerRef.current.scrollTop = index * itemHeight;
        }
      }, 100);
    });
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
