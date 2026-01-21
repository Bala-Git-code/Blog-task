import React from "react";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const AppLayout = ({ left, right }: Props) => (
  <div className="h-screen bg-black flex flex-col font-mono scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-600">
    <header className="border-b-2 border-blue-500 bg-black sticky top-0 z-40 px-6 py-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
      <h1 className="text-xl font-bold text-blue-400">
        {"> "} Blog Dashboard
      </h1>
      <p className="text-xs text-zinc-500 mt-1">{"$ "} create and manage your blog posts</p>
    </header>
    <main className="flex flex-1 gap-4 overflow-hidden">
      <aside className="w-[400px] border-2 border-blue-500 rounded-none overflow-y-auto bg-black p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        <div className="space-y-4">{left}</div>
      </aside>
      <article className="flex-1 border-2 border-green-500 rounded-none overflow-y-auto bg-black p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-600 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
        <div>{right}</div>
      </article>
    </main>
  </div>
);
