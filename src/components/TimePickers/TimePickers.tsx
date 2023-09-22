import { hours, minutes } from "../../data/time";
import WheelPicker from "../WheelPicker/WheelPicker";
import styles from "./timepickers.module.css";

const TimePickers: React.FC = () => {
  return (
    <div className={styles.timePickers}>
      <WheelPicker
        items={hours}
        name="hours"
        onChange={(selectedItem) => {
          console.log("the selected hours is:", selectedItem);
        }}
      />
      <span className={styles.colon}>:</span>
      <WheelPicker
        items={minutes}
        name="minutes"
        onChange={(selectedItem) => {
          console.log("the selected minutes is:", selectedItem);
        }}
      />
    </div>
  );
};

export default TimePickers;
