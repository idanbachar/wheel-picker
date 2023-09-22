import WheelPicker from "./WheelPicker/WheelPicker";
import { hours, minutes } from "./data/time";
import "./App.css";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <WheelPicker items={hours} name="hours" />
      <WheelPicker items={minutes} name="minutes" />
    </div>
  );
};

export default App;
