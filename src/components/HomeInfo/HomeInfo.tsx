import pickingBeans from "../../assets/jpeg-optimizer_picking-coffee-beans.jpg";
import roastingMachine from "../../assets/jpeg-optimizer_roasting-machine.jpg";
import cappuccino from "../../assets/jpeg-optimizer_cappuccino-coffee-cup.jpg";
import { useTranslation } from "react-i18next";

export const HomeInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-18 items-center mt-6 p-8">
      {/* 1st Column */}
      <div className="text-center">
        <img
          src={pickingBeans}
          alt="picking coffee beans"
          className="w-full max-w-xs mx-auto"
        />
        <p className="mt-4 text-espresso text-[18px]">
          {t(`homepage.textOne`)}
        </p>
      </div>

      {/* 3rd Column */}
      <div className="text-center">
        <img
          src={roastingMachine}
          alt="roasting coffee machine"
          className="w-full max-w-xs mx-auto"
        />
        <p className="mt-4 text-espresso text-[18px]">
          {t(`homepage.textTwo`)}
        </p>
      </div>

      {/* 5th Column */}
      <div className="text-center">
        <img
          src={cappuccino}
          alt="cappuccino cup"
          className="w-full max-w-xs mx-auto"
        />
        <p className="mt-4 text-espresso text-[18px]">
          {t(`homepage.textThree`)}
        </p>
      </div>
    </div>
  );
};
