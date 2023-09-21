"use client";

import dynamic from "next/dynamic";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import RoomTimer from "../components/Timer/RoomTimer";
import { timeElapsed } from "../components/Timer/utils";
import { DeltaStatic } from "../components/TextEditor";

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
  const [textDelta, setTextDelta] = useState<string>("");

  const convex = useConvex();
  const getSlug = useQuery(api.slugs.getSlug, {
    slug: slug,
  });

  useEffect(() => {
    createSlugFn();
    if (getSlug) {
      setSlugId(getSlug._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createSlugFn() {
    const getTheSlug = await convex.query(api.slugs.getSlug, {
      slug: slug,
    });

    if (!getTheSlug) {
      const res = await createSlug({
        slug: slug,
        docText: "",
      });

      setSlugId(res as Id<"slugs">);
    } else {
      setSlugId(getTheSlug._id);
      setTextDelta(getTheSlug.docText);
    }
  }

  return (
    <main className="flex flex-col items-center pt-4">
      <div>
        <div className="flex items-end justify-between py-10">
          <h1 className="text-4xl">100Editors</h1>
          <div>
            <h3 className="text-2xl">{slug ? `Room: ${slug}` : ""}</h3>
            <h3>Editors Online: {usersInRoom.length + 1}</h3>
            {getSlug ? (
              !getSlug.endTime ? (
                <RoomTimer start={getSlug.startTime} />
              ) : (
                <>
                  {`Completed in: ${timeElapsed({
                    start: getSlug.startTime,
                    end: getSlug.endTime || Date.now(),
                  })}`}
                </>
              )
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
        <DocumentWrapper
          slug={slug}
          slugId={slugId}
          setUsersInRoom={setUsersInRoom}
          textDelta={textDelta}
          setTextDelta={setTextDelta}
        />
      </div>
    </main>
  );
}
