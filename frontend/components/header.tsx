"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore";
import { BlockSkeleton } from "./block-skeleton";
import { storage } from "@/lib/utils";
import { ToggleTheme } from "./toggle-theme";

export const Header = () => {
  const state = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    storage.remove("token");
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
      <ToggleTheme />
    </header>
  );
};
