import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RadialSeparators } from "./RadialSeparators";

interface ProgressCircleProps {
  completed: number;
  total: number;
}

export const ProgressSection: React.FC<ProgressCircleProps> = ({
  completed,
  total,
}) => {
  const percentage = (completed / total) * 100;

  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbarWithChildren
        value={percentage}
        text={`${Math.round(percentage)}%`}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "#3e2723",
          trailColor: "#c4a484",
          textColor: "#3e2723",
          strokeLinecap: "butt",
        })}
      >
        <RadialSeparators
          count={10}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${10}%`,
          }}
        />
      </CircularProgressbarWithChildren>
    </div>
  );
};
