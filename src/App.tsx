import { Routes, Route } from "react-router-dom";
import "./App.css";

function App(): React.JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Shared layout</div>}>
          <Route index element={<div>Home</div>} />
          <Route path="/register" element={<div>Sign In</div>} />
          <Route path="/login" element={<div>Log In</div>} />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
