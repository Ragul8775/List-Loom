import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { IoMdSunny } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="flex items-center justify-between gap-4 py-2 px-2 bg-dark rounded-lg shadow-lg ">
      <button
        className={`flex items-center px-4 py-2 rounded-lg justify-center w-2/3 ${
          theme === "light" ? "bg-white text-gray-900" : "text-gray-500"
        }`}
        onClick={() => toggleTheme("light")}
      >
        <IoMdSunny className="w-4 h-4 mr-1" />
        Light
      </button>
      <button
        className={`flex items-center px-4 py-2  rounded-lg justify-center w-2/3 ${
          theme === "dark" ? "bg-primary text-white" : "text-gray-500"
        }`}
        onClick={() => toggleTheme("dark")}
      >
        <LuMoonStar className="w-4 h-4 mr-1" />
        Dark
      </button>
    </div>
  );
};

export default ThemeToggle;
