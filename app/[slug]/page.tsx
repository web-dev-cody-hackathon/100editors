"use client";

import { useRouter } from "next/navigation";
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
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-6 text-3xl">100Editors</h1>
      <h3 className="mb-6 text-2xl">{slug ? `Room: ${slug}` : ""}</h3>
      <DocumentWrapper slug={slug} slugId={slugId} />
    </main>
  );
}
