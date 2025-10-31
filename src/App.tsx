import "flag-icons/css/flag-icons.min.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SharedLayout } from "./components/SharedLayout";
import { SettingsPage } from "./pages/SettingsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LogInPage } from "./pages/LogInPage";
import { DashboardPage } from "./pages/DashboardPage";
import { useEffect } from "react";
import { fetchUser } from "./firebase/userDataService";
import { HomePage } from "./pages/HomePage";
import {
  useAchievementsStore,
  useLoadingStore,
  useUserStore,
} from "./store/userStore";
import { CoffeeLoader } from "./components/Loader/Loader";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { PageNotFound } from "./pages/PageNotFound";
import { useTranslation } from "react-i18next";
import { UserAchievements } from "./components/UserAchievements/UserAchievements";
import { defaultAchievements } from "./data/defaultAchievements";
import { getUserAchievements } from "./firebase/firebaseAchievements";

function App(): React.JSX.Element {
  const { isLoading, setLoading } = useLoadingStore();
  const { language, isLoggedIn, uid } = useUserStore();
  const { setAchievements } = useAchievementsStore();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };

    loadUser();
  }, [setLoading]);

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
  }, [uid, setAchievements]);

  return (
    <div>
      {isLoading && <CoffeeLoader />}
      {!isLoading && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={isLoggedIn ? <DashboardPage /> : <HomePage />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/achievements" element={<UserAchievements />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
