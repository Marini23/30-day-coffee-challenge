import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export const InputPassword: React.FC = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleVisibilityPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full flex flex-col gap-1">
      <label
        htmlFor="password"
        className="text-[12px] font-medium text-primary desktop:text-[16px]"
      >
        Password
      </label>
      <input
        type={isShowPassword ? "text" : "password"}
        name="password"
        id="password"
        autoComplete="current-password"
        className="w-full px-3 py-2 text-[14px] text-espresso  bg-transparent border border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
      />
      <button
        type="button"
        onClick={toggleVisibilityPassword}
        className="absolute right-3 top-[34px] text-espresso hover:text-gold transition desktop:top-[40px]"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? (
          <PiEyeLight className="w-[16px] h-[16px] desktop:w-[22px] desktop:h-[22px]" />
        ) : (
          <PiEyeSlash className="w-[16px] h-[16px] desktop:w-[22px] desktop:h-[22px]" />
        )}
      </button>
    </div>
  );
};
