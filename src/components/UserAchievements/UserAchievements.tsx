import { useAchievementsStore } from "../../store/userStore";
import { ShareModal } from "../ShareModal/ShareModal";
import { useTranslation } from "react-i18next";
import { Achievements } from "../Achievements/Achievements";
import { useShareAchievement } from "../../hooks/useShareAchievement";
import { Link } from "react-router-dom";

export const UserAchievements = () => {
  const { t } = useTranslation();
  const { achievements } = useAchievementsStore();
  const {
    showShareModal,
    achievementToShare,
    openShareModal,
    closeShareModal,
  } = useShareAchievement();

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
      <Achievements achievements={achievements} onShare={openShareModal} />
      <Link
        to="/dashboard"
        className="px-6 py-2 text-espresso font-semibold text-[20px] tablet:text-[32px] text-center hover:text-active hover:underline focus:text-active focus:underline transition-all duration-300 ease-in-out"
      >
        {t("achievements.footer")}
      </Link>
      {achievementToShare && (
        <ShareModal
          isOpen={showShareModal}
          onClose={closeShareModal}
          title={t(`achievements.${achievementToShare.id}`)}
          achievement={achievementToShare}
          allAchievements={achievements}
        />
      )}
    </section>
  );
};
