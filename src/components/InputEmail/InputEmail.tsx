import { useTranslation } from "react-i18next";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface InputEmailProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
}

export const InputEmail = <T extends FieldValues>({
  register,
  setValue,
  name,
}: InputEmailProps<T>) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor="email"
        className="text-[12px] font-medium text-espresso desktop:text-[16px]"
      >
        {t("inputs.email")}
      </label>
      <input
        type="email"
        id="email"
        autoComplete="off"
        className="w-full px-3 py-2 text-[14px] text-espresso bg-transparent border-2 border-primary rounded-lg focus:outline-none focus:border-gold hover:border-gold desktop:text-[18px]"
        {...register(name)}
        onChange={(e) =>
          setValue(name, e.target.value as PathValue<T, Path<T>>)
        }
      />
    </div>
  );
};
