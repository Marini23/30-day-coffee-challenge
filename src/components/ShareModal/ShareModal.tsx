// ShareModal.tsx
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { Icon } from "../../utils/Icon";
import { Achievement } from "../../types/achievements";

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
  console.log(achievement);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-latte/50 flex items-center justify-center z-50">
      <div className="bg-[url('/src/assets/share_bg.jpg')] rounded-xl p-6 w-80 h-120 shadow-lg relative">
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
          I earned the achievement {achievement.id}!
        </h2>
        <div className="flex justify-center gap-3">
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <FacebookMessengerShareButton url={url} appId="YOUR_APP_ID">
            <FacebookMessengerIcon size={40} round />
          </FacebookMessengerShareButton>

          <EmailShareButton url={url} subject={title} body="Check this out!">
            <EmailIcon size={40} round />
          </EmailShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};
