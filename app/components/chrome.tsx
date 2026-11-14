import Image from "next/image";
import type { FooterContent, HeaderContent, SocialLink, TopbarContent } from "../type";
import { Container, Icon } from "./ui";

const socialColors: Partial<Record<SocialLink["icon"], string>> = {
  facebook: "bg-[#087af0]",
  instagram: "bg-linear-to-tr from-[#ffca38] via-[#e70078] to-[#8635f2]",
  youtube: "bg-[#e90019]",
  linkedin: "bg-[#086da7]",
};

function SocialIcons({ links }: { links: SocialLink[] }) {
  return (
    <ul className="flex items-center gap-2.5">
      {links.map(({ name, icon, href }) => {
        const classes = `grid size-6 place-items-center rounded-full text-white ${socialColors[icon] ?? "bg-slate-700"}`;
        const symbol = <Icon name={icon} className="size-[0.95rem]" />;
        return (
          <li key={name}>
            {href ? (
              <a href={href} aria-label={name} className={`${classes} transition hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}>
                {symbol}
              </a>
            ) : (
              <span className={classes} title={name} role="img" aria-label={name}>{symbol}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Topbar({ content }: { content: TopbarContent }) {
  return (
    <div className="bg-[#06224a] text-white">
      <div className="mx-auto flex min-h-9 max-w-[92rem] items-center justify-between gap-3 px-5 sm:px-8 xl:px-12">
        <ul className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 py-1 sm:gap-x-5 xl:gap-x-7">
          {content.items.map(({ label, value, href, icon }) => (
            <li key={label} className={icon === "pin" ? "hidden sm:block" : ""}>
              <a href={href} className="flex items-center gap-1.5 rounded-sm text-[0.69rem] font-medium whitespace-nowrap hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:gap-2 sm:text-xs lg:text-sm">
                <Icon name={icon} className="size-3.5 shrink-0 text-gold sm:size-4" />
                {value}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <span className="text-xs font-medium lg:text-sm">{content.socialLabel}</span>
          <SocialIcons links={content.social} />
        </div>
      </div>
    </div>
  );
}

export function Footer({
  content, brand, social,
}: {
  content: FooterContent;
  brand: HeaderContent;
  social: SocialLink[];
}) {
  const titleClass = "mb-4 text-lg font-bold after:mt-2 after:block after:h-[3px] after:w-12 after:bg-gold";
  const columnClass = "lg:border-l lg:border-white/20 lg:pl-7 xl:pl-9";

  return (
    <footer className="bg-[#032343] text-white">
      <Container className="grid gap-8 py-11 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.82fr_1.3fr_0.68fr] lg:gap-6 lg:py-14">
        <div>
          <a href={brand.links[0]?.href ?? "/"} className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
            <Image src={content.logo.src} alt={content.logo.alt} width={90} height={77} className="h-auto w-[4.25rem] shrink-0 xl:w-[4.75rem]" />
            <span className="border-l border-gold pl-3 text-[1.35rem] leading-[1.04] font-extrabold tracking-[-0.03em] xl:text-[1.7rem]">
              <span className="block">{brand.name}</span>
              <span className="block text-[0.79em] leading-[1.2]">{brand.subtitle}</span>
            </span>
          </a>
          <p className="mt-4 max-w-[24rem] text-sm leading-relaxed text-white/85 lg:text-[0.94rem]">{content.description}</p>
        </div>
        <nav aria-label={content.quickLinksLabel} className={columnClass}>
          <h2 className={titleClass}>{content.quickLinksLabel}</h2>
          <ul className="space-y-1.5">
            {content.quickLinks.map(({ name, href }) => (
              <li key={href}>
                <a href={href} className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-gold">
                  <Icon name="chevron-right" className="size-4 text-gold" /> {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={columnClass}>
          <h2 className={titleClass}>{content.contactLabel}</h2>
          <ul className="space-y-3">
            {content.items.map(({ icon, label, value, href }) => (
              <li key={label}>
                <a href={href} className="inline-flex items-start gap-2.5 text-sm leading-relaxed wrap-anywhere text-white/90 hover:text-gold">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-navy">
                    <Icon name={icon} className="size-[1.05rem]" />
                  </span>
                  <span className="pt-1">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={columnClass}>
          <h2 className={titleClass}>{content.socialLabel}</h2>
          <SocialIcons links={social} />
        </div>
      </Container>
      <div className="border-t border-white/25">
        <Container className="py-4 text-xs text-white/80 sm:text-sm">{content.copyright}</Container>
      </div>
    </footer>
  );
}
