"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-6 text-3xl">100Editors</h1>
      <div className="flex justify-center content-center items-center flex-col gap-5">
        <p>Go to a room by adding a slug to the URL</p>
        <p>For Example: /room1 or /room2</p>
        <p>The editor is now shared per room</p>
      </div>
    </main>
  );
}
