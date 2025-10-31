import { useState } from "react";
import { useAchievementsStore } from "../../store/userStore";
import { Achievement } from "../../types/achievements";
import { ShareModal } from "../ShareModal/ShareModal";
import { useTranslation } from "react-i18next";
import { Achievements } from "../Achievements/Achievements";

export const UserAchievements = () => {
  const { t } = useTranslation();
  const { achievements } = useAchievementsStore();
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [achievementToShare, setAchievementToShare] =
    useState<Achievement | null>(null);

  const handleCloseModal = () => {
    setShowShareModal(false);
    setAchievementToShare(null);
  };

  return (
    <section className="p-4 flex flex-col gap-6">
      <h1 className="text-espresso text-[48px] font-bold text-center mt-4 ">
        {t(`achievements.title`)}
      </h1>
      <p className="text-espresso font-semibold text-[20px] tablet:text-[32px] text-center ">
        {t(`achievements.subtitle`)}
      </p>
      <p className="text-espresso text-[20px] tablet:text-[24px] text-center mb-8 ">
        {t(`achievements.description`)}
      </p>
      <Achievements
        achievements={achievements}
        // onShare={handleShareAchievement}
      />
      <button
        type="button"
        className="text-espresso font-semibold text-[20px] tablet:text-[32px]  text-center   mt-10 "
      >
        {" "}
        {t(`achievements.footer`)}
      </button>
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
