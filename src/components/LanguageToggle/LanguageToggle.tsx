import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/userStore";
import i18n from "i18next";
import { updateUserLanguage } from "../../firebase/userDataService";

export const LanguageToggle: React.FC = () => {
  const { uid, language, setLanguage } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableLanguages = [
    { code: "en", flag: "gb", label: "EN" },
    { code: "pl", flag: "pl", label: "PL" },
    { code: "ua", flag: "ua", label: "UA" },
    { code: "ru", flag: "ru", label: "RU" },
  ] as const;

  // Close dropdown on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLanguageChange = async (lang: string) => {
    setLanguage(lang as "en" | "pl" | "ua" | "ru");
    i18n.changeLanguage(lang);
    setIsOpen(false);

    if (uid) {
      try {
        await updateUserLanguage(uid, lang);
      } catch (error) {
        console.error("Failed to update language in Firebase:", error);
      }
    }
  };

  const currentFlag = availableLanguages.find((l) => l.code === language)?.flag;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
        className=" ml-2  bg-secondary text-primary flex items-center justify-center rounded-full font-medium w-[46px] tablet:w-[60px] desktop:w-[80px] h-[24px] tablet:h-[40px] desktop:h-[50px] text-[12px] tablet:text-[16px] desktop:text-[20px] hover:bg-gold focus:bg-gold focus:outline-none"
      >
        <span className={`fi fi-${currentFlag} mr-1`} />
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 bg-secondary text-espresso rounded-lg shadow-lg py-2 w-24 z-10">
          {availableLanguages.map(({ code, flag, label }) => (
            <li key={code}>
              <button
                onClick={() => handleLanguageChange(code)}
                className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gold ${
                  code === language ? "font-bold" : ""
                }`}
              >
                <span className={`fi fi-${flag} w-5 h-3.5 rounded-sm`} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
