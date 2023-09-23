import { hours, minutes } from "../../data/time";
import WheelPicker from "../WheelPicker/WheelPicker";
import styles from "./timepickers.module.css";

const TimePickers: React.FC = () => {
  return (
    <div>
      <div className={styles.timePickers}>
        <WheelPicker
          defaultItemIndex={5}
          items={hours}
          name="hours"
          onChange={(selectedItem) => {
            console.log("selectedItem", selectedItem);
          }}
        />
        <span className={styles.colon}>:</span>
        <WheelPicker
          defaultItemIndex={5}
          items={minutes}
          name="minutes"
          onChange={(selectedItem) => {
            console.log("selectedItem", selectedItem);
          }}
        />
      </div>
    </div>
  );
};

export default TimePickers;
