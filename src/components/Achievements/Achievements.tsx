import { Icon } from "../../utils/Icon";
import { defaultAchievements } from "../../data/defaultAchievements";

export const Achievements: React.FC = () => {
  return (
    <ul className="grid grid-cols-3 gap-4 mt-4">
      {defaultAchievements.map((achievement, index) => (
        <li
          key={index}
          className="flex flex-col justify-center items-center gap-2"
        >
          <Icon name={achievement.icon} size={100} />
          <p className="flex justify-center items-center text-center text-latte font-bold">
            {achievement.title}
          </p>
        </li>
      ))}
    </ul>
  );
};
