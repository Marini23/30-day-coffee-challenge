import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const SharedLayout: React.FC = () => {
  return (
    <div>
      <header>
        <div>Logo</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign In</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
