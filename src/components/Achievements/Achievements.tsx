import { Icon } from "../../utils/Icon";
import { useTranslation } from "react-i18next";

import { Achievement } from "../../types/achievements";

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const { t } = useTranslation();

  return (
    <ul className="grid grid-cols-3 gap-4 mt-4 laptop:mt-8">
      {achievements.map(({ id, icon, completed }, index) => (
        <li
          key={index}
          className="flex flex-col justify-center items-center gap-2"
        >
          <Icon
            name={icon}
            size={100}
            className={completed ? "fill-gold" : "fill-latte"}
          />
          <p
            className={`text-center font-bold whitespace-pre-line laptop:text-[24px] ${
              completed ? "text-gold" : "text-latte"
            }`}
          >
            {t(`achievements.${id}`)}
          </p>
        </li>
      ))}
    </ul>
  );
};
