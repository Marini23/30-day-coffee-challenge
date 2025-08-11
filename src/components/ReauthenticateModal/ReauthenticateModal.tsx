import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserData } from "../../firebase/userDataService";
import { useLoadingStore } from "../../store/userStore";

interface ReauthenticateModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  email: string;
}

export const ReauthenticateModal: React.FC<ReauthenticateModalProps> = ({
  uid,
  isOpen,
  onClose,
  email,
}) => {
  const { isLoading, setLoading } = useLoadingStore();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUserData(uid, email, password);
      onClose();
      navigate("/login");
    } catch (error) {
      console.error("Error delete user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm your password</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter your password to confirm account deletion.
        </p>

        <input
          type="password"
          placeholder="Your password"
          className="border w-full p-2 rounded-lg mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            disabled={isLoading || !password}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
