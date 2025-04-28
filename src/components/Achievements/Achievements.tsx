import { Icon } from "../../utils/Icon";
import { defaultAchievements } from "../../data/defaultAchievements";
import { useTranslation } from "react-i18next";

export const Achievements: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ul className="grid grid-cols-3 gap-4 mt-4">
      {defaultAchievements.map(({ id, icon, completed }, index) => (
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
            className={`text-center font-bold whitespace-pre-line ${
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
