import { useTranslation } from "react-i18next";
import { Icon } from "../../utils/Icon";
import { ProgressSection } from "../ProgressBar/ProgressSection";
import { Section } from "../../types/tasks";

interface TasksListProps {
  tasks: Section[];
  onToggleTask: (taskNumber: number) => void;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  onToggleTask,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6  my-0 mx-auto  ">
      {tasks.map((section, sectionIndex) => {
        const total = section.tasks.length;
        const completed = section.tasks.filter((task) => task.completed).length;

        return (
          <section key={sectionIndex}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {t(`sectionsTasks.${section.title}`)}
              </h2>
              <ProgressSection completed={completed} total={total} />
            </div>

            <ul className="flex flex-col gap-6">
              {section.tasks.map((task) => (
                <li
                  key={task.number}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl shadow-[0_2px_8px_theme('colors.espresso')] text-espresso"
                >
                  <div
                    className="w-8 h-8 flex-shrink-0 cursor-pointer"
                    onClick={() => onToggleTask(task.number)}
                  >
                    {task.completed ? (
                      <Icon
                        name="icon-completed"
                        size={32}
                        className="fill-active"
                      />
                    ) : (
                      <Icon
                        name="icon-empty"
                        size={32}
                        className="fill-latte"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {t(`tasks.${task.number}.title`)}
                    </h3>
                    <p className="text-base">
                      {t(`tasks.${task.number}.description`)}
                    </p>
                  </div>

                  <p className="italic font-bold text-right w-8">
                    {String(task.number).padStart(2, "0")}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
};
