import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
  FieldError,
} from "react-hook-form";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

interface InputPasswordProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  validation?: object;
  error?: FieldError;
}

export const InputPassword = <T extends FieldValues>({
  register,
  setValue,
  name,
  validation,
  error,
}: InputPasswordProps<T>) => {
  const { t } = useTranslation();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleVisibilityPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col ">
      <label
        htmlFor="password"
        className="text-[12px] font-medium text-espresso desktop:text-[16px]"
      >
        {t("inputs.password")}
      </label>
      <input
        type={isShowPassword ? "text" : "password"}
        id="password"
        aria-invalid={error ? "true" : "false"}
        autoComplete="current-password"
        className="w-full px-3 py-2 text-[14px] text-espresso  bg-transparent border-2 border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
        {...register(name, validation)}
        onChange={(e) =>
          setValue(name, e.target.value as PathValue<T, Path<T>>)
        }
      />
      <button
        type="button"
        onClick={toggleVisibilityPassword}
        className="absolute right-3 top-[34px] text-espresso hover:text-gold transition desktop:top-[40px]"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? (
          <PiEyeLight className="w-[16px] h-[16px] desktop:w-[22px] desktop:h-[22px] color-espresso" />
        ) : (
          <PiEyeSlash className="w-[16px] h-[16px] desktop:w-[22px] desktop:h-[22px] color-espresso" />
        )}
      </button>
      <p className="h-4 text-red text-[12px] desktop:text-[14px]">
        {error?.message}
      </p>
    </div>
  );
};
