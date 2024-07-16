import React, { useEffect, useState } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const { toggleTheme, theme } = useTheme();
  const [randomImage, setRandomImage] = useState<string>("");

  useEffect(() => {
    const randomImageNumber = getRandomNumber(1, 8);
    setRandomImage(`/assets/profile/${randomImageNumber}.jpg`); // Adjust the path as necessary
  }, []);
  const toggleDropdown = () => {
    console.log("Dropdown toggled"); // Debug log
    setIsDropdownOpen(!isDropdownOpen);
  };
  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  function getCurrentDayDateYear(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", options);

    const [weekday, monthDay, year] = formattedDate.split(",");
    const [month, day] = monthDay.trim().split(" ");

    return `It's ${weekday.trim()}, ${day.trim()} ${month.trim()} ${year.trim()}`;
  }

  return (
    <nav className="bg-white  my-1">
      <div className="px-10 mx-auto">
        <div className="flex mx-auto justify-between ">
          {/* Primary menu and logo */}
          <div className="flex items-center gap-16 my-4">
            {/* logo */}
            <div className="flex flex-col justify-center items-start">
              <Link href={"#"}>
                <h1 className="font-sans text-xl font-medium">
                  {getGreeting()}, {session?.user?.name}
                </h1>
                <p className="font-sans text-lg ">{getCurrentDayDateYear()}</p>
              </Link>
            </div>
            {/* primary */}
          </div>
          <form className="flex items-center max-w-xl mx-auto">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5
                  "
                placeholder="Search..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-primary rounded-lg border border-primary hover:bg-primaryLight focus:ring-4 focus:outline-none "
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          {/* secondary */}
          <div className="flex gap-6">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6" />
                ) : (
                  <SunIcon className="h-6 w-6" />
                )}
              </div>
              <div className="hidden sm:inline-block relative">
                {session ? (
                  <div className="relative inline-block text-left">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center  text-sm text-white bg-gray-700 rounded-full border-2 m-1  border-primary hover:bg-gray-600"
                    >
                      <Image
                        src={randomImage}
                        width={45}
                        height={45}
                        alt="?"
                        className="rounded-full"
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded shadow-xl z-50">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <Bars3Icon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full  bg-primary dark:bg-dark overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8 ">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            <a href="#" className="border-l-4 border-gray-600">
              Features
            </a>
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};
