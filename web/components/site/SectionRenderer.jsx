import Hero from "./sections/Hero.jsx";
import PageHero from "./sections/PageHero.jsx";
import FeatureSplit from "./sections/FeatureSplit.jsx";
import TextIntro from "./sections/TextIntro.jsx";
import IconGrid from "./sections/IconGrid.jsx";
import ValueList from "./sections/ValueList.jsx";
import ProcessSteps from "./sections/ProcessSteps.jsx";
import ColumnGroups from "./sections/ColumnGroups.jsx";
import CtaBanner from "./sections/CtaBanner.jsx";
import Contact from "./sections/Contact.jsx";
import Faq from "./sections/Faq.jsx";
import MarqueeStrip from "./sections/MarqueeStrip.jsx";
import StatsBand from "./sections/StatsBand.jsx";
import LogoStrip from "./sections/LogoStrip.jsx";
import TabbedPillars from "./sections/TabbedPillars.jsx";
import ShowcaseCarousel from "./sections/ShowcaseCarousel.jsx";
import Timeline from "./sections/Timeline.jsx";
import Commitments from "./sections/Commitments.jsx";

const REGISTRY = {
  heroHome: Hero,
  pageHero: PageHero,
  featureSplit: FeatureSplit,
  textIntro: TextIntro,
  iconGrid: IconGrid,
  valueList: ValueList,
  processSteps: ProcessSteps,
  columnGroups: ColumnGroups,
  ctaBanner: CtaBanner,
  contact: Contact,
  faq: Faq,
  // --- added in the editorial revamp ---
  marquee: MarqueeStrip,
  statsBand: StatsBand,
  logoStrip: LogoStrip,
  tabbedPillars: TabbedPillars,
  showcaseCarousel: ShowcaseCarousel,
  timeline: Timeline,
  commitments: Commitments,
};

export default function SectionRenderer({ section, faqs, tone, num, pathname }) {
  if (!section.visible) return null;
  const Component = REGISTRY[section.type];
  if (!Component) return null;

  const extraProps = section.type === "faq" ? { faqs } : {};
  if (section.type === "pageHero") extraProps.pathname = pathname;
  return <Component data={section.data} tone={tone} num={num} {...extraProps} />;
}

export const SECTION_TYPES = Object.keys(REGISTRY);
