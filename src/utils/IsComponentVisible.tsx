import { useState, useEffect, useRef } from "react";

export default function useComponentVisible<T extends HTMLElement>() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef<T | null>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    if (isComponentVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isComponentVisible]); 

  return { ref, isComponentVisible, setIsComponentVisible };
}
