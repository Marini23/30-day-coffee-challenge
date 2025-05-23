import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { enGB, Locale } from "date-fns/locale";
import { pl } from "date-fns/locale";
import { uk } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

type CompletedCalendarProps = {
  completedDays: Date[] | null;
};

const localeMap: Record<string, Locale> = {
  en: enGB,
  pl: pl,
  uk: uk,
};

const capitalizeFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

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
        selected: "bg-gold text-espresso rounded-full",
        today: "text-red font-semibold",
      }}
      className="p-4 text-espresso font-semibold"
      styles={{
        day: { pointerEvents: "none", cursor: "default" },
      }}
      formatters={{
        formatCaption: (month, options) =>
          capitalizeFirst(format(month, "LLLL yyyy", options)),
      }}
    />
  );
};
