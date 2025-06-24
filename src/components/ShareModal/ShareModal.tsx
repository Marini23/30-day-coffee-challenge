import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
} from "react-share";
import { Achievement } from "../../types/achievements";
import { useTranslation } from "react-i18next";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import beansIcon from "../../assets/beans-png.png";

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
  const [showIcons, setShowIcons] = useState<boolean>(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onButtonClick = useCallback(() => {
    if (!cardRef.current) return;

    setShowIcons(false);

    toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        setGeneratedImage(dataUrl); // Show preview
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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
          className="bg-[url('/src/assets/share_bg.jpg')] rounded-xl p-6 w-80 h-120 shadow-lg "
        >
          <img
            src={beansIcon}
            alt="Beans Icon"
            className="w-35 h-50 mx-auto mt-10 - mb-10 "
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

              <button>
                <TelegramIcon size={30} round onClick={onButtonClick} />
              </button>

              <WhatsappShareButton url={url}>
                <WhatsappIcon size={30} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={30} round />
              </LinkedinShareButton>
            </div>
          )}
          {generatedImage && (
            <div className="mt-4 fixed top-0">
              <h3 className="text-center text-secondary mb-2">
                {t("Preview")}
              </h3>
              <img
                src={generatedImage}
                alt="Generated preview"
                className="w-full rounded-md border"
              />
              <div className="flex justify-center mt-2">
                <a
                  href={generatedImage}
                  download="achievement.png"
                  className="text-sm text-secondary underline"
                >
                  Hello
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
