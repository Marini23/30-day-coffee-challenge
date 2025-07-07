import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Achievements } from "../components/Achievements/Achievements";
import { ProgressLinear } from "../components/ProgressBar/ProgressLinear";
import { TasksList } from "../components/Tasks/Tasks";
import { Section } from "../types/tasks";
import { defaultTasks } from "../data/defaultTasks";
import { getUserTasks, updateUserTasks } from "../firebase/firebaseTasks";
import { useUserStore } from "../store/userStore";
import React, { useEffect, useState } from "react";
import { defaultAchievements } from "../data/defaultAchievements";
import { Achievement } from "../types/achievements";
import {
  getUserAchievements,
  updateUserAchievement,
} from "../firebase/firebaseAchievements";
import { updateUserCompletedDays } from "../firebase/userDataService";
import { Calendar } from "../components/Calendar/Calendar";
import { ShareModal } from "../components/ShareModal/ShareModal";

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { uid } = useUserStore();
  const [tasks, setTasks] = useState<Section[]>(defaultTasks);
  const [achievements, setAchievements] =
    useState<Achievement[]>(defaultAchievements);
  const [datesForCalendar, setDatesForCalendar] = useState<Date[] | null>(null);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [achievementToShare, setAchievementToShare] =
    useState<Achievement | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!uid) {
        console.log("Waiting for user ID...");
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

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!uid) {
        setAchievements(defaultAchievements);
        return;
      }
      try {
        const data = await getUserAchievements(uid);
        if (data) {
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

  useEffect(() => {
    const completedTasks = tasks
      .flatMap((section) => section.tasks)
      .filter((task) => task.completed && task.updatedAt !== undefined);

    const uniqueDates = Array.from(
      new Set(
        completedTasks.map(
          (task) => new Date(task.updatedAt!).toISOString().split("T")[0]
        )
      )
    ).map((d) => new Date(d));

    setDatesForCalendar(uniqueDates);
  }, [tasks]);

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

    console.log(prevAchievements);
    console.log(updatedAchievements);

    setAchievements(updatedAchievements);
    updateUserAchievement(uid, updatedAchievements);

    const newlyCompleted = updatedAchievements.filter(
      (achievement, i) =>
        achievement.completed && !prevAchievements[i].completed
    );

    if (newlyCompleted.length > 0) {
      setAchievementToShare(newlyCompleted[0]);
      setShowShareModal(true);
    }
  };

  useEffect(() => {}, [datesForCalendar]);

  return (
    <>
      <div className="p-4 flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h3 className="text-espresso text-[22px] font-bold flex justify-center items-center">
            {t(`progress.title`)}
          </h3>
          <ProgressLinear />
          <Achievements achievements={achievements} />
        </section>
        <section className=" my-0 mx-auto rounded-xl shadow-[0_1px_4px_theme('colors.espresso')]">
          <Calendar completedDays={datesForCalendar} />
        </section>
        <section>
          <TasksList tasks={tasks} onToggleTask={handleToggleTask} />
        </section>
        <div>Community</div>
      </div>
      {achievementToShare && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          title={t(`achievements.${achievementToShare.id}`)}
          achievement={achievementToShare}
          allAchievements={achievements}
        />
      )}
    </>
  );
};
