import { useTranslation } from "react-i18next";

export const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy");

  return (
    <div className="max-w-3xl mx-auto p-6 text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <p>{t("effectiveDate")}</p>
      <p className="mt-4">{t("intro")}</p>
      <p className="mt-2">{t("dataWeCollect")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleDataUse")}</h3>
      <p className="mt-2">{t("dataWeUse")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleDataStorage")}</h3>
      <p className="mt-2">{t("dataStorage")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleUserPhoto")}</h3>
      <p className="mt-2">{t("userPhoto")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleCookie")}</h3>
      <p className="mt-2">{t("cookie")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleDeleteData")}</h3>
      <p className="mt-2">{t("deleteData")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleShareData")}</h3>
      <p className="mt-2">{t("shareData")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleSecurity")}</h3>
      <p className="mt-2">{t("security")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleChangesPolicy")}</h3>
      <p className="mt-2">{t("changesPolicy")}</p>
      <h3 className="text-l font-bold mt-4 mb-4">{t("titleContactUs")}</h3>
      <p className="mt-2">{t("contactUs")}</p>
    </div>
  );
};
