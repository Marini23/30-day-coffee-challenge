import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";
import { Achievement } from "../../types/achievements";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import beansIcon from "../../assets/beans-png.png";
import cupIcon from "../../assets/cup_png.png";
import earthIcon from "../../assets/earth_png.png";
import { uploadBageToCloudinary } from "../../utils/UploadImageToCloudinary";
import { useUserStore } from "../../store/userStore";
import { updateUserAchievement } from "../../firebase/firebaseAchievements";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  achievement: Achievement;
  allAchievements: Achievement[];
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  achievement,
  allAchievements,
}) => {
  const { t } = useTranslation();
  const { uid } = useUserStore();
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  console.log(achievement);

  const achievementIcons: Record<string, string> = {
    brew_master: beansIcon,
    coffee_ambassador: earthIcon,
    flavor_alchemist: cupIcon,
  };

  const selectedIcon = achievementIcons[achievement.id];
  console.log(cloudinaryUrl);

  useEffect(() => {
    // Reset state when modal closes
    if (!isOpen) {
      setGeneratedImage(null);
      setCloudinaryUrl(null);
      setShowIcons(false);
      return;
    }

    // Skip if achievement is incomplete
    if (!achievement.completed) {
      setShowIcons(false);
      return;
    }

    // Use existing image if available
    if (achievement.shareImageUrl) {
      setCloudinaryUrl(achievement.shareImageUrl);
      setShowIcons(true);
      return;
    }

    // Generate new image only for completed achievements
    if (cardRef.current && !generatedImage) {
      toPng(cardRef.current, { cacheBust: true })
        .then(async (dataUrl) => {
          setGeneratedImage(dataUrl);
          const uploadedUrl = await uploadBageToCloudinary(dataUrl);
          setCloudinaryUrl(uploadedUrl);
          setShowIcons(true);
        })
        .catch(console.error);
    }
  }, [isOpen, generatedImage, achievement]);

  useEffect(() => {
    const updateFirebase = async () => {
      if (
        !cloudinaryUrl ||
        !achievement.completed ||
        cloudinaryUrl === achievement.shareImageUrl ||
        !uid
      )
        return;

      const updatedAchievement: Achievement = {
        ...achievement,
        shareImageUrl: cloudinaryUrl,
        updatedAt: Date.now(),
      };

      const updatedAchievements = allAchievements.map((ach) =>
        ach.id === achievement.id ? updatedAchievement : ach
      );

      await updateUserAchievement(uid, updatedAchievements);
    };

    updateFirebase();
  }, [cloudinaryUrl, achievement, allAchievements, uid]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-latte/50 flex items-center justify-center z-50 ">
      <div className="relative">
        <button
          className="absolute top-6 right-6 text-secondary z-10"
          onClick={onClose}
        >
          ✖
        </button>
        <div
          ref={cardRef}
          className="bg-[url('/src/assets/share_bg.jpg')]  py-6 px-2 w-80 h-120 shadow-lg  "
        >
          <img
            src={selectedIcon}
            alt="Achievement Icon"
            className="w-40 h-50 mx-auto mt-10 mb-10 "
          />
          <h2 className="text-[22px]  font-semibold  text-secondary text-center ">
            {t(`achievements.share_text`)}
            <br />{" "}
            <span className="text-gold font-bold text-[20px]">
              {t(`achievements.${achievement.id}`).toUpperCase()}
            </span>
          </h2>
          {showIcons && cloudinaryUrl && (
            <div className="flex justify-center gap-3 mt-4 mb-auto">
              <FacebookShareButton url={cloudinaryUrl}>
                <FacebookIcon size={30} round />
              </FacebookShareButton>
              <TelegramShareButton url={cloudinaryUrl} title={title}>
                <TelegramIcon size={30} round />
              </TelegramShareButton>
              <WhatsappShareButton url={cloudinaryUrl}>
                <WhatsappIcon size={30} round />
              </WhatsappShareButton>
              <LinkedinShareButton url={cloudinaryUrl} title={title}>
                <LinkedinIcon size={30} round />
              </LinkedinShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
