import { Link } from "react-router-dom";

export const UserMenu: React.FC = () => {
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
      <button
        type="button"
        className="  bg-secondary text-primary flex items-center justify-center rounded-full font-medium tablet:w-[40px] desktop:w-[50px] tablet:h-[40px] desktop:h-[50px] tablet:text-[18px] desktop:text-[24px] hover:bg-gold focus:bg-gold"
      >
        JS
      </button>
    </div>
  );
};
