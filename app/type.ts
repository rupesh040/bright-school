export type IconName =
  | "arrow-left" | "arrow-right" | "ball" | "blocks" | "book" | "bus"
  | "calculator" | "camera" | "cap" | "chevron-down" | "chevron-left"
  | "chevron-right" | "close" | "eye" | "facebook" | "flask" | "instagram"
  | "laptop" | "linkedin" | "mail" | "menu" | "monitor" | "phone" | "pin"
  | "quote" | "school" | "star" | "target" | "teachers" | "youtube";

export type Photo = { src: string; alt: string };
export type Link = { name: string; href: string };
export type SocialLink = { name: string; icon: IconName; href?: string };
export type ContactLink = { label: string; value: string; icon: IconName; href: string };

export type HeadingContent = {
  eyebrow?: string;
  icon: IconName;
  title: string;
  highlight: string;
  suffix?: string;
  description?: string;
};

type SectionContent = { id: string; heading: HeadingContent };

export type TopbarContent = { items: ContactLink[]; socialLabel: string; social: SocialLink[] };

export type HeaderContent = {
  logo: Photo;
  name: string;
  subtitle: string;
  links: Link[];
  action: Link;
  navigationLabel: string;
  openMenu: string;
  closeMenu: string;
  skipLabel: string;
};

type CarouselLabels = { label: string; previous: string; next: string; showItem: string };

export type BannerContent = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  images: Photo[];
  controls: CarouselLabels;
};

export type AboutContent = SectionContent & {
  images: { boy: Photo; lab: Photo; girl: Photo };
  values: { title: string; description: string; icon: IconName }[];
};

export type AcademicsContent = SectionContent & {
  actionLabel: string;
  items: {
    title: string;
    description: string;
    image: Photo;
    icon: IconName;
    tone: "rose" | "amber" | "mint" | "lilac";
    href: string;
  }[];
};

export type FacilitiesContent = SectionContent & {
  items: { title: string; image: Photo; icon: IconName }[];
};

export type TeamContent = SectionContent & {
  items: { name: string; designation: string; image: Photo; icon: IconName }[];
  controls: CarouselLabels;
};

export type TestimonialContent = SectionContent & {
  ratingLabel: string;
  items: { name: string; designation: string; quote: string; rating: number; image: Photo }[];
  controls: CarouselLabels;
};

export type GalleryContent = SectionContent & {
  items: {
    layout: "campus" | "group" | "lab" | "team" | "football" | "reading" | "dance";
    image: Photo;
  }[];
};

export type FAQContent = SectionContent & { items: { question: string; answer: string }[] };

export type ContactContent = SectionContent & {
  details: { title: string; description: string; items: ContactLink[] };
  form: {
    title: string;
    fields: { name: string; email: string; phone: string; inquiry: string; message: string };
    options: string[];
    submitLabel: string;
    recipient: string;
    feedback: string;
  };
};

export type FooterContent = {
  logo: Photo;
  description: string;
  quickLinksLabel: string;
  quickLinks: Link[];
  contactLabel: string;
  items: ContactLink[];
  socialLabel: string;
  copyright: string;
};

type SectionVariants = {
  Topbar: { SchoolTopbar1: TopbarContent };
  Header: { SchoolHeader1: HeaderContent };
  Footer: { SchoolFooter1: FooterContent };
  Banner: { SchoolBanner1: BannerContent };
  About: { SchoolAbout1: AboutContent };
  Academics: { SchoolAcademics1: AcademicsContent };
  Facilities: { SchoolFacilities1: FacilitiesContent };
  Team: { SchoolTeam1: TeamContent };
  Testimonial: { SchoolTestimonial1: TestimonialContent };
  Gallery: { SchoolGallery1: GalleryContent };
  FAQ: { SchoolFAQ1: FAQContent };
  Contact: { SchoolContact1: ContactContent };
};

type SharedSection = "Topbar" | "Header" | "Footer";
type PageSection = Exclude<keyof SectionVariants, SharedSection>;

export type TemplateComponent = {
  [Key in PageSection]: { key: Key; component: keyof SectionVariants[Key] };
}[PageSection];

export type ContentDocument = {
  School: {
    metadata: { title: string; description: string; language: string };
    templateComponents: {
      "template-1": {
        shared: { [Key in SharedSection]: keyof SectionVariants[Key] };
        pages: { home: { components: TemplateComponent[] } };
      };
    };
    sections: { [Key in keyof SectionVariants]: { variants: SectionVariants[Key] } };
  };
};
