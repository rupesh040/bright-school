"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeaderContent } from "../type";
import { Icon } from "./ui";

export function Navbar({ content }: { content: HeaderContent }) {
  const { logo, name, subtitle, links, action, navigationLabel, openMenu, closeMenu } = content;
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(links[0]?.href);
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = links[0]?.href ?? "/";

  useEffect(() => {
    const navHrefs = links.map((l) => l.href).filter((h) => h.startsWith("#"));

    function updateActiveOnScroll() {
      // 1. If near top of page, activate home
      if (window.scrollY < 80) {
        setActive(home);
        return;
      }

      // 2. If scrolled near the very bottom of page, activate last item
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        const lastHref = navHrefs[navHrefs.length - 1];
        if (lastHref) setActive(lastHref);
        return;
      }

      // 3. Header height is ~70-80px. Check which section spans the active viewport line
      let currentSection = home;
      for (const href of navHrefs) {
        const id = href.replace(/^#/, "");
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom > 80) {
            currentSection = href;
            break;
          }
          if (rect.top <= 160) {
            currentSection = href;
          }
        }
      }

      setActive(currentSection);
    }

    updateActiveOnScroll();
    window.addEventListener("scroll", updateActiveOnScroll, { passive: true });
    window.addEventListener("hashchange", updateActiveOnScroll);

    return () => {
      window.removeEventListener("scroll", updateActiveOnScroll);
      window.removeEventListener("hashchange", updateActiveOnScroll);
    };
  }, [links, home]);

  return (
    <header
      className="sticky top-0 z-30 border-b border-slate-100 bg-white shadow-[0_2px_12px_#071f4312]"
      onKeyDown={(event) => {
        if (expanded && event.key === "Escape") {
          setExpanded(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="relative mx-auto flex min-h-[4.4rem] max-w-[92rem] items-center justify-between gap-4 px-5 sm:px-8 lg:min-h-[5rem] xl:px-12">
        <a href={home} className="inline-flex min-w-0 shrink-0 items-center gap-3 rounded-sm text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-ink sm:gap-4" onClick={() => setExpanded(false)}>
          <Image src={logo.src} alt={logo.alt} width={84} height={68} className="h-auto w-[3rem] sm:w-[4.3rem] lg:w-[4.65rem]" />
          <span className="border-l border-gold pl-3 text-[1.12rem] leading-[1.03] font-extrabold tracking-[-0.035em] sm:pl-4 sm:text-2xl xl:text-[1.75rem]">
            <span className="block">{name}</span>
            <span className="block text-[0.85em] leading-[1.16]">{subtitle}</span>
          </span>
        </a>

        <nav aria-label={navigationLabel} className="hidden items-center gap-4 min-[1100px]:flex xl:gap-6 2xl:gap-8">
          {links.map(({ name, href }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? "location" : undefined}
              onClick={() => setActive(href)}
              className="relative whitespace-nowrap px-0.5 py-2.5 text-[0.82rem] font-bold after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100 aria-[current=location]:after:scale-x-100 motion-reduce:after:transition-none xl:text-sm"
            >
              {name}
            </a>
          ))}
        </nav>

        <a href={action.href} className="hidden shrink-0 items-center gap-2.5 rounded-lg bg-linear-to-r from-gold to-amber-400 px-4 py-3 text-sm font-extrabold text-navy hover:to-amber-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-ink min-[1100px]:inline-flex xl:px-5">
          <Icon name="phone" className="size-[1.15rem]" />
          {action.name}
        </a>

        <button
          type="button"
          ref={menuButton}
          aria-label={expanded ? closeMenu : openMenu}
          aria-controls="mobile-navigation"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg border border-navy/10 bg-cream text-navy transition-colors hover:bg-gold/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-ink min-[1100px]:hidden"
        >
          <Icon name={expanded ? "close" : "menu"} className="size-6" />
        </button>

        <nav
          id="mobile-navigation"
          aria-label={navigationLabel}
          hidden={!expanded}
          className="absolute inset-x-0 top-full max-h-[70dvh] overflow-auto border-t border-slate-100 bg-white px-5 pt-2 pb-5 shadow-lg motion-safe:animate-fade sm:px-8 min-[1100px]:hidden"
        >
          {[...links, action].map(({ name, href }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? "location" : undefined}
              onClick={() => setExpanded(false)}
              className="block rounded-md px-3 py-3 text-sm font-bold outline-amber-ink hover:bg-cream aria-[current=location]:bg-cream"
            >
              {name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
