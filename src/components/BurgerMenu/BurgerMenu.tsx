import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useLogout } from "../../utils/Logout";

export const BurgerMenu: React.FC = () => {
  const { t } = useTranslation();
  const logout = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button type="button" onClick={toogleMenu} className="tablet:hidden ml-2">
        {isMenuOpen ? (
          <IoCloseSharp size={28} />
        ) : (
          <GiHamburgerMenu size={28} />
        )}
      </button>

      <nav
        className={`absolute top-16 left-0 w-full h-screen bg-primary text-secondary flex flex-col py-32 items-center  transition-all duration-900 ease-in-out z-[-1] ${
          isMenuOpen
            ? " translate-y-0 pointer-events-auto"
            : " -translate-y-full pointer-events-none"
        }`}
      >
        {isLoggedIn ? (
          <ul className="flex flex-col items-center   gap-10 py-4">
            <li>
              <Link
                to="/"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.home")}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.dashboard")}
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.settings")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={() => {
                  toogleMenu();
                  logout();
                }}
              >
                {t("header.logout")}
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col items-center   gap-10 py-4">
            <li>
              <Link
                to="/"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.home")}
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/dashboard"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.dashboard")}
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.register")}
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                {t("header.login")}
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};
