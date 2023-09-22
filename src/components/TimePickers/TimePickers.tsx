import { hours, minutes } from "../../data/time";
import WheelPicker from "../WheelPicker/WheelPicker";
import styles from "./timepickers.module.css";

const TimePickers: React.FC = () => {
  return (
    <div className={styles.timePickers}>
      <WheelPicker items={hours} name="hours" />
      <span className={styles.colon}>:</span>
      <WheelPicker items={minutes} name="minutes" />
    </div>
  );
};

export default TimePickers;
