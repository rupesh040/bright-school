import type { HTMLAttributes, ReactNode } from "react";
import type { HeadingContent, IconName } from "../type";

const icons: Record<IconName, ReactNode> = {
  "arrow-left": <path d="m12 19-7-7 7-7M5 12h14" />,
  "arrow-right": <path d="M5 12h14m-7-7 7 7-7 7" />,
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  pin: <><path d="M20 10c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></>,
  phone: <path d="M6.3 3H4.5A1.5 1.5 0 0 0 3 4.7 18.7 18.7 0 0 0 19.3 21a1.5 1.5 0 0 0 1.7-1.5v-1.8a1.5 1.5 0 0 0-1.1-1.5l-3.2-.9a1.5 1.5 0 0 0-1.4.4l-1.4 1.4a15 15 0 0 1-7-7l1.4-1.4a1.5 1.5 0 0 0 .4-1.4l-.9-3.2A1.5 1.5 0 0 0 6.3 3Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  cap: <><path fill="currentColor" stroke="none" d="m12 2 11.5 5.8L12 13.5.5 7.8 12 2Zm-7 9.2 7 3.5 7-3.5v5.1c-4 3.2-10 3.2-14 0v-5.1Z" /><path d="M22 9v5" /></>,
  target: <><path d="M20.3 10a9 9 0 1 1-6.4-6.8M15.9 9.1A5 5 0 1 0 17 12" /><path d="m12 12 8-8m-1.4 3.7L17 4.5 20.5 1l.7 3 3 .8-3.7 3.4Z" /></>,
  eye: <><path d="M2 14s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 14 2 14Z" /><circle cx="12" cy="14" r="3" /><path d="M12 2v2m6 0-1 2M6 4l1 2" /></>,
  blocks: <><rect x="8" y="2" width="8" height="8" rx="1" /><rect x="2" y="12" width="9" height="9" rx="1" /><rect x="13" y="12" width="9" height="9" rx="1" /><path d="m10.5 8 1.5-4 1.5 4M5 14.5h2.5v4H5v-4Zm11 0h3m-3 0v4h3" /></>,
  book: <><path d="M12 6c-3-2-6-2.7-9-2v14c3-.7 6 0 9 2 3-2 6-2.7 9-2V4c-3-.7-6 0-9 2Zm0 0v14" /><path d="M6 8c1 0 2 .3 3 1m-3 3c1 0 2 .3 3 1m6-4c1-.7 2-1 3-1m-3 5c1-.7 2-1 3-1" /></>,
  flask: <><path d="M9 3h6m-5 0v6L4 19a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2L14 9V3M7.5 15h9" /><path d="M11 12h.01m2 5.5h.01" /></>,
  school: <><path d="M3 21V10l6 2m12 9V10l-6 2M9 21V8l3-3 3 3v13M2 21h20M12 5V2l4 1-4 .8M6 15h.01M6 18h.01M18 15h.01M18 18h.01M12 10h.01M12 21v-4" /></>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M12 17v4m-4 0h8" /></>,
  laptop: <><path d="M4 17V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12m-18 0h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2Z" /></>,
  bus: <><rect x="4" y="3" width="16" height="16" rx="3" /><path d="M4 11h16M7 19v2m10-2v2M8 15h.01m8 0h.01M9 6h6M2 8v5m20-5v5" /></>,
  ball: <><circle cx="12" cy="12" r="9" /><path d="m12 8-4 3 2 4h4l2-4-4-3Zm0 0V3m4 8 4.8-1.5M14 15l3 4.6M10 15l-3 4.6M8 11 3.2 9.5" /></>,
  camera: <><path d="M4 6h4l2-2h4l2 2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" /><circle cx="12" cy="13" r="4" /></>,
  teachers: <><circle cx="10" cy="6" r="3" /><path d="M4 20v-2a6 6 0 0 1 8-5.6" /><circle cx="17" cy="13" r="2.5" /><path d="M13 21v-1a4 4 0 0 1 8 0v1H4" /></>,
  calculator: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8v3H8zM8 13h.01m4 0h.01m4 0h.01M8 17h.01m4 0h.01m4 0h.01" /></>,
  quote: <path fill="currentColor" stroke="none" d="M10.6 5.3C6.2 7.5 2.7 11.4 2.7 15.9a4.3 4.3 0 1 0 3.8-4.2c.7-1.8 2.2-3.2 4.7-4.6l-.6-1.8Zm10.5 0c-4.4 2.2-7.9 6.1-7.9 10.6a4.3 4.3 0 1 0 3.8-4.2c.7-1.8 2.2-3.2 4.7-4.6l-.6-1.8Z" />,
  star: <path fill="currentColor" stroke="none" d="m12 2 3.1 6.3 7 .9-5.1 4.9 1.2 7-6.2-3.3-6.2 3.3 1.2-7-5.1-4.9 7-.9L12 2Z" />,
  facebook: <path fill="currentColor" stroke="none" d="M14.2 22v-9.1h3l.5-3.5h-3.5V7.2c0-1 .3-1.7 1.8-1.7h1.9V2.4a25 25 0 0 0-2.8-.2c-2.8 0-4.8 1.7-4.8 4.9v2.3H7.1v3.5h3.2V22h3.9Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.6 6.5h.01" /></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" stroke="none" /><path d="m10 9 6 3-6 3Z" fill="#e90019" stroke="none" /></>,
  linkedin: <><path d="M5 10v9m0-14h.01M10 19v-9m0 4a4 4 0 0 1 8 0v5" strokeWidth="2.6" /></>,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
}

export function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12 xl:px-14 ${className}`} {...props} />;
}

export function Reveal({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`motion-safe:supports-[animation-timeline:view()]:animate-reveal motion-safe:[animation-timeline:view()] motion-safe:[animation-range:entry_0%_entry_38%] ${className}`}
      {...props}
    />
  );
}

export function SectionHeading({
  heading, variant = "pill", align = "center",
}: {
  heading: HeadingContent;
  variant?: "pill" | "line" | "symbol";
  align?: "center" | "left";
}) {
  const { icon, eyebrow, title, highlight, suffix, description } = heading;
  return (
    <div className={align === "center" ? "mx-auto text-center" : "text-left"}>
      {eyebrow || variant === "symbol" ? (
        <div className={`inline-flex items-center gap-2.5 ${variant === "pill" ? "rounded-full bg-[#fff0cc] px-4 py-1.5 text-xs sm:text-sm" : "text-base sm:text-lg"} ${variant === "symbol" ? "text-amber-ink" : "text-navy"}`}>
          {variant !== "pill" && <span aria-hidden="true" className="h-px w-10 bg-amber-ink/50 sm:w-20" />}
          <Icon name={icon} className={variant === "symbol" ? "size-8 sm:size-9" : "size-5 shrink-0"} />
          {eyebrow && <span className="font-bold uppercase">{eyebrow}</span>}
          {variant !== "pill" && <span aria-hidden="true" className="h-px w-10 bg-amber-ink/50 sm:w-20" />}
        </div>
      ) : null}
      <h2 className={`mt-2.5 text-balance font-serif text-[clamp(2.05rem,3.35vw,3.25rem)] leading-[0.99] font-bold tracking-[-0.028em] text-navy ${align === "left" ? "max-w-[36rem]" : ""} ${variant === "symbol" ? "sm:text-[clamp(2.65rem,4.4vw,4.05rem)]" : ""}`}>
        {title} <span className="text-gold-heading">{highlight}</span>{suffix ? ` ${suffix}` : ""}
      </h2>
      {description && (
        <p className={`mt-3 max-w-[46rem] text-pretty text-sm leading-relaxed text-slate-700 sm:text-base ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
