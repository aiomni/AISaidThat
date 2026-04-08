import type { ReactNode } from "react";

import { MessageSquareQuote, Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navItems = [
  { to: "/", label: "Archive" },
  { to: "/models", label: "Models" },
  { to: "/contribute", label: "Contribute" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--surface-strong)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3" to="/">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--line)] bg-[var(--ink)] text-white shadow-[0_12px_24px_rgba(31,26,20,0.16)]">
              <MessageSquareQuote className="h-5 w-5" />
            </div>
            <div>
              <div className="font-[var(--font-display)] text-lg font-bold tracking-tight">
                AISaidThat
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                AI language culture archive
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-[var(--ink)] text-white"
                      : "text-[color:var(--muted)] hover:bg-white/70 hover:text-[color:var(--ink)]",
                  )
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            className={buttonVariants({ variant: "secondary", size: "md" })}
            to="/contribute"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Submit a phrase
          </Link>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-81px)] max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-[color:var(--line)] bg-[color:var(--surface-strong)]/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[color:var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>AISaidThat documents the phrases AI models keep repeating.</p>
          <div className="flex flex-wrap gap-4">
            <Link className="hover:text-[color:var(--ink)]" to="/">
              Trending phrases
            </Link>
            <Link className="hover:text-[color:var(--ink)]" to="/models">
              Model archives
            </Link>
            <Link className="hover:text-[color:var(--ink)]" to="/contribute">
              GitHub contribution flow
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
