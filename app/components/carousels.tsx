"use client";

import Image from "next/image";
import { useState } from "react";
import type { BannerContent, TestimonialContent } from "../type";
import { Container, Icon, Reveal, SectionHeading } from "./ui";

export function Hero({ content }: { content: BannerContent }) {
  const { id, eyebrow, title, highlight, images, controls } = content;
  const [active, setActive] = useState(0);
  const hasSlides = images.length > 1;

  function move(step: number) {
    setActive((current) => (current + step + images.length) % images.length);
  }

  return (
    <section
      id={id}
      aria-label={controls.label}
      className="relative isolate flex min-h-[29rem] scroll-mt-20 items-end justify-center overflow-hidden bg-navy px-4 pb-12 sm:min-h-[32rem] sm:items-center sm:px-16 sm:pb-0 lg:min-h-[clamp(33rem,45.3vw,51rem)]"
      onKeyDown={(event) => {
        if (!hasSlides || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div className="absolute inset-0 -z-10" aria-live="polite">
        {images.map((image, index) => (
          <div
            key={image.src}
            aria-hidden={index !== active}
            className={`absolute inset-0 motion-safe:transition-opacity motion-safe:duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              loading={index === 0 ? "eager" : undefined}
              fetchPriority={index === 0 ? "high" : undefined}
              className="object-cover object-[63%_center] sm:object-center"
            />
          </div>
        ))}
      </div>
      <div className="w-full max-w-md rounded-2xl border border-white/25 bg-navy/80 px-5 py-5 shadow-2xl motion-safe:animate-enter sm:w-[70vw] sm:max-w-none sm:px-9 sm:py-11 lg:w-[60vw] lg:max-w-[70rem] lg:px-[min(3.9vw,4.5rem)] lg:py-[clamp(3rem,5vw,5rem)]">
        <p className="mb-2.5 flex items-center gap-2.5 text-lg leading-tight font-extrabold text-white sm:mb-4 sm:gap-3.5 sm:text-[clamp(1.55rem,3.2vw,3.25rem)]">
          <span aria-hidden="true" className="h-1 w-8 shrink-0 bg-gold sm:h-[0.2em] sm:w-[1.6em]" />
          {eyebrow}
        </p>
        <h1 className="text-[clamp(1.9rem,6.6vw,2.65rem)] leading-[1.11] font-extrabold tracking-[-0.028em] text-white sm:text-[clamp(2.05rem,4.72vw,5rem)]">
          {title}{" "}
          <span className="block text-gold sm:whitespace-nowrap">{highlight}</span>
        </h1>
      </div>
      {hasSlides && (
        <div className="pointer-events-none absolute inset-x-0 top-[42%] flex -translate-y-1/2 justify-between px-4 sm:top-1/2 sm:px-8 lg:px-[2.7vw]">
          <button type="button" aria-label={controls.previous} onClick={() => move(-1)} className="pointer-events-auto grid size-9 cursor-pointer place-items-center rounded-full bg-gold text-navy shadow-md transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
            <Icon name="arrow-left" className="size-5" />
          </button>
          <button type="button" aria-label={controls.next} onClick={() => move(1)} className="pointer-events-auto grid size-9 cursor-pointer place-items-center rounded-full bg-gold text-navy shadow-md transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
            <Icon name="arrow-right" className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}

export function Testimonials({ content }: { content: TestimonialContent }) {
  const { id, heading, ratingLabel, items, controls } = content;
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <section id={id} className="relative isolate scroll-mt-28 overflow-hidden bg-white py-14 sm:py-16 lg:py-18">
      <div aria-hidden="true" className="pointer-events-none absolute -top-19 -left-16 h-35 w-57 rotate-[-28deg] rounded-[45%] bg-cream" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-19 h-36 w-65 -rotate-26 rounded-[45%] bg-cream" />
      <Container>
        <Reveal><SectionHeading heading={heading} /></Reveal>
        {item && (
          <Reveal className="relative mx-auto mt-8 max-w-[72rem] sm:mt-10">
            <div
              key={item.name}
              aria-live="polite"
              className="relative isolate grid gap-6 overflow-hidden rounded-[1.65rem] border border-amber-100/60 bg-white p-5 shadow-[0_14px_32px_#071f4315] motion-safe:animate-fade sm:grid-cols-[0.68fr_1.5fr] sm:items-center sm:gap-8 sm:p-8 lg:gap-12 lg:p-9"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-17 -bottom-24 -z-10 h-48 w-83 -rotate-24 rounded-[45%] bg-cream" />
              <div className="relative mx-auto aspect-[1.08] w-full max-w-65 before:absolute before:inset-0 before:-translate-x-2 before:translate-y-2 before:rounded-[1.4rem] before:bg-gold sm:before:-translate-x-4 sm:before:translate-y-3">
                <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 639px) 75vw, 260px" className="rounded-[1.35rem] border-2 border-white object-cover" />
              </div>
              <figure className="relative pb-1">
                <Icon name="quote" className="mb-1.5 size-11 text-gold sm:size-12" />
                <Icon name="quote" className="pointer-events-none absolute -top-1 right-0 -z-10 size-18 rotate-180 text-cream sm:size-24" />
                <blockquote className="max-w-[37rem] font-serif text-xl leading-snug font-semibold text-navy italic sm:text-2xl">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <div role="img" aria-label={ratingLabel.replace("{rating}", String(item.rating))} className="mb-1.5 flex gap-0.5 text-gold">
                    {Array.from({ length: item.rating }, (_, index) => <Icon name="star" key={index} className="size-[1.3rem]" />)}
                  </div>
                  <span className="block text-lg font-extrabold sm:text-xl">{item.name}</span>
                  <span className="block text-sm leading-relaxed text-slate-600 sm:text-base">{item.designation}</span>
                </figcaption>
              </figure>
            </div>
            {items.length > 1 && (
              <div aria-label={controls.label} className="mt-6 flex items-center justify-center gap-4">
                <button type="button" aria-label={controls.previous} onClick={() => setActive((active + items.length - 1) % items.length)} className="grid size-10 cursor-pointer place-items-center rounded-full border border-navy/10 bg-white shadow-sm hover:bg-cream">
                  <Icon name="chevron-left" className="size-5" />
                </button>
                {items.map(({ name }, index) => (
                  <button type="button" key={name} aria-label={controls.showItem.replace("{number}", String(index + 1))} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} className="grid size-7 cursor-pointer place-items-center rounded-full">
                    <span className={`size-2.5 rounded-full ${index === active ? "bg-gold" : "bg-slate-300"}`} />
                  </button>
                ))}
                <button type="button" aria-label={controls.next} onClick={() => setActive((active + 1) % items.length)} className="grid size-10 cursor-pointer place-items-center rounded-full bg-gold hover:bg-amber-300">
                  <Icon name="chevron-right" className="size-5" />
                </button>
              </div>
            )}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
