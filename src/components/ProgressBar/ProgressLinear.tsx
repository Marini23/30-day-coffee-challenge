import * as Progress from "@radix-ui/react-progress";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";

export const ProgressLinear: React.FC = () => {
  const { t } = useTranslation();
  const { completedDays } = useUserStore();
  const progress: number = (completedDays.length / 30) * 100;
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Progress.Root
        value={progress}
        className="relative h-[16px] w-[260px] overflow-hidden bg-latte rounded-full"
        style={{
          transform: "translateZ(0)",
        }}
      >
        <Progress.Indicator
          className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-espresso transition-transform duration-[660ms]"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
      <p className="text-espresso text-[14px]">
        {completedDays.length ?? 0} {t(`progress.completed`)}
      </p>
    </div>
  );
};
