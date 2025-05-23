import { RxAvatar } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";
import { useTranslation } from "react-i18next";

export const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const {
    firstName,
    lastName,
    email,
    language,
    setPhotoUrl,
    photoUrl,
    setLanguage,
  } = useUserStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  return (
    <form className="flex flex-col  w-full  laptop:flex-row laptop:gap-8 px-8 py-10">
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
              name="file"
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="flex justify-center items-center w-30 h-8 bg-latte font-medium text-espresso rounded-lg hover:bg-gold focus:bg-gold desktop:w-40 desktop:h-10 desktop:text-[20px] cursor-pointer"
            >
              {t("settings.uploadPhotoBtn")}
            </label>
            <p className="text-espresso  tablet:text-[20px] desktop:text-[24px]">
              {t("settings.uploadPhotoText")}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 tablet:max-w-180 laptop:gap-8">
          <div className="flex flex-col gap-6 tablet:flex-row">
            <div className="w-full flex flex-col gap-2 tablet:w-1/2">
              <label className="text-[16px] tablet:text-[18px] desktop:text-[24px] text-espresso">
                {t("settings.firstName")}
              </label>
              <input
                type="text"
                defaultValue={firstName}
                className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
              />
            </div>
            <div className="flex flex-col gap-2 tablet:w-1/2">
              <label className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px]">
                {t("settings.lastName")}
              </label>
              <input
                type="text"
                defaultValue={lastName}
                className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px]">
              {t("settings.email")}
            </label>
            <input
              type="email"
              defaultValue={email}
              className=" text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px] flex justify-start items-center px-2 w-full h-10 border-latte border rounded-lg hover:border-espresso focus:outline-none  focus:border-espresso"
            />
          </div>
          <div className="relative flex flex-col gap-2">
            <label className="text-espresso text-[16px] tablet:text-[18px] desktop:text-[24px]">
              {t("settings.language")}
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
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
            className="flex  justify-center items-center w-30 h-8 bg-latte font-medium text-espresso flex  rounded-lg hover:bg-gold focus:bg-gold desktop:w-40 desktop:h-10 desktop:text-[20px]"
          >
            {t("settings.saveChangesBtn")}
          </button>
        </div>
      </div>
    </form>
  );
};
