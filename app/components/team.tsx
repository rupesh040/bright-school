"use client";

import Image from "next/image";
import { useState } from "react";
import type { TeamContent } from "../type";
import { Container, Icon, Reveal, SectionHeading } from "./ui";

const cardVisibility = ["", "hidden sm:block", "hidden lg:block", "hidden lg:block"];

export function Team({ content }: { content: TeamContent }) {
  const { id, heading, items, controls } = content;
  const [firstIndex, setFirstIndex] = useState(0);
  const [clickedArrow, setClickedArrow] = useState<"prev" | "next" | null>(null);

  if (items.length === 0) return null;

  const activeIndex = firstIndex % items.length;
  const teachers = [...items.slice(activeIndex), ...items.slice(0, activeIndex)].slice(0, 4);

  function moveBy(amount: number, direction: "prev" | "next") {
    setClickedArrow(direction);
    setFirstIndex((index) => (index + amount + items.length) % items.length);
  }

  const baseArrowClass =
    "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full shadow-md cursor-pointer transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";
  const inactiveArrowClass =
    "bg-white text-navy border border-slate-200/80 hover:bg-cream hover:border-gold/50";
  const activeArrowClass =
    "bg-gold text-navy border border-gold hover:bg-amber-300 shadow-gold/25";

  return (
    <section id={id} className="relative isolate scroll-mt-28 overflow-hidden bg-white py-12 sm:py-15 lg:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-44 w-64 -rotate-23 rounded-[45%] bg-cream" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-30 h-48 w-68 -rotate-23 rounded-[45%] bg-cream" />
      <Container>
        <Reveal>
          <SectionHeading heading={heading} />
        </Reveal>
        <Reveal className="mt-8 lg:mt-10">
          <div role="group" aria-label={controls.label}>
            <div className="relative px-10 sm:px-12 lg:px-14">
              <div id={`${id}-cards`} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {teachers.map((teacher, index) => (
                  <article
                    key={`${activeIndex}-${teacher.name}`}
                    className={`relative isolate mx-auto aspect-[0.84] w-full max-w-xs overflow-hidden rounded-[1.15rem] bg-cream shadow-md motion-safe:animate-enter sm:max-w-none ${cardVisibility[index]}`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={teacher.image.src}
                        alt={teacher.image.alt}
                        fill
                        sizes="(max-width: 639px) min(320px, 85vw), (max-width: 1023px) 45vw, 25vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gold">
                      <div className="flex min-h-[4.25rem] items-center gap-3 rounded-tl-[1.1rem] rounded-br-[3.3rem] bg-navy px-3 py-2.5 pr-7 text-white sm:gap-2.5 xl:gap-3 xl:px-3.5 xl:pr-8">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream text-amber-ink xl:size-10">
                          <Icon name={teacher.icon} className="size-6 xl:size-7" />
                        </span>
                        <div>
                          <h3 className="text-sm leading-tight font-bold sm:text-base lg:text-sm xl:text-base">{teacher.name}</h3>
                          <p className="mt-0.5 text-xs leading-tight text-white/90 xl:text-sm">{teacher.designation}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label={controls.previous}
                    aria-controls={`${id}-cards`}
                    onClick={() => moveBy(-1, "prev")}
                    className={`${baseArrowClass} left-0 sm:left-1 lg:left-2 ${
                      clickedArrow === "prev" ? activeArrowClass : inactiveArrowClass
                    }`}
                  >
                    <Icon name="chevron-left" className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={controls.next}
                    aria-controls={`${id}-cards`}
                    onClick={() => moveBy(1, "next")}
                    className={`${baseArrowClass} right-0 sm:right-1 lg:right-2 ${
                      clickedArrow === "next" ? activeArrowClass : inactiveArrowClass
                    }`}
                  >
                    <Icon name="chevron-right" className="size-5" />
                  </button>
                </>
              )}
            </div>

            {items.length > 1 && (
              <div className="mt-5 flex justify-center gap-0.5">
                {items.map((teacher, index) => (
                  <button
                    key={teacher.name}
                    type="button"
                    aria-label={controls.showItem.replace("{number}", String(index + 1))}
                    aria-controls={`${id}-cards`}
                    aria-current={activeIndex === index}
                    onClick={() => setFirstIndex(index)}
                    className="group grid size-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-navy"
                  >
                    <span className="size-2.5 rounded-full bg-slate-300 transition-colors group-aria-[current=true]:bg-gold group-hover:bg-amber-400" />
                  </button>
                ))}
              </div>
            )}
            <p className="sr-only" aria-live="polite">{items[activeIndex].name}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
