// ShareModal.tsx
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-latte/50 flex items-center justify-center z-50">
      <div className="bg-espresso rounded-xl p-6 w-80 h-100 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">
          🎉 Share your achievement!
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

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};
