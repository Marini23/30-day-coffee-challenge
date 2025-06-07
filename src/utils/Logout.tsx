import { useNavigate } from "react-router-dom";
import { LogOut } from "../firebase/firebaseAuth";
import { useUserStore } from "../store/userStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: clearUser } = useUserStore();
  const logout = async () => {
    try {
      await LogOut();
      clearUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};
