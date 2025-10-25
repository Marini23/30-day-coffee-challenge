import { Icon } from "../../utils/Icon";
import { PiShareFat } from "react-icons/pi";
import { useTranslation } from "react-i18next";

import { Achievement } from "../../types/achievements";

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const { t } = useTranslation();

  return (
    <ul className="grid grid-cols-3 gap-4 mt-4 laptop:mt-8 transition-all duration-300 ease-in-out">
      {achievements.map(({ id, icon, completed }, index) => (
        <li
          key={index}
          className="flex flex-col justify-center items-center gap-2"
        >
          <Icon
            name={icon}
            size={100}
            className={`${
              completed ? "fill-gold" : "fill-latte"
            } transition-colors duration-300 ease-in-out`}
          />
          <p
            className={`text-center font-bold whitespace-pre-line laptop:text-[24px] ${
              completed ? "text-gold" : "text-latte"
            } transition-colors duration-300 ease-in-out`}
          >
            {t(`achievements.${id}`)}
          </p>
          <button
            type="button"
            className="flex justify-center items-center gap-1 text-espresso tablet:text-[20px] hover:text-gold focus:text-gold transition-all duration-300 ease-in-out"
          >
            Share <PiShareFat />
          </button>
        </li>
      ))}
    </ul>
  );
};
