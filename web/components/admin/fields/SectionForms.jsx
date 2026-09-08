import { TextField, TextAreaField, StringListField, RepeaterField, ImageField, SelectField, ToggleField } from "./Fields.jsx";

function set(data, onChange) {
  return (key) => (value) => onChange({ ...data, [key]: value });
}

function setNested(data, onChange) {
  return (parentKey, key) => (value) =>
    onChange({ ...data, [parentKey]: { ...data[parentKey], [key]: value } });
}


// Every banded section accepts the same presentation controls, so they are
// authored once here rather than repeated in each form.
function HeadingFields({ data, onChange, kickerLabel = "Kicker (small label above heading)" }) {
  const f = set(data, onChange);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label={kickerLabel} value={data.kicker} onChange={f("kicker")} />
        <TextField
          label="Accent words (rendered in italic serif at the end of the heading)"
          value={data.accent}
          onChange={f("accent")}
        />
      </div>
      <TextAreaField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextAreaField label="Intro paragraph (optional)" value={data.intro} onChange={f("intro")} />
    </>
  );
}

const STAT_FIELDS = [
  { key: "value", label: "Value — the number animates from zero (e.g. 24/7, 360°, 80%)" },
  { key: "label", label: "Label" },
];

export function HeroHomeForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Badge above the heading" value={data.eyebrow} onChange={f("eyebrow")} />
      <RepeaterField
        label="Hero slides (carousel)"
        items={data.slides}
        onChange={f("slides")}
        itemLabel={(item, i) => (item ? item.headingLine1 || `Slide ${i + 1}` : "slide")}
        newItem={() => ({
          headingLine1: "New Slide",
          headingHighlight: "",
          subtext: "",
          image: "",
          primaryLabel: "Explore Our Solutions",
          primaryHref: "/solutions",
          secondaryLabel: "Talk to an Expert",
          secondaryHref: "/contact",
        })}
        fields={[
          { key: "image", label: "Slide image", type: "image", full: true },
          { key: "headingLine1", label: "Heading (line 1)" },
          { key: "headingHighlight", label: "Heading (accent — italic serif)" },
          { key: "navLabel", label: "Carousel tab label (defaults to the accent words)" },
          { key: "subtext", label: "Subtext", type: "textarea", full: true },
          { key: "primaryLabel", label: "Primary button label" },
          { key: "primaryHref", label: "Primary button link" },
          { key: "secondaryLabel", label: "Secondary button label" },
          { key: "secondaryHref", label: "Secondary button link" },
        ]}
      />
      <RepeaterField
        label="Stats strip (optional)"
        items={data.stats}
        onChange={f("stats")}
        itemLabel={(item, i) => (item ? item.label || `Stat ${i + 1}` : "stat")}
        newItem={() => ({ value: "100+", label: "New stat" })}
        fields={STAT_FIELDS}
      />
    </div>
  );
}

export function PageHeroForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Eyebrow badge (optional)" value={data.eyebrow} onChange={f("eyebrow")} />
      <TextAreaField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif, appended to the heading)" value={data.accent} onChange={f("accent")} />
      <TextAreaField label="Subtext" value={data.subtext} onChange={f("subtext")} />
      <ImageField label="Background image (optional)" value={data.image} onChange={f("image")} />
      <RepeaterField
        label="Buttons (optional)"
        items={data.ctas}
        onChange={f("ctas")}
        itemLabel={(item, i) => item?.label || `Button ${i + 1}`}
        newItem={() => ({ label: "New Button", href: "/contact" })}
        fields={[{ key: "label", label: "Label" }, { key: "href", label: "Link" }]}
      />
    </div>
  );
}

export function FeatureSplitForm({ data, onChange }) {
  const f = set(data, onChange);
  const nf = setNested(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Kicker (optional)" value={data.eyebrow} onChange={f("eyebrow")} />
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif)" value={data.accent} onChange={f("accent")} />
      <StringListField label="Paragraphs" items={data.body} onChange={f("body")} />
      <StringListField label="Bullet points (optional)" items={data.bullets} onChange={f("bullets")} />
      <ImageField label="Image" value={data.image} onChange={f("image")} />
      <TextField label="Caption over the image" value={data.badge} onChange={f("badge")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="admin-label">Image side</label>
          <select className="admin-input" value={data.imageSide ?? "right"} onChange={(e) => f("imageSide")(e.target.value)}>
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Button label (optional)" value={data.cta?.label} onChange={nf("cta", "label")} />
        <TextField label="Button link" value={data.cta?.href} onChange={nf("cta", "href")} />
      </div>
    </div>
  );
}

export function TextIntroForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Kicker (shown above the heading)" value={data.subheading} onChange={f("subheading")} />
      <TextAreaField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif)" value={data.accent} onChange={f("accent")} />
      <StringListField label="Paragraphs" items={data.paragraphs} onChange={f("paragraphs")} />
      <StringListField label="Flow chips (optional, e.g. Assess → Plan → ...)" items={data.flowSteps} onChange={f("flowSteps")} />
      <RepeaterField
        label="Buttons (optional)"
        items={data.ctas}
        onChange={f("ctas")}
        itemLabel={(item, i) => item?.label || `Button ${i + 1}`}
        newItem={() => ({ label: "New Button", href: "/contact" })}
        fields={[{ key: "label", label: "Label" }, { key: "href", label: "Link" }]}
      />
    </div>
  );
}

export function IconGridForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Kicker (small label above heading)" value={data.tag} onChange={f("tag")} />
      <TextAreaField label="Heading (optional)" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif)" value={data.accent} onChange={f("accent")} />
      <TextAreaField label="Intro paragraph (optional)" value={data.intro} onChange={f("intro")} />
      <RepeaterField
        label="Cards"
        items={data.cards}
        onChange={f("cards")}
        itemLabel={(item, i) => item?.title || `Card ${i + 1}`}
        newItem={() => ({ title: "New Card", description: "" })}
        fields={[
          { key: "title", label: "Title" },
          { key: "href", label: "Link (optional)" },
          { key: "description", label: "Description", type: "textarea", full: true },
          { key: "image", label: "Card image (optional)", type: "image", full: true },
        ]}
      />
      <TextField label="Footnote (optional)" value={data.footnote} onChange={f("footnote")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Button label (optional)" value={data.cta?.label} onChange={(v) => onChange({ ...data, cta: { ...data.cta, label: v } })} />
        <TextField label="Button link" value={data.cta?.href} onChange={(v) => onChange({ ...data, cta: { ...data.cta, href: v } })} />
      </div>
    </div>
  );
}

export function ValueListForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Kicker (optional)" value={data.kicker} onChange={f("kicker")} />
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif)" value={data.accent} onChange={f("accent")} />
      <TextAreaField label="Subheading (optional)" value={data.subheading} onChange={f("subheading")} />
      <StringListField label="Items" items={data.items} onChange={f("items")} />
    </div>
  );
}

export function ProcessStepsForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} />
      <RepeaterField
        label="Steps"
        items={data.steps}
        onChange={f("steps")}
        itemLabel={(item, i) => item?.title || `Step ${i + 1}`}
        newItem={() => ({ title: "New Step", description: "" })}
        fields={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description", type: "textarea", full: true },
        ]}
      />
    </div>
  );
}

export function ColumnGroupsForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} kickerLabel="Kicker (optional)" />
      <RepeaterField
        label="Groups"
        items={data.groups}
        onChange={f("groups")}
        itemLabel={(item, i) => item?.title || `Group ${i + 1}`}
        newItem={() => ({ title: "New Group", items: [] })}
        fields={[
          { key: "title", label: "Title" },
          { key: "intro", label: "Intro (optional)" },
          { key: "items", label: "List items", type: "list", full: true },
        ]}
      />
    </div>
  );
}

export function CtaBannerForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Kicker badge (optional)" value={data.kicker} onChange={f("kicker")} />
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif)" value={data.accent} onChange={f("accent")} />
      <TextAreaField label="Subtext (optional)" value={data.subtext} onChange={f("subtext")} />
      <RepeaterField
        label="Buttons"
        items={data.buttons}
        onChange={f("buttons")}
        itemLabel={(item, i) => item?.label || `Button ${i + 1}`}
        newItem={() => ({ label: "New Button", href: "/contact" })}
        fields={[{ key: "label", label: "Label" }, { key: "href", label: "Link" }]}
      />
    </div>
  );
}

export function ContactForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Tag badge" value={data.tag} onChange={f("tag")} />
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Form panel heading (optional)" value={data.formHeading} onChange={f("formHeading")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Company email" value={data.companyEmail} onChange={f("companyEmail")} />
        <TextField label="Company phone" value={data.companyPhone} onChange={f("companyPhone")} />
      </div>
      <TextField label="Company address" value={data.companyAddress} onChange={f("companyAddress")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Service picker label" value={data.serviceLabel} onChange={f("serviceLabel")} />
        <TextField label="Submit button label" value={data.submitLabel} onChange={f("submitLabel")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Response note (next to the live dot)" value={data.responseNote} onChange={f("responseNote")} />
        <TextField label="Small print under the button" value={data.privacyNote} onChange={f("privacyNote")} />
      </div>
      <StringListField label="Service options (shown as selectable chips)" items={data.serviceOptions} onChange={f("serviceOptions")} />
    </div>
  );
}


export function FaqForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Kicker" value={data.tag} onChange={f("tag")} />
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Accent words (italic serif)" value={data.accent} onChange={f("accent")} />
      <TextAreaField label="Subheading (optional)" value={data.subheading} onChange={f("subheading")} />
      <p className="rounded-lg bg-cream px-4 py-3 text-xs text-ink-soft">
        The questions and answers themselves are managed under <strong>FAQs</strong> in the sidebar.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Section types added in the editorial revamp                        *
 * ------------------------------------------------------------------ */

export function MarqueeForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <StringListField label="Ticker phrases" items={data.items} onChange={f("items")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Seconds per loop (lower = faster, default 34)"
          value={data.speed}
          onChange={f("speed")}
        />
        <SelectField
          label="Direction"
          value={data.reverse ? "right" : "left"}
          onChange={(v) => onChange({ ...data, reverse: v === "right" })}
          options={[
            { value: "left", label: "Scrolls left" },
            { value: "right", label: "Scrolls right" },
          ]}
        />
      </div>
    </div>
  );
}

export function StatsBandForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} />
      <SelectField
        label="Heading alignment"
        value={data.align || "center"}
        onChange={f("align")}
        options={[
          { value: "center", label: "Centered" },
          { value: "left", label: "Left" },
        ]}
      />
      <RepeaterField
        label="Metrics"
        items={data.stats}
        onChange={f("stats")}
        itemLabel={(item, i) => item?.label || `Metric ${i + 1}`}
        newItem={() => ({ value: "100+", label: "New metric" })}
        fields={STAT_FIELDS}
      />
      <TextField label="Footnote (optional)" value={data.footnote} onChange={f("footnote")} />
    </div>
  );
}

export function LogoStripForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Heading above the strip" value={data.heading} onChange={f("heading")} />
      <TextField label="Seconds per loop (default 42)" value={data.speed} onChange={f("speed")} />
      <RepeaterField
        label="Names / logos"
        items={data.logos}
        onChange={f("logos")}
        itemLabel={(item, i) => item?.name || `Logo ${i + 1}`}
        newItem={() => ({ name: "New name" })}
        fields={[
          { key: "name", label: "Name (shown as text if no image)" },
          { key: "image", label: "Logo image (optional)", type: "image", full: true },
        ]}
      />
    </div>
  );
}

export function TabbedPillarsForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} />
      <ToggleField
        label="Pin on scroll (section holds still while it steps through each pillar)"
        checked={data.pinned !== false}
        onChange={(v) => f("pinned")(v)}
      />
      <RepeaterField
        label="Pillars (each becomes a tab)"
        items={data.pillars}
        onChange={f("pillars")}
        itemLabel={(item, i) => (item ? item.title || `Pillar ${i + 1}` : "pillar")}
        newItem={() => ({ title: "New Pillar", heading: "", body: "", points: [] })}
        fields={[
          { key: "title", label: "Tab title" },
          { key: "lens", label: "Caption over the image (optional)" },
          { key: "image", label: "Panel image", type: "image", full: true },
          { key: "heading", label: "Panel heading", full: true },
          { key: "body", label: "Panel paragraph", type: "textarea", full: true },
          { key: "points", label: "Proof points", type: "list", full: true },
          { key: "ctaLabel", label: "Button label (optional)" },
          { key: "ctaHref", label: "Button link" },
        ]}
      />
    </div>
  );
}

export function ShowcaseCarouselForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} />
      <div className="grid gap-4 sm:grid-cols-2">
        <ToggleField
          label="Scroll automatically (pauses on hover, stops once a visitor takes over)"
          checked={data.autoplay !== false}
          onChange={f("autoplay")}
        />
        <TextField label="Seconds per card (default 4)" value={data.autoplaySeconds} onChange={f("autoplaySeconds")} />
      </div>
      <RepeaterField
        label="Carousel items"
        items={data.items}
        onChange={f("items")}
        itemLabel={(item, i) => (item ? item.title || `Item ${i + 1}` : "item")}
        newItem={() => ({ title: "New Item", description: "", metric: "" })}
        fields={[
          { key: "title", label: "Title" },
          { key: "metric", label: "Highlight line (optional)" },
          { key: "description", label: "Description", type: "textarea", full: true },
          { key: "image", label: "Image (optional)", type: "image", full: true },
        ]}
      />
    </div>
  );
}

export function TimelineForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} />
      <RepeaterField
        label="Phases"
        items={data.phases}
        onChange={f("phases")}
        itemLabel={(item, i) => (item ? item.title || item.year || `Phase ${i + 1}` : "phase")}
        newItem={() => ({ year: "2026", label: "Phase", title: "New phase", description: "", stats: [] })}
        fields={[
          { key: "year", label: "Year / horizon" },
          { key: "label", label: "Phase label" },
          { key: "title", label: "Title", full: true },
          { key: "description", label: "Description", type: "textarea", full: true },
          {
            key: "stats",
            label: "Phase metrics (optional)",
            type: "repeater",
            full: true,
            fields: STAT_FIELDS,
            newItem: () => ({ value: "10+", label: "New metric" }),
            itemLabel: (item, i) => (item ? item.label || `Metric ${i + 1}` : "metric"),
          },
        ]}
      />
      <TextField label="Closing line (italic serif, optional)" value={data.footnote} onChange={f("footnote")} />
    </div>
  );
}

export function CommitmentsForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <HeadingFields data={data} onChange={onChange} />
      <RepeaterField
        label="Headline metrics"
        items={data.metrics}
        onChange={f("metrics")}
        itemLabel={(item, i) => item?.label || `Metric ${i + 1}`}
        newItem={() => ({ value: "100%", label: "New metric" })}
        fields={STAT_FIELDS}
      />
      <StringListField label="Commitments (numbered list)" items={data.rules} onChange={f("rules")} />
    </div>
  );
}

export const SECTION_FORM_REGISTRY = {
  heroHome: { label: "Home Hero", Form: HeroHomeForm },
  pageHero: { label: "Page Header", Form: PageHeroForm },
  featureSplit: { label: "Feature (Image + Text)", Form: FeatureSplitForm },
  textIntro: { label: "Text Block", Form: TextIntroForm },
  iconGrid: { label: "Card Grid", Form: IconGridForm },
  valueList: { label: "Tag List", Form: ValueListForm },
  processSteps: { label: "Process Steps", Form: ProcessStepsForm },
  columnGroups: { label: "Column Groups", Form: ColumnGroupsForm },
  ctaBanner: { label: "CTA Banner", Form: CtaBannerForm },
  contact: { label: "Contact Form", Form: ContactForm },
  faq: { label: "FAQ Accordion", Form: FaqForm },
  // --- added in the editorial revamp ---
  marquee: { label: "Scrolling Ticker", Form: MarqueeForm },
  statsBand: { label: "Counting Metrics Band", Form: StatsBandForm },
  logoStrip: { label: "Partner / Vendor Strip", Form: LogoStripForm },
  tabbedPillars: { label: "Tabbed Pillars", Form: TabbedPillarsForm },
  showcaseCarousel: { label: "Showcase Carousel", Form: ShowcaseCarouselForm },
  timeline: { label: "Roadmap Timeline", Form: TimelineForm },
  commitments: { label: "Commitments & Metrics", Form: CommitmentsForm },
};
