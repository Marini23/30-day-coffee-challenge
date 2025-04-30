import { useTranslation } from "react-i18next";
import { defaultTasks } from "../../data/defaultTasks";

export const TasksList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-10">
      {defaultTasks.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h2 className="text-2xl font-bold mb-4">
            {t(`sectionsTasks.${section.title}`)}
          </h2>
          <ul className="flex flex-col gap-4">
            {section.tasks.map((task) => (
              <li
                key={task.number}
                className="flex border rounded-xl p-4 bg-latte text-espresso shadow-sm"
              >
                <div>{task.number}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {" "}
                    {t(`tasks.${task.number}.title`)}
                  </h3>
                  <p className="text-base">
                    {t(`tasks.${task.number}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
