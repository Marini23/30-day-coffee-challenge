import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-secondary text-espresso">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-2xl bg-espresso text-white hover:bg-latte transition"
      >
        Go Home
      </Link>
    </div>
  );
};
