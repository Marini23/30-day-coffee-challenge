import { Link } from "react-router-dom";

export const AuthMenu: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/register">Sign In</Link>
    </nav>
  );
};
