import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const AuthMenu: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className="hidden tablet:flex gap-10 mr-5">
      <Link
        to="/home"
        className="font-medium tablet:text-[20px] laptop:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold transition-colors duration-300 ease-in-out"
      >
        {t("header.home")}
      </Link>
      <Link
        to="/dashboard"
        className="font-medium tablet:text-[20px] laptop:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold transition-colors duration-300 ease-in-out"
      >
        {t("header.dashboard")}
      </Link>
      <Link
        to="/login"
        className="font-medium tablet:text-[20px] laptop:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold transition-colors duration-300 ease-in-out"
      >
        {t("header.login")}
      </Link>
      <Link
        to="/register"
        className=" font-medium tablet:text-[20px] laptop:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold transition-colors duration-300 ease-in-out"
      >
        {t("header.register")}
      </Link>
      <Link
        to="/achievements"
        className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold transition-all duration-300 ease-in-out"
      >
        {t("header.achievements")}
      </Link>
    </nav>
  );
};
