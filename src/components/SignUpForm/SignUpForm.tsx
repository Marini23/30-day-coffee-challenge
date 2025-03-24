import { MdKeyboardArrowDown } from "react-icons/md";
import { InputPassword } from "../InputPassword/InputPassword";
import icon_facebook from "../../assets/icons-facebook.svg";
import { Link } from "react-router-dom";
import { InputEmail } from "../InputEmail/InputEmail";
import { useTranslation } from "react-i18next";

export const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className=" flex-grow h-full  bg-[url('/src/assets/bg-tablet.jpg')]   desktop:bg-[url('/src/assets/bg-desktop.jpg')] bg-cover bg-center">
      <div className=" flex flex-col items-center justify-center  px-6 py-6 mx-auto max-w-[520px] desktop:max-w-[620px] desktop:pt-12  ">
        <div className="w-full rounded-lg ">
          <h1 className="flex justify-center text-[18px] font-bold text-espresso desktop:text-[32px]">
            {t("signUpForm.title")}
          </h1>
          <form className="flex flex-col gap-3 ">
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-[12px] font-medium text-espresso desktop:text-[16px]"
              >
                {t("inputs.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 text-[14px] text-espresso   bg-transparent border-2 border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
              />
            </div>
            <InputEmail />
            <InputPassword />
            <div className="relative w-full flex flex-col gap-1">
              <label
                htmlFor="language"
                className="text-[12px] font-medium text-espresso desktop:text-[16px]"
              >
                {t("inputs.language")}
              </label>
              <select
                id="language"
                className="appearance-none w-full px-3 py-2 text-[14px] text-espresso placeholder-latte bg-transparent border-2 border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
              >
                <option
                  value="en"
                  className="bg-secondary text-espresso border-none"
                >
                  {t("inputs.en")}
                </option>
                <option
                  value="pl"
                  className="bg-secondary text-espresso border-none"
                >
                  {t("inputs.pl")}
                </option>
              </select>
              <MdKeyboardArrowDown className="absolute right-3 top-[34px] text-espresso pointer-events-none desktop:top-[38px] desktop:w-[24px] desktop:h-[24px]" />
            </div>
            <button
              type="submit"
              className=" flex justify-center items-center w-full h-8 bg-latte font-medium text-espresso  rounded-lg hover:bg-gold focus:bg-gold  desktop:h-12 desktop:text-[20px]"
            >
              {t("signUpForm.registerButton")}
            </button>
          </form>
          <p className="mt-2 flex justify-center text-[12px]  text-espresso desktop:text-[16px]">
            {t("signUpForm.haveAccount")}
            <Link
              to="/login"
              className="font-medium text-espresso hover:underline hover:decoration-espresso  text-[12px] desktop:text-[16px] ml-1"
            >
              {t("signUpForm.loginLink")}
            </Link>
          </p>
          <div className="flex items-center w-full mt-2 mb-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className=" px-2 text-gray-500 text-sm">
              {t("signUpForm.alternativeSignUp")}
            </span>
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
            {t("signUpForm.registerFacebook")}
          </button>
        </div>
      </div>
    </section>
  );
};
