import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";

export const SharedLayout: React.FC = () => {
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
        <div className="tablet:hidden">
          <button type="button">
            {" "}
            <GiHamburgerMenu />
          </button>
          <nav className="tablet:hidden"></nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
