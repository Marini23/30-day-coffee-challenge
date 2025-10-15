import { useForm } from "react-hook-form";
import { InputPassword } from "../InputPassword/InputPassword";
import icon_facebook from "../../assets/icons-facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import { InputEmail } from "../InputEmail/InputEmail";
import { useTranslation } from "react-i18next";
import { UserLogin } from "../../types/user";
import {
  LogInWithEmailPassword,
  SignInWithFacebook,
} from "../../firebase/firebaseAuth";

export const SignInForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();
  const onSubmit = async (data: UserLogin) => {
    try {
      console.log("Login form Submitted:", data);
      await LogInWithEmailPassword(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignInFacebook = async () => {
    console.log("facebook");
    await SignInWithFacebook();
    navigate("/dashboard");
  };

  return (
    <section className=" flex-grow h-full  bg-[url('/src/assets/bg-tablet.jpg')]   desktop:bg-[url('/src/assets/bg-desktop.jpg')] bg-cover bg-center">
      <div className=" flex flex-col items-center justify-center  p-6 pt-6 mx-auto max-w-[520px] desktop:max-w-[620px] desktop:pt-12  ">
        <div className="w-full rounded-lg ">
          <h1 className="flex justify-center text-[18px] font-bold text-espresso mb-3 desktop:text-[32px]">
            {t("loginForm.title")}
          </h1>
          <form
            className="flex flex-col gap-1 tablet:gap-2 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputEmail
              register={register}
              setValue={setValue}
              name="email"
              validation={{
                required: t("validation.email"),
              }}
              error={errors.email}
            />
            <InputPassword
              register={register}
              setValue={setValue}
              name="password"
              validation={{
                required: t("validation.password.required"),
                minLength: {
                  value: 6,
                  message: t("validation.password.minLength", { length: 6 }),
                },
              }}
              error={errors.password}
            />
            <button
              type="submit"
              className=" mt-5 mb-2 flex justify-center items-center w-full h-8 bg-latte font-medium text-espresso  rounded-lg hover:bg-gold focus:bg-gold  desktop:h-12 desktop:text-[20px] transition-all duration-300 ease-in-out"
            >
              {t("loginForm.loginButton")}
            </button>
          </form>
          <p className="mt-2 flex justify-center text-[12px]  text-espresso desktop:text-[16px]">
            {t("loginForm.noHaveAccount")}
            <Link
              to="/register"
              className="font-medium text-espresso hover:underline hover:decoration-espresso  text-[12px] desktop:text-[16px] ml-1 transition-all duration-300 ease-in-out"
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
            onClick={handleSignInFacebook}
            className=" flex  justify-center items-center w-full h-8 bg-latte font-medium text-espresso rounded-lg hover:bg-gold focus:bg-gold desktop:h-12 desktop:text-[20px] transition-all duration-300 ease-in-out"
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
