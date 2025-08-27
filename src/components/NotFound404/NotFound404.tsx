import { Link } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";

export const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem-2.5rem)] tablet:min-h-[calc(100vh-5rem-2.5rem)] laptop:min-h-[calc(100vh-5rem-3rem)] desktop:min-h-[calc(100vh-5.5rem-3rem)]  flex flex-col items-center justify-center text-center bg-[url('/src/assets/404-m-min.jpg')]   tablet:bg-[url('/src/assets/404-t-min.jpg')] desktop:bg-[url('/src/assets/404-d-min.jpg')] bg-cover bg-center text-espresso">
      <Link
        to="/"
        className="absolute left-8 top-4 mt-6 px-6 py-3 flex gap-2 items-center latte text-espresso text-[24px] font-bold hover:text-active transition"
      >
        <IoMdArrowRoundBack /> Go Home
      </Link>
      <div>Page not found</div>
    </div>
  );
};