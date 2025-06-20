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

function App(): React.JSX.Element {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
