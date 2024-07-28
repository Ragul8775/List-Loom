import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { PiSquaresFourBold } from "react-icons/pi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegSquare } from "react-icons/fa6";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { HiHashtag } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-primary text-white rounded-r-lg px-2 ">
      <div className="flex items-center justify-start gap-4 px-4 h-16  bg-primary">
        <Image
          src={"/assets/logo-white.png"}
          height={40}
          width={40}
          alt="Logo"
        />
        <span className="font-semibold font-jos text-3xl">List Loom</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="px-4 py-2 space-y-1">
          <Link
            href="/"
            className="flex items-center justify-start px-4 py-2 text-gray-300 hover:bg-primaryLight rounded gap-2 text-lg"
          >
            <PiSquaresFourBold className="w-6 h-6" />
            <span>Home</span>
          </Link>
          <Link
            href="/tasks"
            className="flex items-center justify-start px-4 py-2 text-gray-300 hover:bg-primaryLight rounded gap-2 text-lg"
          >
            <MdOutlineTaskAlt className="w-6 h-6" />
            <span>My Tasks</span>
          </Link>

          <Link
            href="/analytics"
            className="flex items-center justify-start px-4 py-2 text-gray-300 hover:bg-primaryLight rounded gap-2 text-lg"
          >
            <MdOutlineAnalytics className="w-6 h-6" />
            <span>Analytics</span>
          </Link>
        </nav>
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-lg">Label</span>
            <button onClick={toggleDropdown}>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>
          {isDropdownOpen && (
            <div className="mt-2">
              <Link
                href="/workspace1"
                className="px-4 py-2 text-gray-300 hover:bg-primaryLight rounded flex items-center justify-start gap-2"
              >
                <HiHashtag />
                Important
              </Link>
              <Link
                href="/workspace2"
                className=" px-4 py-2 text-gray-300 hover:bg-primaryLight rounded flex items-center justify-start gap-2"
              >
                <HiHashtag />
                Gym
              </Link>
            </div>
          )}
        </div>
        <div className="px-4 py-2">
          <span className="text-gray-200 font-semibold text-lg">Project</span>
          <nav className="mt-2 space-y-1">
            <Link
              href="/workspace1"
              className="flex items-center justify-start gap-4 px-4 py-2 text-gray-300 hover:bg-primaryLight rounded "
            >
              <PiDotsSixVerticalBold className="w-5 h-5" />
              <div className="flex items-center justify-center gap-2">
                <FaRegSquare className="text-red-500" />
                <span>Grunge</span>
              </div>
            </Link>
            <Link
              href="/workspace2"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-primaryLight rounded gap-4"
            >
              <PiDotsSixVerticalBold className="w-5 h-5" />
              <div className="flex items-center justify-center gap-2">
                <FaRegSquare className="text-purple-500" />
                <span>Recon</span>
              </div>
            </Link>
            <Link
              href="/workspace3"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-primaryLight rounded gap-4"
            >
              <PiDotsSixVerticalBold className="w-5 h-5" />

              <div className="flex items-center justify-center gap-2">
                <FaRegSquare className="text-cyan-500" />
                <span>InShot</span>
              </div>
            </Link>
          </nav>
          <button className="flex justify-center items-center gap-4  mt-4 w-full px-4 py-2 text-left text-gray-300 hover:bg-primaryLight rounded  border-2 border-dashed">
            <CiCirclePlus className="h-5 w-5 " />
            <span>Create new</span>
          </button>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Sidebar;
