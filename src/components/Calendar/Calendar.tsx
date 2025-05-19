import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { enGB, Locale } from "date-fns/locale";
import { pl } from "date-fns/locale";
import { uk } from "date-fns/locale";
import { useTranslation } from "react-i18next";

type CompletedCalendarProps = {
  completedDays: Date[] | null;
};

const localeMap: Record<string, Locale> = {
  en: enGB,
  pl: pl,
  uk: uk,
};

export const Calendar: React.FC<CompletedCalendarProps> = ({
  completedDays,
}) => {
  const { i18n } = useTranslation();
  const currentLocale = localeMap[i18n.language] || enGB;

  if (completedDays === null) return null;

  return (
    <DayPicker
      key={completedDays.length}
      mode="multiple"
      locale={currentLocale}
      onDayClick={() => {}}
      selected={completedDays}
      modifiersClassNames={{
        selected: "bg-latte text-espresso rounded-full",
      }}
      className="p-4"
      styles={{
        day: { pointerEvents: "none", cursor: "default" },
      }}
    />
  );
};
