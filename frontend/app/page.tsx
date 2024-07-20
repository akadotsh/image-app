"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore";
import { UserInfo } from "@/components/user-info";

export default function Home() {
  const { isLoading, email, name, userId, error } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <main className="w-full flex justify-center min-h-screen p-2 px-4 sm:p-24">
      <div className="w-full flex flex-col items-stretch sm:items-center space-y-10">
        <h1 className="text-3xl text-center sm:text-5xl font-extrabold">
          Image App
        </h1>

        <UserInfo
          data={email && name && userId ? { email, name, id: userId } : null}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
}
