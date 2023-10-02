import { hoursData, minutesData } from "../../data/time";
import WheelPicker from "../WheelPicker/WheelPicker";
import styles from "./timepickers.module.css";
import { useState } from "react";

const TimePickers: React.FC = () => {
  const date = new Date();
  const currentMinutes = date.getMinutes();
  const currentHours = date.getHours();

  const [hours, setHours] = useState(currentHours.toString());
  const [minutes, setMinutes] = useState(currentMinutes.toString());

  return (
    <>
      <div className={styles.timePickers}>
        <WheelPicker
          defaultItemIndex={currentHours}
          items={hoursData}
          name="hours"
          onChange={setHours}
        />
        <span className={styles.colon}>:</span>
        <WheelPicker
          defaultItemIndex={currentMinutes}
          items={minutesData}
          name="minutes"
          onChange={setMinutes}
        />
      </div>
      <h4>Current Time: {`${hours}:${minutes}`}</h4>
    </>
  );
};

export default TimePickers;
