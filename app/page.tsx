import { Hero, Testimonials } from "./components/carousels";
import { Footer, Topbar } from "./components/chrome";
import { Contact, FAQ } from "./components/contact";
import { Navbar } from "./components/navigation";
import { About, Academics, Facilities, Gallery } from "./components/sections";
import { Team } from "./components/team";
import { content } from "./content";
import type { TemplateComponent } from "./type";

const { sections, templateComponents } = content.School;
const template = templateComponents["template-1"];

function renderSection({ key, component }: TemplateComponent) {
  switch (key) {
    case "Banner":
      return <Hero key={key} content={sections.Banner.variants[component]} />;
    case "About":
      return <About key={key} content={sections.About.variants[component]} />;
    case "Academics":
      return <Academics key={key} content={sections.Academics.variants[component]} />;
    case "Facilities":
      return <Facilities key={key} content={sections.Facilities.variants[component]} />;
    case "Team":
      return <Team key={key} content={sections.Team.variants[component]} />;
    case "Testimonial":
      return <Testimonials key={key} content={sections.Testimonial.variants[component]} />;
    case "Gallery":
      return <Gallery key={key} content={sections.Gallery.variants[component]} />;
    case "FAQ":
      return <FAQ key={key} content={sections.FAQ.variants[component]} />;
    case "Contact":
      return <Contact key={key} content={sections.Contact.variants[component]} />;
  }
}

export default function Home() {
  const topbar = sections.Topbar.variants[template.shared.Topbar];
  const header = sections.Header.variants[template.shared.Header];
  const footer = sections.Footer.variants[template.shared.Footer];

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-lg bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {header.skipLabel}
      </a>
      <Topbar content={topbar} />
      <Navbar content={header} />
      <main id="main" tabIndex={-1} className="outline-none">
        {template.pages.home.components.map(renderSection)}
      </main>
      <Footer content={footer} brand={header} social={topbar.social} />
    </>
  );
}
