import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export const Banner: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useUserStore();

  const onClick = () => {
    navigate("/login");
  };
  return (
    <div className=" flex-grow h-60 pl-4 pt-8 tablet:h-105 tablet:pl-8  desktop:h-202 desktop:pl-12 desktop:pt-24 bg-[url('/src/assets/home-bg-mobile.jpg')] tablet:bg-[url('/src/assets/home-bg-tablet.jpg')]  desktop:bg-[url('/src/assets/home-bg-desktop.jpg')] bg-cover bg-center">
      <h1 className="text-secondary font-bold text-[18px] italic  tablet:text-[34px] desktop:text-[64px]">
        {t(`homepage.title`)}
      </h1>
      <p className="w-45 text-secondary text-[14px] font-semibold  mt-3 tablet:w-110  tablet:mt-6 tablet:text-[24px] desktop:w-180 desktop:text-[40px]">
        {t(`homepage.description`)}
      </p>
      {!isLoggedIn && (
        <button
          onClick={onClick}
          className="text-secondary font-bold text-[14px]  mt-8 p-2  tablet:text-[20px] tablet:p-4  tablet:mt-12 desktop:text-[36px]  desktop:mt-28 rounded-xl border-2 border-secondary bg-latte/50 hover:bg-active/50 focus:bg-active/50 focus:outline-none"
        >
          {t(`homepage.startbutton`)}
        </button>
      )}
    </div>
  );
};
