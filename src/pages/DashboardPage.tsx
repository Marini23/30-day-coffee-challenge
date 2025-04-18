import { Achievements } from "../components/Achievements/Achievements";

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <div>Progress bar</div>
          <section>
            <Achievements />
          </section>
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
