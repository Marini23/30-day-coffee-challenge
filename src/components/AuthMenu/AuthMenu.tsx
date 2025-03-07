import { Link } from "react-router-dom";

export const AuthMenu: React.FC = () => {
  return (
    <nav className="hidden tablet:flex gap-10 mr-5">
      <Link
        to="/"
        className="font-medium tablet:text-[24px] desktop:text-[32px] hover:text-gold focus:text-gold"
      >
        Home
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
        Sign In
      </Link>
    </nav>
  );
};
