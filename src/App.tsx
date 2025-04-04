import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SharedLayout } from "./components/SharedLayout";
import { SettingsPage } from "./pages/SettingsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LogInPage } from "./pages/LogInPage";

function App(): React.JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<div>Home</div>} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default App;
