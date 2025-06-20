import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
} from "react-share";
import { Icon } from "../../utils/Icon";
import { Achievement } from "../../types/achievements";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  achievement: Achievement;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  achievement,
}) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [showIcons, setShowIcons] = useState<boolean>(true);

  const handleShare = async (
    platform: "facebook" | "telegram" | "whatsapp" | "linkedin"
  ) => {
    setShowIcons(false);
    setTimeout(async () => {
      if (!cardRef.current) return;

      const dataUrl = await toPng(cardRef.current);
      setShowIcons(true);

      // Create blob and file
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "achievement.png", { type: "image/png" });

      // Use Web Share API (only on supported platforms)
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title,
            text: t("achievements.share_text"),
            files: [file],
          });
        } catch (err) {
          console.error("Share canceled", err);
        }
      } else {
        // Fallback: open target platform and user manually uploads image
        let shareUrl = "";
        switch (platform) {
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case "telegram":
            shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
            break;
          case "whatsapp":
            shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
            break;
          case "linkedin":
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        }
        window.open(shareUrl, "_blank");
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-latte/50 flex items-center justify-center z-50">
      <div
        ref={cardRef}
        className="bg-[url('/src/assets/share_bg.jpg')] rounded-xl p-6 w-80 h-120 shadow-lg relative"
      >
        <button
          className="absolute top-6 right-6 text-secondary"
          onClick={onClose}
        >
          ✖
        </button>
        <Icon
          name={achievement.icon}
          size={200}
          className="fill-gold mx-auto mt-10 mb-10"
        />

        <h2 className="text-[22px]  font-semibold mb-10 text-secondary text-center">
          {t(`achievements.share_text`)}
          <br />{" "}
          <span className="text-gold font-bold">
            {t(`achievements.${achievement.id}`).toUpperCase()}
          </span>
        </h2>
        {showIcons && (
          <div className="flex justify-center gap-3">
            <FacebookShareButton url={url}>
              <FacebookIcon size={30} round />
            </FacebookShareButton>

            <button onClick={() => handleShare("facebook")}>
              <TelegramIcon size={30} round />
            </button>

            <WhatsappShareButton url={url}>
              <WhatsappIcon size={30} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon size={30} round />
            </LinkedinShareButton>
          </div>
        )}
      </div>
    </div>
  );
};
