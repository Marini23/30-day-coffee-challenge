import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/userStore";
import i18n from "i18next";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableLanguages = ["en", "pl", "ua", "ru"];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as "en" | "pl" | "ua" | "ru");
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  // Close on outside click or Escape
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

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mr-2 ml-2 bg-secondary text-primary flex items-center justify-center rounded-full font-medium w-[24px] tablet:w-[40px] desktop:w-[50px] h-[24px] tablet:h-[40px] desktop:h-[50px] text-[14px] tablet:text-[18px] desktop:text-[24px] hover:bg-gold focus:bg-gold focus:outline-none"
      >
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 bg-secondary text-espresso rounded-lg shadow-lg py-2 w-24 z-10">
          {availableLanguages.map((lang) => (
            <li key={lang}>
              <button
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full text-left px-4 py-2 hover:bg-gold ${
                  lang === language ? "font-bold" : ""
                }`}
              >
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
