import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import useComponentVisible from "../../utils/IsComponentVisible";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";
import { useLogout } from "../../utils/Logout";
import { useState } from "react";
import { ReauthenticateModal } from "../ReauthenticateModal/ReauthenticateModal";

export const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const logout = useLogout();
  const { completedDays, firstName, photoUrl, uid, email } = useUserStore();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>();

  const [isReauthOpen, setIsReauthOpen] = useState(false);

  const toogleDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const handleDeleteClick = () => {
    toogleDropdown();
    setIsReauthOpen(true);
  };
  return (
    <>
      <p className="font-medium   mobile:text-[20px] tablet:text-[24px] desktop:text-[32px] ml-[12px] tablet:ml-[30px] mr-auto">
        {t("header.day")} {completedDays ?? 0}/30
      </p>
      <div className="hidden tablet:flex flex-1 items-center justify-between  tablet:w-150 desktop:w-[600px]">
        <nav className="  ml-auto flex gap-10 mr-[50px]">
          <Link
            to="/"
            className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
          >
            {t("header.home")}
          </Link>
          <Link
            to="/dashboard"
            className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
          >
            {t("header.dashboard")}
          </Link>
        </nav>

        <div className="relative inline-block" ref={ref}>
          <button
            type="button"
            onClick={toogleDropdown}
            className="  focus:outline-none bg-secondary text-primary flex items-center justify-center rounded-full font-medium w-[24px] tablet:w-[40px] desktop:w-[50px] h-[24px] tablet:h-[40px] desktop:h-[50px] text-[14px] tablet:text-[18px] desktop:text-[24px] hover:bg-gold focus:bg-gold"
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="User avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              `${firstName?.[0]?.toUpperCase() ?? ""}`
            )}
          </button>
          {isComponentVisible && (
            <div className="absolute right-0  mt-2 w-32 tablet:w-68   bg-secondary  rounded-lg shadow-2xl  py-4 flex flex-col aligns-center justify-center gap-2">
              <button
                onClick={() => setIsComponentVisible(false)}
                className="absolute top-2 right-2 text-espresso hover:text-gold focus:text-gold"
                aria-label="Close menu"
              >
                <IoClose className="text-[20px] tablet:text-[24px]" />
              </button>
              <Link
                to="/settings"
                className="flex aligns-center justify-center text-espresso font-medium tablet:text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleDropdown}
              >
                {t("header.settings")}
              </Link>
              <button
                type="button"
                className="text-espresso font-medium tablet:text-[24px]  hover:text-gold focus:text-gold"
                onClick={() => {
                  toogleDropdown();
                  logout();
                }}
              >
                {t("header.logout")}
              </button>
              <button
                type="button"
                className="text-espresso font-medium tablet:text-[24px]  hover:text-gold focus:text-gold"
                onClick={handleDeleteClick}
              >
                {t("header.deleteAccount")}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Reauthenticate Modal */}
      <ReauthenticateModal
        isOpen={isReauthOpen}
        onClose={() => setIsReauthOpen(false)}
        uid={uid}
        email={email}
      />
    </>
  );
};
