import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { AuthMenu } from "./AuthMenu/AuthMenu";
import { UserMenu } from "./UserMenu/UserMenu";
import { useUserStore } from "../store/userStore";

export const SharedLayout: React.FC = () => {
  const { isLoggedIn } = useUserStore();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex px-4 tablet:px-8 desktop:px-12 items-center justify-between bg-primary text-secondary h-16 tablet:h-20 desktop:h-22 w-full fixed top-0 left-0 z-50">
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
      <main className="flex-grow flex flex-col  mt-16 tablet:mt-20 desktop:mt-22 ">
        <Outlet />
      </main>
      <footer className="h-10 sticky bottom-0 mt-auto flex items-center justify-center bg-primary text-secondary text-[12px] laptop:h-12 laptop:text-[16px]">
        &copy; 2025 CoffeeChallenge. All Rights Reserved.
      </footer>
    </div>
  );
};
