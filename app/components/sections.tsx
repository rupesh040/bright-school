"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type {
  AboutContent,
  AcademicsContent,
  FacilitiesContent,
  GalleryContent,
} from "../type";
import { Container, Icon, Reveal, SectionHeading } from "./ui";

export function About({ content }: { content: AboutContent }) {
  const { id, heading, images, values } = content;

  return (
    <section id={id} className="relative isolate scroll-mt-28 overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-13 size-52 rounded-full bg-cream/75" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-19 h-48 w-70 rotate-24 rounded-[45%] bg-cream" />
      <Container className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.1fr] xl:gap-16">
        <Reveal className="order-2 lg:order-1 relative mx-auto w-full max-w-[31rem] sm:w-[85%] lg:w-full">
          <div aria-hidden="true" className="absolute -top-6 -left-3 h-25 w-31 bg-[radial-gradient(circle,#0a2952_1.35px,transparent_1.6px)] bg-size-[13px_13px] opacity-25 sm:-left-5" />
          <div className="relative grid grid-cols-[0.7fr_1fr] gap-3 sm:gap-4">
            <div className="grid gap-3 sm:gap-4">
              <div className="relative aspect-[0.79] overflow-hidden rounded-[0.85rem] bg-cream">
                <Image
                  src={images.boy.src}
                  alt={images.boy.alt}
                  fill
                  sizes="(max-width: 639px) 40vw, 195px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[0.8] overflow-hidden rounded-[0.85rem] bg-cream">
                <Image
                  src={images.lab.src}
                  alt={images.lab.alt}
                  fill
                  sizes="(max-width: 639px) 40vw, 195px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative mt-[10%] mb-[20%]">
              <div className="relative h-full min-h-48 overflow-hidden rounded-[0.85rem] bg-cream">
                <Image
                  src={images.girl.src}
                  alt={images.girl.alt}
                  fill
                  sizes="(max-width: 639px) 55vw, 285px"
                  className="object-cover object-top"
                />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-5 left-[8%] h-1/3 w-1/2 rounded-2xl border-[7px] border-gold/70 sm:border-[9px]" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-2 left-[64%] size-6 rounded bg-navy sm:size-8" />
              <div aria-hidden="true" className="pointer-events-none absolute -top-7 right-1 flex items-end gap-1.5">
                <span className="h-4 w-1 -rotate-14 rounded-full bg-gold/55" />
                <span className="mb-0.5 h-4 w-1 rotate-20 rounded-full bg-gold/55" />
                <span className="-mb-2 h-3.5 w-1 rotate-54 rounded-full bg-gold/55" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <SectionHeading heading={heading} align="left" />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-9">
            {values.map((value, index) => (
              <article key={value.title} className={`rounded-[1.35rem] p-5 sm:p-6 ${index % 2 ? "bg-sky-50" : "bg-cream"}`}>
                <Icon name={value.icon} className="mb-2 size-9 text-amber-ink" />
                <h3 className="font-serif text-[1.65rem] leading-tight font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-[0.95rem]">{value.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const programTones: Record<AcademicsContent["items"][number]["tone"], {
  card: string;
  trim: string;
  badge: string;
}> = {
  rose: { card: "border-rose-100 bg-rose-50/45", trim: "bg-rose-300", badge: "bg-rose-100 text-rose-700" },
  amber: { card: "border-amber-200 bg-amber-50/55", trim: "bg-amber-300", badge: "bg-amber-100 text-amber-ink" },
  mint: { card: "border-emerald-200 bg-emerald-50/35", trim: "bg-emerald-300", badge: "bg-emerald-100 text-emerald-800" },
  lilac: { card: "border-violet-200 bg-violet-50/45", trim: "bg-violet-300", badge: "bg-violet-100 text-violet-950" },
};

export function Academics({ content }: { content: AcademicsContent }) {
  const { id, heading, actionLabel, items } = content;

  return (
    <section id={id} className="scroll-mt-28 bg-white py-12 sm:py-15 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeading heading={heading} />
        </Reveal>
        <Reveal className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
          {items.map((program) => {
            const tone = programTones[program.tone];

            return (
              <article key={program.title} className={`group flex h-full flex-col overflow-hidden rounded-[1.25rem] border shadow-sm motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-md ${tone.card}`}>
                <div className="relative aspect-[1.43] bg-transparent">
                  <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-[105%] [clip-path:ellipse(83%_100%_at_50%_0%)] ${tone.trim}`} />
                  <div className="absolute inset-0 overflow-hidden [clip-path:ellipse(83%_100%_at_50%_0%)]">
                    <Image
                      src={program.image.src}
                      alt={program.image.alt}
                      fill
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 46vw, 25vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.045]"
                    />
                  </div>
                  <div className={`absolute -bottom-4 left-5 grid size-15 place-items-center rounded-full border-[5px] border-white lg:left-6 ${tone.badge}`}>
                    <Icon name={program.icon} className="size-7" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-start px-5 pt-7 pb-5 lg:px-6">
                  <h3 className="font-serif text-[1.45rem] leading-tight font-bold text-navy xl:text-[1.62rem]">{program.title}</h3>
                  <p className="mt-2 mb-4 flex-1 text-sm leading-snug text-slate-700 sm:text-[0.95rem]">{program.description}</p>
                  <a
                    href={program.href}
                    aria-label={`${actionLabel} · ${program.title}`}
                    className="inline-flex items-center gap-2 rounded-md bg-navy px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                  >
                    {actionLabel}
                    <Icon name="arrow-right" className="size-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

export function Facilities({ content }: { content: FacilitiesContent }) {
  const { id, heading, items } = content;

  return (
    <section id={id} className="scroll-mt-28 bg-white py-11 sm:py-14 lg:py-15">
      <Container>
        <Reveal>
          <SectionHeading heading={heading} />
        </Reveal>
        <Reveal className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {items.map((item) => (
            <article key={item.title} className="group relative aspect-[1.75] overflow-hidden rounded-[1.1rem] bg-cream shadow-md ring-1 ring-navy/5">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 639px) 90vw, (max-width: 1023px) 46vw, 33vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
              />
              <h3 className="absolute bottom-3 left-3 isolate flex max-w-[calc(100%-1.75rem)] items-center gap-2 rounded-l-xl rounded-tr-sm rounded-br-[1.25rem] bg-white py-1.5 pr-5 pl-2 text-sm font-bold leading-tight text-navy shadow-[4px_2px_0_var(--color-gold)] sm:bottom-3.5 sm:left-4 lg:text-base">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-cream text-amber-ink">
                  <Icon name={item.icon} className="size-5" />
                </span>
                {item.title}
              </h3>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

const galleryLayout: Record<GalleryContent["items"][number]["layout"], string> = {
  campus: "col-start-1 row-start-1 row-span-2 lg:row-start-1 lg:row-span-6",
  group: "col-start-2 row-start-1 lg:row-start-1 lg:row-span-2",
  lab: "col-start-2 row-start-2 lg:row-start-3 lg:row-span-2",
  team: "col-start-1 row-start-3 lg:col-start-2 lg:row-start-5 lg:row-span-2",
  football: "col-span-2 row-start-4 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3",
  reading: "col-start-2 row-start-3 lg:col-start-4 lg:row-start-1 lg:row-span-3",
  dance: "col-span-2 row-start-5 lg:col-start-3 lg:row-start-4 lg:row-span-3",
};

export function Gallery({ content }: { content: GalleryContent }) {
  const { id, heading, items } = content;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImage === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImage((curr) =>
          curr !== null ? (curr + items.length - 1) % items.length : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImage((curr) =>
          curr !== null ? (curr + 1) % items.length : null
        );
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedImage, items.length]);

  return (
    <section id={id} className="scroll-mt-28 bg-[#faf6f1] py-12 sm:py-15 lg:py-16">
      <Container>
        <Reveal>
          <SectionHeading heading={heading} variant="line" />
        </Reveal>
        <Reveal className="mt-8 grid grid-cols-2 auto-rows-[clamp(5.75rem,24vw,10rem)] gap-2 sm:gap-2.5 lg:mt-9 lg:aspect-[2.78] lg:grid-cols-[25fr_21fr_35fr_17fr] lg:grid-rows-6">
          {items.map(({ image, layout }, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setSelectedImage(index)}
              aria-label={`View photo: ${image.alt || "Campus gallery image"}`}
              className={`group relative isolate block w-full overflow-hidden rounded-xl bg-cream ring-2 ring-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-ink sm:rounded-2xl text-left ${galleryLayout[layout]}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1023px) 95vw, 50vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="grid size-11 place-items-center rounded-full bg-white/95 text-navy shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Icon name="eye" className="size-5" />
                </span>
              </div>
            </button>
          ))}
        </Reveal>
      </Container>

      {/* Lightbox Modal */}
      {selectedImage !== null && items[selectedImage] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md animate-fade sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex flex-col max-h-[92vh] max-w-5xl w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls: Counter & Close button */}
            <div className="flex w-full items-center justify-between pb-3 text-white">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 sm:text-sm">
                Image {selectedImage + 1} of {items.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image preview"
                className="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 active:scale-95 focus-visible:outline-2 focus-visible:outline-white"
              >
                <Icon name="close" className="size-6" />
              </button>
            </div>

            {/* Main image viewer with side navigation arrows */}
            <div className="relative flex aspect-[16/10] w-full max-h-[75vh] items-center justify-center overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
              <Image
                src={items[selectedImage].image.src}
                alt={items[selectedImage].image.alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 95vw, 1100px"
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={() =>
                  setSelectedImage((curr) =>
                    curr !== null ? (curr + items.length - 1) % items.length : null
                  )
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid size-11 cursor-pointer place-items-center rounded-full bg-white/85 text-navy shadow-lg backdrop-blur-xs transition hover:bg-gold hover:text-navy active:scale-95 focus-visible:outline-2 focus-visible:outline-navy sm:left-4"
              >
                <Icon name="chevron-left" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedImage((curr) =>
                    curr !== null ? (curr + 1) % items.length : null
                  )
                }
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid size-11 cursor-pointer place-items-center rounded-full bg-white/85 text-navy shadow-lg backdrop-blur-xs transition hover:bg-gold hover:text-navy active:scale-95 focus-visible:outline-2 focus-visible:outline-navy sm:right-4"
              >
                <Icon name="chevron-right" className="size-6" />
              </button>
            </div>

            {/* Caption */}
            {items[selectedImage].image.alt && (
              <p className="mt-3 text-center text-sm font-medium text-white/90 sm:text-base">
                {items[selectedImage].image.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
