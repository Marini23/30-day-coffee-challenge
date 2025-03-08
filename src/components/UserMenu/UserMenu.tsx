import { Link } from "react-router-dom";
import useComponentVisible from "../../utils/IsComponentVisible";

export const UserMenu: React.FC = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>();

  const toogleDropdown = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  return (
    <div className="hidden tablet:flex flex-1 items-center  tablet:w-150 desktop:w-[600px]">
      <p className="font-medium tablet:text-[24px] desktop:text-[32px] ml-[30px]">
        Day 7/30
      </p>
      <nav className=" ml-auto flex gap-10 mr-[50px]">
        <Link
          to="/"
          className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
        >
          Dashboard
        </Link>
      </nav>
      <div className="relative inline-block" ref={ref}>
        <button
          type="button"
          onClick={toogleDropdown}
          className="   focus:outline-none bg-secondary text-primary flex items-center justify-center rounded-full font-medium tablet:w-[40px] desktop:w-[50px] tablet:h-[40px] desktop:h-[50px] tablet:text-[18px] desktop:text-[24px] hover:bg-gold focus:bg-gold"
        >
          JS
        </button>
        {isComponentVisible && (
          <div className="absolute right-0  mt-2 tablet:w-48 desktop:w-58 bg-latte  rounded-lg py-4 flex flex-col aligns-center justify-center gap-2">
            <Link
              to="/settings"
              className="flex aligns-center justify-center text-secondary font-medium tablet:text-[24px] desktop:text-[32px] hover:text-espresso focus:text-espresso"
              onClick={toogleDropdown}
            >
              Settings
            </Link>
            <button
              type="button"
              className="text-secondary font-medium tablet:text-[24px] desktop:text-[32px] hover:text-espresso focus:text-espresso"
              onClick={toogleDropdown}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
