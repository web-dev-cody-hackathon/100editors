"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-6 text-3xl">100Editors</h1>
      <h3 className="mb-6 text-2xl">
        {params.slug ? `Room: ${params.slug}` : ""}
      </h3>
      <DocumentWrapper slug={params.slug} />
    </main>
  );
}
