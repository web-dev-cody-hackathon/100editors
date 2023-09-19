"use client";

import { useQuery } from "convex/react";
import LinkGenerator from "./components/LinkGenerator";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";

export default function Home() {
  const allSlugs = useQuery(api.slugs.getAllSlugs);

  return (
    <main className="flex">
      <div className="flex min-h-screen flex-col  justify-center p-3 pt-5 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto">
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
      <div className="overflow-hidden relative xl:w-1/3 2xl:w-1/2">
        {/* <Image src="/books.jpg" fill objectFit="cover" quality={5} alt="" /> */}

        <LeaderBoard allSlugs={allSlugs} />
      </div>
    </main>
  );
}
