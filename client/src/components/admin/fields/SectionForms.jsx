import { TextField, TextAreaField, StringListField, RepeaterField } from "./Fields.jsx";

function set(data, onChange) {
  return (key) => (value) => onChange({ ...data, [key]: value });
}

function setNested(data, onChange) {
  return (parentKey, key) => (value) =>
    onChange({ ...data, [parentKey]: { ...data[parentKey], [key]: value } });
}

export function HeroHomeForm({ data, onChange }) {
  const f = set(data, onChange);
  const nf = setNested(data, onChange);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Heading (line 1)" value={data.headingLine1} onChange={f("headingLine1")} />
        <TextField label="Heading (highlighted)" value={data.headingHighlight} onChange={f("headingHighlight")} />
      </div>
      <TextAreaField label="Subtext" value={data.subtext} onChange={f("subtext")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Primary button label" value={data.primaryCta?.label} onChange={nf("primaryCta", "label")} />
        <TextField label="Primary button link" value={data.primaryCta?.href} onChange={nf("primaryCta", "href")} />
        <TextField label="Secondary button label" value={data.secondaryCta?.label} onChange={nf("secondaryCta", "label")} />
        <TextField label="Secondary button link" value={data.secondaryCta?.href} onChange={nf("secondaryCta", "href")} />
      </div>
    </div>
  );
}

export function PageHeroForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Eyebrow badge (optional)" value={data.eyebrow} onChange={f("eyebrow")} />
      <TextAreaField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextAreaField label="Subtext" value={data.subtext} onChange={f("subtext")} />
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

export function TextIntroForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Subheading (optional)" value={data.subheading} onChange={f("subheading")} />
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
      <TextField label="Tag badge (optional)" value={data.tag} onChange={f("tag")} />
      <TextField label="Heading (optional)" value={data.heading} onChange={f("heading")} />
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
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextField label="Subheading (optional)" value={data.subheading} onChange={f("subheading")} />
      <StringListField label="Items" items={data.items} onChange={f("items")} />
    </div>
  );
}

export function ProcessStepsForm({ data, onChange }) {
  const f = set(data, onChange);
  return (
    <div className="space-y-4">
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
      <TextAreaField label="Intro (optional)" value={data.intro} onChange={f("intro")} />
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
      <TextField label="Heading (optional)" value={data.heading} onChange={f("heading")} />
      <TextAreaField label="Intro (optional)" value={data.intro} onChange={f("intro")} />
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
      <TextField label="Heading" value={data.heading} onChange={f("heading")} />
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
      <StringListField label="Service options (dropdown)" items={data.serviceOptions} onChange={f("serviceOptions")} />
    </div>
  );
}

export const SECTION_FORM_REGISTRY = {
  heroHome: { label: "Home Hero", Form: HeroHomeForm },
  pageHero: { label: "Page Header", Form: PageHeroForm },
  textIntro: { label: "Text Block", Form: TextIntroForm },
  iconGrid: { label: "Card Grid", Form: IconGridForm },
  valueList: { label: "Tag List", Form: ValueListForm },
  processSteps: { label: "Process Steps", Form: ProcessStepsForm },
  columnGroups: { label: "Column Groups", Form: ColumnGroupsForm },
  ctaBanner: { label: "CTA Banner", Form: CtaBannerForm },
  contact: { label: "Contact Form", Form: ContactForm },
};
