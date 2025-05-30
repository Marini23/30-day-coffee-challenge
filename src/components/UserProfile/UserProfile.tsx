import { RxAvatar } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { UserUpdate } from "../../types/user";
import { useEffect } from "react";
import {
  updateUserPhoto,
  updateUserProfile,
} from "../../firebase/userDataService";
import { uploadImageToCloudinary } from "../../utils/UploadPhotoToCloudinary";

export const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const {
    uid,
    firstName,
    lastName,
    email,
    language,
    setPhotoUrl,
    photoUrl,
    setLanguage,
  } = useUserStore();

  console.log(photoUrl);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserUpdate>({
    mode: "onChange",
    defaultValues: {
      firstName,
      lastName,
      email,
      language,
    },
  });

  useEffect(() => {
    reset({ firstName, lastName, email, language });
  }, [firstName, lastName, email, language, reset]);

  const onSubmit = (data: UserUpdate) => {
    console.log(data);

    updateUserProfile(uid, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      language: data.language,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uid) return;

    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);

    try {
      const uploadedUrl = await uploadImageToCloudinary(file, uid);
      console.log(uploadedUrl);
      await updateUserPhoto(uid, uploadedUrl);
      console.log("Photo uploaded and Firestore updated!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col  w-full  laptop:flex-row laptop:gap-8 px-8 py-10">
      <div className="laptop:w-1/3">
        <h2 className="font-bold text-espresso text-[20px] tablet:text-[24px] desktop:text-[32px] ">
          {t("settings.title")}
        </h2>
        <p className="text-espresso mb-8 text-[14px] tablet:text-[16px] desktop:text-[20px]">
          {t("settings.subtitle")}
        </p>
      </div>
      <div className="laptop:w-2/3">
        <div className="flex justify-start items-center gap-8 mb-8 l">
          <div className="flex justify-center items-center w-24 h-24 desktop:w-32 desktop:h-32 rounded-lg overflow-hidden border-2 border-solid border-espresso">
            {photoUrl && photoUrl.trim() !== "" ? (
              <img
                src={photoUrl}
                alt="User avatar"
                className="w-full h-full object-cover "
              />
            ) : (
              <RxAvatar className="w-20 h-20 desktop:w-28 desktop:h-28 text-espresso" />
            )}
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              disabled={!!photoUrl}
              {...register("photo", {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    handleFileChange(e);
                  }
                },
              })}
            />
            <label
              htmlFor="fileUpload"
              className={`flex justify-center items-center w-30 h-8 bg-latte font-medium text-espresso rounded-lg desktop:w-40 desktop:h-10 desktop:text-[20px] cursor-pointer
                ${
                  photoUrl
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gold focus:bg-gold"
                }`}
            >
              {t("settings.uploadPhotoBtn")}
            </label>
            <p className="text-espresso  tablet:text-[20px] desktop:text-[24px]">
              {t("settings.uploadPhotoText")}
            </p>
          </div>
        </div>
        <form
          className="w-full flex flex-col gap-6 tablet:max-w-180 laptop:gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 tablet:flex-row">
            <div className="w-full flex flex-col gap-2 tablet:w-1/2">
              <label className="text-[16px] tablet:text-[18px] desktop:text-[24px] text-espresso">
                {t("settings.firstName")}
              </label>
              <input
                type="text"
                // defaultValue={firstName}
                className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
                {...register("firstName", {
                  required: t("validation.firstName.required"),
                  minLength: {
                    value: 2,
                    message: t("validation.firstName.minLength"),
                  },
                })}
              />
              <p className="h-4 text-red text-[12px]  desktop:text-[14px]">
                {errors.firstName?.message}
              </p>
            </div>
            <div className="flex flex-col gap-2 tablet:w-1/2">
              <label className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px]">
                {t("settings.lastName")}
              </label>
              <input
                type="text"
                className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
                {...register("lastName", {
                  required: t("validation.lastName.required"),
                  minLength: {
                    value: 2,
                    message: t("validation.lastName.minLength"),
                  },
                })}
              />
              <p className="h-4 text-red text-[12px] desktop:text-[14px]">
                {errors.lastName?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px]">
              {t("settings.email")}
            </label>
            <input
              type="email"
              className=" text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
              {...register("email", {
                required: t("validation.email"),
              })}
            />
            <p className="h-4 text-red text-[12px] desktop:text-[14px]">
              {errors.email?.message}
            </p>
          </div>
          <div className="relative flex flex-col gap-2">
            <label className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px]">
              {t("settings.language")}
            </label>
            <select
              value={language}
              {...register("language")}
              onChange={(e) => setLanguage(e.target.value as "en" | "pl")}
              className=" text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] appearance-none flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg bg-transparent hover:border-espresso focus:outline-none  focus:border-espresso"
            >
              <option
                value="en"
                className="bg-secondary text-espresso borde-none hover:bg-espresso"
              >
                {t("settings.en")}
              </option>
              <option
                value="pl"
                className="bg-secondary text-espresso border-none"
              >
                {t("settings.pl")}
              </option>
            </select>
            <FaChevronDown className="absolute right-3 top-11 text-espresso pointer-events-none fill-latte desktop:top-14" />
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="flex  justify-center items-center w-30 h-8 bg-latte font-medium text-espresso flex  rounded-lg hover:bg-gold focus:bg-gold desktop:w-40 desktop:h-10 desktop:text-[20px]"
          >
            {t("settings.saveChangesBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};
