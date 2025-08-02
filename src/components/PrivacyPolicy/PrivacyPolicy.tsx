import { useTranslation } from "react-i18next";

export const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto p-6 text-base leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <p>{t("effectiveDate")}</p>
      <p className="mt-4">{t("intro")}</p>
      <p className="mt-2">{t("dataWeCollect")}</p>
      <h3>{t("titleDataUse")}</h3>
      <p className="mt-2">{t("dataWeUse")}</p>
    </div>
  );
};
