export type LocaleText = {
  ru: string;
  en: string;
};

export type ServiceItem = {
  id: string;
  icon: string;
  title: LocaleText;
  description: LocaleText;
};

export type CategoryContent = {
  title: LocaleText;
  description: LocaleText;
  services: ServiceItem[];
};

export type StepItem = {
  id: string;
  icon: string;
  title: LocaleText;
  description: LocaleText;
};

export type ContactItem = {
  label: LocaleText;
  url: string;
};

export type ExampleItem = {
  id: string;
  category: "sites" | "bots";
  image: string;
  title: LocaleText;
  description: LocaleText;
  link?: string;
};

export type SiteContent = {
  hero: {
    title: LocaleText;
    subtitle: LocaleText;
  };
  categories: {
    sites: CategoryContent;
    bots: CategoryContent;
  };
  steps: StepItem[];
  payment: LocaleText;
  contacts: {
    primary: ContactItem;
    secondary: ContactItem | null;
  };
  examples: ExampleItem[];
  seo: {
    title: LocaleText;
    description: LocaleText;
  };
};

export type Locale = "ru" | "en";
