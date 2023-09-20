"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Timer from "../components/Timer/Timer";

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
    <main className="flex flex-col items-center pt-4">
      <div>
        <div className="flex items-end justify-between py-10">
          <h1 className="text-4xl">100Editors</h1>
          <div>
            <h3 className="text-2xl">
              {params.slug ? `Room: ${params.slug}` : ""}
            </h3>
            <h3>Editors Online: 2</h3>
            <Timer start={Date.now()} />
          </div>
        </div>
        <DocumentWrapper slug={params.slug} />
      </div>
    </main>
  );
}
