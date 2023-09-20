"use client";

import { useQuery } from "convex/react";
import LinkGenerator from "./components/LinkGenerator";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";

export default function Home() {
  const allSlugs = useQuery(api.slugs.getAllSlugs);

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex justify-between m-auto items-center">
        <div className="flex-col justify-center p-5">
        <h1 className="pb-10 text-3xl text-left">100Editors</h1>
        <div className="flex justify-center content-center flex-col gap-5 w-full">
          <p>
            Race the clock to write a story satisfying all your publisher&apos;s
            rules!
          </p>
          <p className="mb-10">
            Edit alone or with up to 100 friends. Make a room or join your
            friends!
          </p>
          <LinkGenerator />
          <footer className="mt-10">
            <p>Made by members of the 100Devs Community</p>
            <p>Not associated with 100Devs</p>
          </footer>
        </div>
      </div>

        <div className="flex flex-col h-full p-5 grow border border-red-300 rounded-2xl">
          <LeaderBoard allSlugs={allSlugs} />
        </div>
      </div>
    </main>
  );
}
