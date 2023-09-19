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
  // const getSlug = useQuery(api.slugs.getSlug, { slug: slug });

  useEffect(() => {
    createSlugFn();
    // createSlugUpsert({
    //   getSlug: getSlug,

    //   slug: slug,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async function createSlugUpsert({
  //   getSlug,
  //   slug,
  // }: {
  //   getSlug: null | undefined;
  //   slug: string;
  // }) {
  //   if (!getSlug) {
  //     console.log("creating slug", slug);
  //     createSlugFn();
  //   } else {
  //     console.log("Joining existing Slug", slug);
  //   }
  // }

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
