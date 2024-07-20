"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore";
import { BlockSkeleton } from "./block-skeleton";

export const Header = () => {
  const { setTheme } = useTheme();
  const state = useSelector((state: RootState) => state.auth);

  console.log("state", state);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 h-14 shrink-0 bg-transparent backdrop-blur-xl">
      <Link
        href="/"
        className="inline-flex items-center home-links whitespace-nowrap"
      >
        Image Gallery
      </Link>
      <div className="ml-auto relative flex items-center justify-end space-x-2">
        {state.isLoading ? <BlockSkeleton className="mr-3" /> : null}

        {!state.isLoading ? (
          !state.isLoggedIn ? (
            <Link href={"/login"} className="mr-3 underline">
              Login
            </Link>
          ) : (
            <Button
              variant={"link"}
              className="mr-3 underline"
              onClick={handleLogout}
            >
              logout
            </Button>
          )
        ) : null}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
