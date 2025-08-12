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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm your password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter your password to confirm account deletion.
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

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50">
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
