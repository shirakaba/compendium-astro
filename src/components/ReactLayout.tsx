import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

const enableSidebars = false;

export function ReactLayout({ children }: PropsWithChildren){
  return (
    <div className="grid grid-cols-[248px_minmax(768px,1fr)_248px] gap-x-2">
      {/* Top navbar */}
      <header className="col-span-3 bg-amber-200">
        <nav>
          <ul className="flex gap-x-4 p-2">
            <li><a href="/about">About</a></li>
            <li><a href="/docs">Docs</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </nav>
      </header>

      {/* Left-hand sidebar (248px) */}
      {enableSidebars && <aside className="hidden lg:block bg-cyan-200">
        <nav>
          <ul className="flex flex-col">
            <li><a href="#">Section 1</a></li>
            <li><a href="#">Section 2</a></li>
            <li><a href="#">Section 3</a></li>
          </ul>
        </nav>
      </aside>}

      {/* Main content (768px) */}
      <main className={twMerge("bg-purple-200 col-span-3", enableSidebars ? "lg:col-span-2 xl:col-span-1" : "")}>
        {children}
      </main>

      {/* Right-hand sidebar (248px) */}
      {enableSidebars && <aside className="hidden xl:block bg-pink-200">
        <nav>
          <ul className="flex flex-col">
            <li><a href="#">Section 1</a></li>
            <li><a href="#">Section 2</a></li>
            <li><a href="#">Section 3</a></li>
          </ul>
        </nav>
      </aside>}
    </div>
  );
}