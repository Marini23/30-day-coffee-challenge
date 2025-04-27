import { Achievements } from "../components/Achievements/Achievements";
import { ProgressLinear } from "../components/ProgressBar/ProgressLinear";

export const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <h3 className="text-espresso text-[18px] flex justify-center items-center">
          Your progress
        </h3>
        <ProgressLinear />
        <Achievements />
      </section>
      <div>Calendar</div>
      <div>
        <div>Tasks list</div>
        <div>Community</div>
      </div>
    </div>
  );
};
