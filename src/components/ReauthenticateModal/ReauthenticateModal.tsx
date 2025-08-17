import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { deleteUserData } from "../../firebase/userDataService";
import { useLoadingStore } from "../../store/userStore";
import { InputPassword } from "../InputPassword/InputPassword";
import { useTranslation } from "react-i18next";
import { UserReauthentication } from "../../types/user";

interface ReauthenticateModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  email: string;
}

export const ReauthenticateModal: React.FC<ReauthenticateModalProps> = ({
  uid,
  isOpen,
  onClose,
  email,
}) => {
  const { t } = useTranslation();
  const { isLoading, setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserReauthentication>();

  const onSubmit = async (data: UserReauthentication) => {
    setLoading(true);
    try {
      await deleteUserData(uid, email, data.password);
      onClose();
      navigate("/login");
    } catch (error) {
      console.error("Error delete user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="px-4 fixed inset-0 bg-espresso/50 flex items-center justify-center z-50">
      <div className="bg-secondary rounded-lg p-4 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-espresso">
          {t("deleteAccount.title")}
        </h2>
        <p className="text-sm text-espresso mb-4">
          {t("deleteAccount.description")}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="px-4 flex justify-between mt-4 ">
            <button
              type="button"
              onClick={onClose}
              className="w-28 h-8 bg-latte/30 flex justify-center items-center  rounded-lg border border-espresso hover:bg-active text-espresso"
              disabled={isLoading}
            >
              {t("deleteAccount.cancelBtn")}
            </button>
            <button
              type="submit"
              className="w-28 h-8 bg-latte/30 flex justify-center items-center  rounded-lg border border-espresso hover:bg-active text-espresso"
              disabled={isLoading}
            >
              {t("deleteAccount.confirmBtn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
