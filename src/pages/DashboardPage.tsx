import { useTranslation } from "react-i18next";
import { Achievements } from "../components/Achievements/Achievements";
import { ProgressLinear } from "../components/ProgressBar/ProgressLinear";
import { TasksList } from "../components/Tasks/Tasks";
import { Section } from "../types/tasks";
import { defaultTasks } from "../data/defaultTasks";
import { getUserTasks, updateUserTasks } from "../firebase/firebaseTasks";
import { useUserStore } from "../store/userStore";
import { useEffect, useState } from "react";
import { defaultAchievements } from "../data/defaultAchievements";
import { Achievement } from "../types/achievements";
import { getUserAchievements } from "../firebase/firebaseAchievements";

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { uid } = useUserStore();
  const [tasks, setTasks] = useState<Section[]>(defaultTasks);
  const [achievements, setAchievements] =
    useState<Achievement[]>(defaultAchievements);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!uid) {
        console.log("Waiting for user ID...");
        setTasks(defaultTasks);
        return;
      }
      try {
        const data = await getUserTasks(uid);
        console.log(data);
        if (data) {
          setTasks(data);
        } else {
          setTasks(defaultTasks);
        }
      } catch (error) {
        console.error("Failed to load achievements:", error);
        setTasks(defaultTasks);
      }
    };
    fetchTasks();
  }, [uid]);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!uid) {
        console.log("Waiting for user ID...");
        setAchievements(defaultAchievements);
        return;
      }
      try {
        const data = await getUserAchievements(uid);
        if (data) {
          console.log(data);
          setAchievements(data);
        } else {
          setAchievements(defaultAchievements);
        }
      } catch (error) {
        console.error("Failed to load achievements:", error);
        setAchievements(defaultAchievements);
      }
    };
    fetchAchievements();
  }, [uid]);

  const handleToggleTask = async (taskNumber: number) => {
    if (!uid) return;
    const updatedTasks = tasks.map((section) => ({
      ...section,
      tasks: section.tasks.map((task) =>
        task.number === taskNumber
          ? { ...task, completed: !task.completed, updatedAt: Date.now() }
          : task
      ),
    }));
    setTasks(updatedTasks);
    await updateUserTasks(uid, updatedTasks);
  };

  return (
    <div className="p-4 flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h3 className="text-espresso text-[22px] font-bold flex justify-center items-center">
          {t(`progress.title`)}
        </h3>
        <ProgressLinear />
        <Achievements achievements={achievements} />
      </section>

      <section>
        <TasksList tasks={tasks} onToggleTask={handleToggleTask} />
      </section>
      <div>Community</div>
    </div>
  );
};
