import { Routes, Route } from "react-router-dom";
import "./App.css";
import { SharedLayout } from "./components/SharedLayout";

function App(): React.JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<div>Home</div>} />
          <Route path="/register" element={<div>Sign In</div>} />
          <Route path="/login" element={<div>Log In</div>} />
          <Route path="/settings" element={<div>Profile</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
