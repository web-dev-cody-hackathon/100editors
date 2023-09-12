"use client";

import dynamic from "next/dynamic";

// we must disable SSR since ReactQuill attempts to access the `document`
const TextEditor = dynamic(() => import("./components/TextEditor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-6 text-3xl">100Editors</h1>
      <TextEditor className="w-full" />
    </main>
  );
}
