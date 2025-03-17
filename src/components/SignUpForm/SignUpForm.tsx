import { MdKeyboardArrowDown } from "react-icons/md";
import { InputPassword } from "../InputPassword/InputPassword";
import icon_facebook from "../../assets/icons-facebook.svg";

export const SignUpForm: React.FC = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-w-[520px] desktop:max-w-[620px]">
        <div className="w-full rounded-lg shadow">
          <div className="p-6 pb-12">
            <h1 className="flex justify-center text-[18px] font-bold text-espresso desktop:text-[32px]">
              Create an account
            </h1>
            <form className="flex flex-col gap-4">
              <div className="w-full flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-[12px] font-medium text-primary desktop:text-[16px]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 text-[14px] text-espresso placeholder-latte bg-transparent border border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-[12px] font-medium text-primary desktop:text-[16px]"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  className="w-full px-3 py-2 text-[14px] text-espresso  bg-transparent border border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
                />
              </div>
              <InputPassword />
              <div className="relative w-full flex flex-col gap-1">
                <label
                  htmlFor="language"
                  className="text-[12px] font-medium text-primary desktop:text-[16px]"
                >
                  Language
                </label>
                <select
                  id="language"
                  className="appearance-none w-full px-3 py-2 text-[14px] text-espresso placeholder-latte bg-transparent border border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
                >
                  <option
                    value="en"
                    className="bg-secondary text-espresso border-none"
                  >
                    English
                  </option>
                  <option
                    value="pl"
                    className="bg-secondary text-espresso border-none"
                  >
                    Polish
                  </option>
                </select>
                <MdKeyboardArrowDown className="absolute right-3 top-[34px] text-espresso pointer-events-none desktop:top-[38px] desktop:w-[24px] desktop:h-[24px]" />
              </div>
              <button
                type="submit"
                className=" flex justify-center items-center w-full h-8 bg-latte font-medium text-espresso  rounded-lg hover:bg-gold focus:bg-gold  desktop:h-12 desktop:text-[20px]"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-2 flex justify-center text-[12px]  text-espresso desktop:text-[16px]">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-espresso hover:underline text-[12px] desktop:text-[16px] "
              >
                Login here
              </a>
            </p>
            <div className="flex items-center w-full mt-4 mb-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className=" px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <button
              type="button"
              className=" flex  justify-center items-center w-full h-8 bg-latte font-medium text-espresso rounded-lg hover:bg-gold focus:bg-gold desktop:h-12 desktop:text-[20px]"
            >
              <img
                src={icon_facebook}
                alt="icon facebook"
                className="mr-2 w-[24px] h-[24px]   desktop:w-[32px] desktop:h-[32px]"
              />
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
