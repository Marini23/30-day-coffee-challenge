import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Achievements } from "../components/Achievements/Achievements";
import { ProgressLinear } from "../components/ProgressBar/ProgressLinear";
import { TasksList } from "../components/Tasks/Tasks";
import { Section } from "../types/tasks";
import { defaultTasks } from "../data/defaultTasks";
import { getUserTasks, updateUserTasks } from "../firebase/firebaseTasks";
import { useAchievementsStore, useUserStore } from "../store/userStore";
import React, { useEffect, useMemo, useState } from "react";
import { updateUserAchievement } from "../firebase/firebaseAchievements";
import { updateUserCompletedDays } from "../firebase/userDataService";
import { Calendar } from "../components/Calendar/Calendar";
import { ShareModal } from "../components/ShareModal/ShareModal";
import { useShareAchievement } from "../hooks/useShareAchievement";

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { uid } = useUserStore();
  const { achievements, setAchievements } = useAchievementsStore();
  const [tasks, setTasks] = useState<Section[]>(defaultTasks);

  const {
    showShareModal,
    achievementToShare,
    openShareModal,
    closeShareModal,
  } = useShareAchievement();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!uid) {
        setTasks(defaultTasks);
        return;
      }
      try {
        const data = await getUserTasks(uid);
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

  const completedTasks = useMemo(
    () =>
      tasks.flatMap((s) => s.tasks).filter((t) => t.completed && t.updatedAt),
    [tasks]
  );

  const datesForCalendar = useMemo(() => {
    const unique = new Set(
      completedTasks.map(
        (t) => new Date(t.updatedAt!).toISOString().split("T")[0]
      )
    );
    return [...unique].map((d) => new Date(d));
  }, [completedTasks]);

  const handleToggleTask = async (taskNumber: number) => {
    if (!uid) {
      toast.info("Please log in to start the challenge.");
      return;
    }

    const prevAchievements = [...achievements];

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

    const totalCompletedTasks = updatedTasks
      .flatMap((section) => section.tasks)
      .filter((task) => task.completed).length;

    await updateUserCompletedDays(uid, totalCompletedTasks);

    const updatedAchievements = prevAchievements.map((achievement) => {
      const section = updatedTasks.find(
        (s) =>
          achievement.id ===
          (s.title === "Brewing Basics"
            ? "brew_master"
            : s.title === "Global Coffee Tour"
            ? "coffee_ambassador"
            : s.title === "Creativity & Skills"
            ? "flavor_alchemist"
            : "")
      );
      if (!section) return achievement;
      const isNowCompleted = section.tasks.every((t) => t.completed);
      const wasCompleted = achievement.completed;
      return {
        ...achievement,
        completed: isNowCompleted,
        updatedAt:
          isNowCompleted && !wasCompleted ? Date.now() : achievement.updatedAt,
      };
    });

    setAchievements(updatedAchievements);
    updateUserAchievement(uid, updatedAchievements);

    const newlyCompleted = updatedAchievements.filter(
      (achievement, i) =>
        achievement.completed && !prevAchievements[i].completed
    );

    if (newlyCompleted) {
      openShareModal(newlyCompleted[0]);
    }
  };

  useEffect(() => {}, [datesForCalendar]);

  return (
    <>
      <div className="p-4 flex flex-col gap-6">
        <div className=" laptop:flex laptop:items-center laptop:justify-center ">
          <section className="flex flex-col gap-2 laptop:w-2/3">
            <h3 className="text-espresso text-[22px] font-bold flex justify-center items-center">
              {t(`progress.title`)}
            </h3>
            <ProgressLinear />
            <Achievements
              achievements={achievements}
              onShare={openShareModal}
            />
          </section>
          <section className=" my-0 mx-auto rounded-xl shadow-[0_1px_4px_theme('colors.espresso')] w-80 mt-8">
            <Calendar completedDays={datesForCalendar} />
          </section>
        </div>
        <section>
          <TasksList tasks={tasks} onToggleTask={handleToggleTask} />
        </section>
      </div>
      {achievementToShare && (
        <ShareModal
          isOpen={showShareModal}
          onClose={closeShareModal}
          title={t(`achievements.${achievementToShare.id}`)}
          achievement={achievementToShare}
          allAchievements={achievements}
        />
      )}
    </>
  );
};
