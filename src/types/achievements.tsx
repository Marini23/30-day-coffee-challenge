export type Achievement = {
  id: string;
  icon: string;
  completed: boolean;
  createdAt?: number;
  updatedAt?: number;
  shareImageUrl?: string;
};
export type AchievementsState = {
  achievements: Achievement[];
  updateAchievement: (id: string, updatedData: Partial<Achievement>) => void;
  setAchievements: (achievements: Achievement[]) => void;
};
