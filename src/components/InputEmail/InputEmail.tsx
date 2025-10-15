import { useTranslation } from "react-i18next";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
  FieldError,
} from "react-hook-form";

interface InputEmailProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  validation?: object;
  error?: FieldError;
}

export const InputEmail = <T extends FieldValues>({
  register,
  setValue,
  name,
  validation,
  error,
}: InputEmailProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col ">
      <label
        htmlFor="email"
        className="text-[12px] font-medium text-espresso desktop:text-[16px]"
      >
        {t("inputs.email")}
      </label>
      <input
        type="email"
        id="email"
        aria-invalid={error ? "true" : "false"}
        autoComplete="off"
        className="w-full px-3 py-2 text-[14px] text-espresso bg-transparent border-2 border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px] transition-all duration-300 ease-in-out"
        {...register(name, validation)}
        onChange={(e) =>
          setValue(name, e.target.value as PathValue<T, Path<T>>)
        }
      />
      <p className="h-4 text-red text-[12px] desktop:text-[14px]">
        {error?.message}
      </p>
    </div>
  );
};
