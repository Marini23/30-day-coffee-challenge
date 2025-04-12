import { Achievments } from "../components/Achievements/Achievements";

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <div>Progress bar</div>
          <div>
            <Achievments />
          </div>
        </div>
        <div>Calendar</div>
      </div>
      <div>
        <div>Tasks list</div>
        <div>Community</div>
      </div>
    </div>
  );
};
