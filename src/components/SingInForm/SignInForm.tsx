import { useForm } from "react-hook-form";
import { InputPassword } from "../InputPassword/InputPassword";
import icon_facebook from "../../assets/icons-facebook.svg";
import { Link } from "react-router-dom";
import { InputEmail } from "../InputEmail/InputEmail";
import { useTranslation } from "react-i18next";
import { UserLogin } from "../../types/user";

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, setValue, handleSubmit } = useForm<UserLogin>();
  const onSubmit = (data: UserLogin) => {
    console.log("Login form Submitted:", data);
  };
  return (
    <section className=" flex-grow h-full  bg-[url('/src/assets/bg-tablet.jpg')]   desktop:bg-[url('/src/assets/bg-desktop.jpg')] bg-cover bg-center">
      <div className=" flex flex-col items-center justify-center  p-6 pt-6 mx-auto max-w-[520px] desktop:max-w-[620px] desktop:pt-12  ">
        <div className="w-full rounded-lg ">
          <h1 className="flex justify-center text-[18px] font-bold text-espresso desktop:text-[32px]">
            {t("loginForm.title")}
          </h1>
          <form
            className="flex flex-col gap-3 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputEmail register={register} setValue={setValue} name="email" />
            <InputPassword
              register={register}
              setValue={setValue}
              name="password"
            />
            <button
              type="submit"
              className=" flex justify-center items-center w-full h-8 bg-latte font-medium text-espresso  rounded-lg hover:bg-gold focus:bg-gold  desktop:h-12 desktop:text-[20px]"
            >
              {t("loginForm.loginButton")}
            </button>
          </form>
          <p className="mt-2 flex justify-center text-[12px]  text-espresso desktop:text-[16px]">
            {t("loginForm.noHaveAccount")}
            <Link
              to="/login"
              className="font-medium text-espresso hover:underline hover:decoration-espresso  text-[12px] desktop:text-[16px] ml-1"
            >
              {t("loginForm.registerLink")}
            </Link>
          </p>
          <div className="flex items-center w-full mt-2 mb-3">
            <hr className="flex-grow border-t border-gray-300" />
            <span className=" px-2 text-gray-500 text-sm">
              {t("loginForm.alternativeLogin")}
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
            {t("loginForm.loginFacebook")}
          </button>
        </div>
      </div>
    </section>
  );
};
