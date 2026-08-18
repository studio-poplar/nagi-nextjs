"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavLink, TideDatum } from "@/lib/content";
import TideTicker from "./TideTicker";

interface HeaderProps {
  navLinks: NavLink[];
  tideData: TideDatum[];
}

export default function Header({ navLinks, tideData }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <TideTicker tideData={tideData} />
      <nav className="nav wrap">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          凪<small>NAGI</small>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "close ×" : "menu ☰"}
        </button>
        <ul id="nav-links" className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/apply"
              className="btn primary nav-cta"
              aria-current={pathname === "/apply" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              入会する
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
