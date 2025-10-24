import { useState } from "react";
import { Achievement } from "../types/achievements";

export const useShareAchievement = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [achievementToShare, setAchievementToShare] =
    useState<Achievement | null>(null);

  const openShareModal = (achievement: Achievement) => {
    setAchievementToShare(achievement);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setAchievementToShare(null);
  };

  return {
    showShareModal,
    achievementToShare,
    openShareModal,
    closeShareModal,
  };
};
