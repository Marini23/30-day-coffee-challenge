import { useEffect, useState } from "react";
import { useAchievementsStore, useUserStore } from "../../store/userStore";
import { Achievement } from "../../types/achievements";
import { defaultAchievements } from "../../data/defaultAchievements";
import { getUserAchievements } from "../../firebase/firebaseAchievements";
import { ShareModal } from "../ShareModal/ShareModal";
import { useTranslation } from "react-i18next";
import { Achievements } from "../Achievements/Achievements";

export const UserAchievements = () => {
  const { t } = useTranslation();
  const { uid } = useUserStore();
  const { achievements, setAchievements } = useAchievementsStore();
  // const [achievements, setAchievements] =
  //   useState<Achievement[]>(defaultAchievements);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [achievementToShare, setAchievementToShare] =
    useState<Achievement | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!uid) {
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
  }, [uid, setAchievements]);

  // const handleShareAchievement = (achievement: Achievement) => {
  //   setAchievementToShare(achievement);
  //   setShowShareModal(true);
  // };

  const handleCloseModal = () => {
    setShowShareModal(false);
    setAchievementToShare(null);
  };

  return (
    <section className="p-4 flex flex-col gap-6">
      <h1>Your Achievements</h1>
      <p className="text-latte text-[18px] tablet:text-[20px] max-w-xl mx-auto">
        Celebrate your coffee journey! Unlock achievements as you complete tasks
        and explore new flavors.
      </p>
      <Achievements
        achievements={achievements}
        // onShare={handleShareAchievement}
      />
      <button type="button"> Keep going — more coffee adventures await!</button>
      {achievementToShare && (
        <ShareModal
          isOpen={showShareModal}
          onClose={handleCloseModal}
          title={t(`achievements.${achievementToShare.id}`)}
          achievement={achievementToShare}
          allAchievements={achievements}
        />
      )}
    </section>
  );
};
