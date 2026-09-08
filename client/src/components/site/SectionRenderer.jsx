import Hero from "./sections/Hero.jsx";
import PageHero from "./sections/PageHero.jsx";
import TextIntro from "./sections/TextIntro.jsx";
import IconGrid from "./sections/IconGrid.jsx";
import ValueList from "./sections/ValueList.jsx";
import ProcessSteps from "./sections/ProcessSteps.jsx";
import ColumnGroups from "./sections/ColumnGroups.jsx";
import CtaBanner from "./sections/CtaBanner.jsx";
import Contact from "./sections/Contact.jsx";
import Faq from "./sections/Faq.jsx";

const REGISTRY = {
  heroHome: Hero,
  pageHero: PageHero,
  textIntro: TextIntro,
  iconGrid: IconGrid,
  valueList: ValueList,
  processSteps: ProcessSteps,
  columnGroups: ColumnGroups,
  ctaBanner: CtaBanner,
  contact: Contact,
  faq: Faq,
};

export default function SectionRenderer({ section, faqs, tone }) {
  if (!section.visible) return null;
  const Component = REGISTRY[section.type];
  if (!Component) return null;

  const extraProps = section.type === "faq" ? { faqs } : {};
  return <Component data={section.data} tone={tone} {...extraProps} />;
}
