import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

export const SharedLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="flex px-4 tablet:px-8 desktop:px-12 items-center justify-between bg-primary text-secondary h-16 tablet:h-20 desktop:h-25 w-full fixed top-0 left-0 z-50">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-[62px] h-[50px] tablet:w-[80px] tablet:h-[60px]  desktop:w-[120px] desktop:h-[80px]"
          />
        </Link>
        <nav className="hidden tablet:flex gap-10 ">
          <Link
            to="/"
            className="font-medium tablet:text-[20px] desktop:text-[28px] hover:text-gold focus:text-gold"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="font-medium tablet:text-[20px] desktop:text-[28px] hover:text-gold focus:text-gold"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className=" font-medium tablet:text-[20px] desktop:text-[28px] hover:text-gold focus:text-gold"
          >
            Sign In
          </Link>
        </nav>
        <button type="button" onClick={toogleMenu} className="tablet:hidden">
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
          <ul className="flex flex-col items-center   gap-10 py-4">
            <li>
              <Link
                to="/"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="font-medium text-[24px] hover:text-gold focus:text-gold"
                onClick={toogleMenu}
              >
                Log In
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
