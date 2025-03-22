import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const AuthMenu: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className="hidden tablet:flex gap-10 mr-5">
      <Link
        to="/"
        className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
      >
        {t("header.home")}
      </Link>
      <Link
        to="/login"
        className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className=" font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
      >
        Sign Up
      </Link>
    </nav>
  );
};
