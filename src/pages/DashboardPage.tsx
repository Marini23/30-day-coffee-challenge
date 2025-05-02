import { useTranslation } from "react-i18next";
import { Achievements } from "../components/Achievements/Achievements";
import { ProgressLinear } from "../components/ProgressBar/ProgressLinear";
import { TasksList } from "../components/Tasks/Tasks";

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h3 className="text-espresso text-[22px] font-bold flex justify-center items-center">
          {t(`progress.title`)}
        </h3>
        <ProgressLinear />
        <Achievements />
      </section>

      <section>
        <TasksList />
      </section>
      <div>Community</div>
    </div>
  );
};
