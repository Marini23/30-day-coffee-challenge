import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { AuthMenu } from "./AuthMenu/AuthMenu";
import { UserMenu } from "./UserMenu/UserMenu";

export const SharedLayout: React.FC = () => {
  const isLoggedIn: boolean = true;
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
        {isLoggedIn ? <UserMenu /> : <AuthMenu />}
        <BurgerMenu />
      </header>
      <Outlet />
    </div>
  );
};
