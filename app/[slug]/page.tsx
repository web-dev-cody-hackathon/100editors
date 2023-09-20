"use client";

import Timer from "../components/Timer/Timer";
import dynamic from "next/dynamic";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

// we must disable SSR since ReactQuill attempts to access the `document`
const DocumentWrapper = dynamic(() => import("../components/DocumentWrapper"), {
  ssr: false,
});

interface PageParams {
  params: {
    slug: string;
  };
}
export default function Page(props: PageParams) {
  const { params } = props;
  const { slug } = params;
  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);

  const createSlug = useMutation(api.slugs.createSlug);
  const [slugId, setSlugId] = useState<Id<"slugs"> | undefined>(undefined);

  useEffect(() => {
    createSlugFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createSlugFn() {
    const res = await createSlug({
      slug: slug,
    });

    setSlugId(res as Id<"slugs">);
  }

  return (
    <main className="flex flex-col items-center pt-4">
      <div>
        <div className="flex items-end justify-between py-10">
          <h1 className="text-4xl">100Editors</h1>
          <div>
            <h3 className="text-2xl">{slug ? `Room: ${slug}` : ""}</h3>
            <h3>Editors Online: {usersInRoom.length + 1}</h3>
            <Timer start={Date.now()} />
          </div>
        </div>
        <DocumentWrapper
          slug={slug}
          slugId={slugId}
          usersInRoom={usersInRoom}
          setUsersInRoom={setUsersInRoom}
        />
      </div>
    </main>
  );
}
