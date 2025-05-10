import { Icon } from "../../utils/Icon";
import { defaultAchievements } from "../../data/defaultAchievements";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import { getUserAchievements } from "../../firebase/firebaseAchievements";
import { Achievement } from "../../types/achievements";

export const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const { uid } = useUserStore();
  const [achievements, setAchievements] =
    useState<Achievement[]>(defaultAchievements);
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!uid) {
        console.log("Waiting for user ID...");
        setAchievements(defaultAchievements);
        return;
      }
      try {
        const data = await getUserAchievements(uid);
        if (data) {
          setAchievements(data);
        } else {
          setAchievements(defaultAchievements);
        }
      } catch (error) {
        console.error("Failed to load achievements:", error);
        setAchievements(defaultAchievements);
      }
    };
    fetchAchievements();
  }, [uid]);

  console.log(achievements);

  return (
    <ul className="grid grid-cols-3 gap-4 mt-4">
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
