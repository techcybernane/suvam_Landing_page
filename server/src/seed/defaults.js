import { randomUUID } from "crypto";

const id = () => randomUUID();

function section(type, order, data) {
  return { id: id(), type, order, visible: true, data };
}

// Curated stock imagery (Unsplash). Editable per-section from the admin panel.
const img = (photoId) => `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`;
const IMG = {
  heroCode: img("photo-1526374965328-7f61d4dc18c5"),
  cyber: img("photo-1550751827-4bd374c3f58b"),
  circuit: img("photo-1518770660439-4636190af475"),
  serverRoom: img("photo-1558494949-ef010cbdcc31"),
  dataCenter: img("photo-1573164713988-8665fc963095"),
  cables: img("photo-1544197150-b99a580bb7a8"),
  earthNet: img("photo-1451187580459-43490279c0fa"),
  code: img("photo-1487058792275-0ad4aaf24ca7"),
  team: img("photo-1519389950473-47ba0277781c"),
  meeting: img("photo-1600880292089-90a7e086ee0c"),
  meetingRoom: img("photo-1497366216548-37526070297c"),
  abstractAi: img("photo-1620712943543-bcc4688e7485"),
  network: img("photo-1544197150-b99a580bb7a8"),
  lock: img("photo-1563986768609-322da13575f3"),
  cloud: img("photo-1451187580459-43490279c0fa"),
  training: img("photo-1524178232363-1fb2b075b655"),
  people: img("photo-1522071820081-009f0129c71c"),
  monitor: img("photo-1551288049-bebda4e38f71"),
  automation: img("photo-1518186285589-2f7649de83e0"),
};

const SOLUTIONS_NAV = [
  { label: "Solutions Overview", href: "/solutions" },
  { label: "Cybersecurity", href: "/solutions/cybersecurity" },
  { label: "Network & IT Infrastructure", href: "/solutions/network-infrastructure" },
  { label: "Web & Software Development", href: "/solutions/software-development" },
  { label: "IT Consulting & Digital Transformation", href: "/solutions/it-consulting" },
  { label: "Managed IT Services", href: "/solutions/managed-it" },
  { label: "Training & Certifications", href: "/solutions/training-certifications" },
];

export const PAGE_LIST = [
  { slug: "home", label: "Home", path: "/" },
  { slug: "about", label: "About Us", path: "/about" },
  { slug: "solutions", label: "Solutions Overview", path: "/solutions" },
  { slug: "cybersecurity", label: "Cybersecurity", path: "/solutions/cybersecurity" },
  { slug: "network-infrastructure", label: "Network & IT Infrastructure", path: "/solutions/network-infrastructure" },
  { slug: "software-development", label: "Web & Software Development", path: "/solutions/software-development" },
  { slug: "it-consulting", label: "IT Consulting & Digital Transformation", path: "/solutions/it-consulting" },
  { slug: "managed-it", label: "Managed IT Services", path: "/solutions/managed-it" },
  { slug: "training-certifications", label: "Training & Certifications", path: "/solutions/training-certifications" },
  { slug: "industries", label: "Industries", path: "/industries" },
  { slug: "insights", label: "Insights", path: "/insights" },
  { slug: "contact", label: "Contact Us", path: "/contact" },
];

export const defaultContent = {
  brand: {
    name: "CybernaNet",
    tagline: "Innovate. Secure. Transform.",
  },
  nav: {
    links: [
      { id: id(), label: "About", href: "/about" },
      { id: id(), label: "Solutions", href: "/solutions", children: SOLUTIONS_NAV.slice(1).map((l) => ({ id: id(), ...l })) },
      { id: id(), label: "Industries", href: "/industries" },
      { id: id(), label: "Insights", href: "/insights" },
      { id: id(), label: "Contact", href: "/contact" },
    ],
    ctaPrimary: { label: "Talk to an Expert", href: "/contact" },
  },
  // Timed lead-capture modal shown on the public site. Everything here is
  // editable from Admin → Site & SEO, and submissions land in Leads with
  // source "Popup Form".
  popup: {
    enabled: true,
    delaySeconds: 25,
    exitIntent: true,
    repeatAfterDays: 7,
    hideOnPaths: ["/contact"],
    eyebrow: "Free consultation",
    heading: "Not sure where to",
    accent: "start?",
    body:
      "Tell us what you're working on — infrastructure, security, a platform or your team's skills — and we'll come back with the right starting point. No obligation.",
    image: IMG.meeting,
    serviceLabel: "What do you need help with?",
    serviceOptions: [
      "Cybersecurity",
      "IT Infrastructure",
      "Cloud & Virtualization",
      "Web & Software",
      "Managed IT",
      "Training",
    ],
    submitLabel: "Request a Callback",
    privacyNote: "No obligation · No spam",
    successHeading: "Request received",
    successBody: "Thanks — a member of our team will be in touch within one business day.",
  },

  footer: {
    tagline: "Building resilient digital infrastructure. Protecting critical digital assets. Developing the skills that will shape Africa's digital future.",
    columns: [
      {
        id: id(),
        title: "Solutions",
        links: SOLUTIONS_NAV.map((l) => ({ id: id(), ...l })),
      },
      {
        id: id(),
        title: "Company",
        links: [
          { id: id(), label: "About Us", href: "/about" },
          { id: id(), label: "Industries", href: "/industries" },
          { id: id(), label: "Insights", href: "/insights" },
          { id: id(), label: "Contact", href: "/contact" },
        ],
      },
      {
        id: id(),
        title: "Headquarters",
        links: [
          { id: id(), label: "N'Djamena, Republic of Chad", href: "/contact" },
          { id: id(), label: "+235 60 20 20 84", href: "tel:+235602020084" },
          { id: id(), label: "CybernaNet@gmail.com", href: "mailto:CybernaNet@gmail.com" },
        ],
      },
    ],
    social: [],
    copyright: `© ${new Date().getFullYear()} CybernaNet. All rights reserved.`,
  },

  pages: {
    home: {
      seo: {
        title: "CybernaNet — Innovate. Secure. Transform.",
        description:
          "CybernaNet helps organizations build, secure and transform their digital environments through integrated technology solutions, cybersecurity, infrastructure engineering, software development and professional training.",
      },
      sections: [
        section("heroHome", 0, {
          eyebrow: "Technology · Security · Expertise",
          slides: [
            {
              id: id(),
              image: IMG.heroCode,
              navLabel: "Transform",
              headingLine1: "Innovate. Secure.",
              headingHighlight: "Transform.",
              subtext:
                "Technology that works for your business. Security that works around the clock. CybernaNet helps organizations build, secure and transform their digital environments.",
              primaryLabel: "Explore Our Solutions",
              primaryHref: "/solutions",
              secondaryLabel: "Talk to an Expert",
              secondaryHref: "/contact",
            },
            {
              id: id(),
              image: IMG.cyber,
              navLabel: "Security",
              headingLine1: "Security around",
              headingHighlight: "the clock.",
              subtext:
                "Proactive assessments, security architecture, monitoring and incident response — protecting your systems, identities and data against evolving cyber threats.",
              primaryLabel: "Explore Cybersecurity",
              primaryHref: "/solutions/cybersecurity",
              secondaryLabel: "Request an Assessment",
              secondaryHref: "/contact",
            },
            {
              id: id(),
              image: IMG.dataCenter,
              navLabel: "Infrastructure",
              headingLine1: "Infrastructure that",
              headingHighlight: "never sleeps.",
              subtext:
                "Reliable enterprise networks, servers, cloud and data-center environments — engineered for performance, resilience and business continuity.",
              primaryLabel: "Explore Infrastructure",
              primaryHref: "/solutions/network-infrastructure",
              secondaryLabel: "Talk to an Expert",
              secondaryHref: "/contact",
            },
            {
              id: id(),
              image: IMG.training,
              navLabel: "Skills",
              headingLine1: "Build skills that",
              headingHighlight: "open doors.",
              subtext:
                "Practical technology training and internationally recognized certification pathways — for teams that would rather prevent problems than fix them.",
              primaryLabel: "Explore Training",
              primaryHref: "/solutions/training-certifications",
              secondaryLabel: "Request Corporate Training",
              secondaryHref: "/contact",
            },
          ],
          stats: [
            { value: "360°", label: "Integrated approach" },
            { value: "24/7", label: "Monitoring & support" },
            { value: "8+", label: "Technology capabilities" },
            { value: "10+", label: "Certification tracks" },
          ],
        }),

        section("marquee", 1, {
          items: [
            "Cybersecurity",
            "Network Engineering",
            "Cloud & Hybrid",
            "Software Development",
            "Managed IT",
            "Digital Transformation",
            "Data, AI & Automation",
            "Training & Certifications",
          ],
          speed: 38,
        }),

        section("tabbedPillars", 2, {
          kicker: "Technology. Security. Expertise.",
          heading: "Four capabilities, one",
          accent: "integrated approach",
          intro:
            "Digital transformation creates enormous opportunities, but it also creates new risks and operational challenges. Cyberattacks are becoming more sophisticated, IT infrastructure more complex, and skilled technology professionals more important. CybernaNet brings these requirements together.",
          pillars: [
            {
              id: id(),
              title: "Build",
              lens: "Infrastructure",
              image: IMG.serverRoom,
              heading: "Design reliable networks, infrastructure and digital platforms",
              body:
                "Enterprise networks, servers, cloud environments and the digital platforms that run on top of them — architected around how your organization actually operates.",
              points: [
                "Enterprise networks, Wi-Fi and structured cabling",
                "Servers, storage, virtualization and data centers",
                "Cloud and hybrid environments across AWS, Azure and Google Cloud",
                "Websites, portals and business applications",
              ],
              ctaLabel: "Explore Infrastructure",
              ctaHref: "/solutions/network-infrastructure",
            },
            {
              id: id(),
              title: "Secure",
              lens: "Cybersecurity",
              image: IMG.lock,
              heading: "Protect systems, data, identities and critical infrastructure",
              body:
                "Security is not a product you install at the end. We assess exposure, deploy the right controls, improve visibility and stand behind you when something happens.",
              points: [
                "Security audits, risk and vulnerability assessment",
                "Penetration testing and security architecture",
                "IAM, multi-factor authentication and endpoint protection",
                "Incident, ransomware and data-breach response",
              ],
              ctaLabel: "Explore Cybersecurity",
              ctaHref: "/solutions/cybersecurity",
            },
            {
              id: id(),
              title: "Transform",
              lens: "Modernization",
              image: IMG.automation,
              heading: "Modernize operations through software, cloud and automation",
              body:
                "Turning technology into a business advantage — with a roadmap that connects your objectives to the systems, data and automation that deliver them.",
              points: [
                "IT assessments, audits and technology roadmaps",
                "Digital transformation strategy and architecture",
                "Process and workflow automation",
                "Data analysis, business intelligence and AI applications",
              ],
              ctaLabel: "Explore Consulting",
              ctaHref: "/solutions/it-consulting",
            },
            {
              id: id(),
              title: "Develop",
              lens: "People",
              image: IMG.training,
              heading: "Strengthen internal capabilities through practical training",
              body:
                "Technology works better when your own people can run it. We build technical capability through hands-on, internationally aligned training and certification pathways.",
              points: [
                "Cisco, CompTIA, EC-Council and Fortinet certification tracks",
                "Practical labs and real-world scenarios",
                "In-person, online, distance and e-learning formats",
                "Corporate programs built around your skill gaps",
              ],
              ctaLabel: "Explore Training",
              ctaHref: "/solutions/training-certifications",
            },
          ],
        }),

        section("iconGrid", 3, {
          tag: "What we do",
          heading: "One partner. Multiple technology",
          accent: "capabilities.",
          cards: [
            { id: id(), title: "Cybersecurity", description: "Protect your systems, networks, identities and data with proactive security assessments, security architecture, penetration testing, monitoring and incident response.", href: "/solutions/cybersecurity" },
            { id: id(), title: "Network & IT Infrastructure", description: "Design and implement reliable enterprise networks, servers, Wi-Fi, data centers, virtualization and business continuity environments.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Cloud & Hybrid Infrastructure", description: "Build scalable cloud and hybrid environments while maintaining security, performance and operational control.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Web & Software Development", description: "Create secure, scalable websites, e-commerce platforms, SaaS applications, customer portals and business applications.", href: "/solutions/software-development" },
            { id: id(), title: "Managed IT Services", description: "Keep your technology environment operational through technical support, maintenance, monitoring and managed IT services.", href: "/solutions/managed-it" },
            { id: id(), title: "Consulting & Digital Transformation", description: "Turn technology into a business advantage through IT strategy, digital transformation and technology advisory.", href: "/solutions/it-consulting" },
            { id: id(), title: "Data, AI & Automation", description: "Use data, automation and emerging technologies to improve efficiency, decision-making and business performance.", href: "/solutions" },
            { id: id(), title: "Training & Certifications", description: "Develop practical technology capabilities through professional training and globally recognized certification pathways.", href: "/solutions/training-certifications" },
          ],
          cta: { label: "View All Solutions", href: "/solutions" },
        }),

        section("featureSplit", 4, {
          eyebrow: "Our Approach",
          heading: "Security should never be",
          accent: "an afterthought",
          badge: "Infrastructure · Applications · Security · People",
          body: [
            "A website can be developed by one company, hosted by another and secured by someone else. Your business should not have to work that way.",
            "We don't simply develop your digital platform — we consider the infrastructure behind it. We don't simply install a network — we consider how it should be protected. We don't simply identify a vulnerability — we help you understand how to address it. And we don't simply fix technology problems — we help your teams understand how to prevent them.",
          ],
          bullets: ["Infrastructure", "Applications", "Cybersecurity", "People"],
          image: IMG.cables,
          imageSide: "right",
          cta: { label: "See How We Work", href: "/about" },
        }),

        section("statsBand", 5, {
          kicker: "By the numbers",
          heading: "Because technology works better when",
          accent: "everything works together",
          stats: [
            { value: "360°", label: "Infrastructure, applications, security and people under one roof" },
            { value: "24/7", label: "Monitoring, technical support and managed IT" },
            { value: "8", label: "Integrated technology capabilities" },
            { value: "10+", label: "Internationally recognized certification tracks" },
          ],
          footnote: "One accountable partner across the whole stack.",
        }),

        section("iconGrid", 6, {
          tag: "Built around your business",
          heading: "Every organization has different",
          accent: "technology requirements",
          intro:
            "CybernaNet designs solutions around your objectives, environment, risk profile and growth plans.",
          cards: [
            { id: id(), title: "Financial Institutions", description: "Need strong security and resilience — cybersecurity, identity and access management, business continuity and disaster recovery.", href: "/industries" },
            { id: id(), title: "Growing Businesses", description: "Need scalable infrastructure — enterprise-grade technology without building a large internal IT department.", href: "/industries" },
            { id: id(), title: "Government Institutions", description: "Need secure and reliable systems — infrastructure security, secure applications, data protection and training.", href: "/industries" },
            { id: id(), title: "Startups", description: "Need technology that can grow with the business — scalable foundations established from the beginning.", href: "/industries" },
          ],
          cta: { label: "Explore Industries", href: "/industries" },
        }),

        section("processSteps", 7, {
          kicker: "How it works",
          heading: "From challenge",
          accent: "to solution",
          steps: [
            { id: id(), title: "Understand", description: "We assess your business, technology environment and objectives." },
            { id: id(), title: "Design", description: "We develop the right technology architecture and implementation roadmap." },
            { id: id(), title: "Implement", description: "Our teams deploy and integrate the required solutions." },
            { id: id(), title: "Secure", description: "Security is embedded across infrastructure, applications, systems and access." },
            { id: id(), title: "Support", description: "We provide maintenance, technical support and ongoing optimization." },
            { id: id(), title: "Develop", description: "We strengthen your internal capabilities through knowledge transfer and training." },
          ],
        }),

        section("logoStrip", 8, {
          heading: "Technologies and certification bodies we work across",
          logos: [
            { id: id(), name: "Cisco" },
            { id: id(), name: "Fortinet" },
            { id: id(), name: "CompTIA" },
            { id: id(), name: "EC-Council" },
            { id: id(), name: "Microsoft Azure" },
            { id: id(), name: "AWS" },
            { id: id(), name: "Google Cloud" },
            { id: id(), name: "VMware" },
          ],
        }),

        section("ctaBanner", 9, {
          kicker: "Our regional vision",
          heading: "Building a more secure",
          accent: "digital Africa",
          subtext:
            "Digital transformation is not only about adopting technology. It is about building the infrastructure, security and human capabilities required to use that technology effectively.",
          buttons: [
            // Scrolls to the form below rather than sending the visitor to
            // another page for something they can do right here.
            { label: "Start a Conversation", href: "#contact" },
            { label: "Request a Consultation", href: "/contact" },
          ],
        }),

        section("contact", 10, {
          tag: "Get in touch",
          heading: "Tell us what you're",
          accent: "working on",
          subheading:
            "Whether you need to secure your infrastructure, build a digital platform, modernize your IT environment or develop your team's technical capabilities — describe the challenge and our team will help identify the right starting point.",
          formHeading: "Start a conversation",
          serviceLabel: "What can we help you with?",
          submitLabel: "Send Request",
          responseNote: "N'Djamena · Response within one business day",
          privacyNote: "No obligation · No spam",
          companyEmail: "CybernaNet@gmail.com",
          companyPhone: "+235 60 20 20 84",
          companyAddress: "CybernaNet, N'Djamena, Republic of Chad",
          serviceOptions: [
            "Cybersecurity",
            "IT Infrastructure",
            "Network Solutions",
            "Cloud & Virtualization",
            "Web Development",
            "Software Development",
            "Managed IT Services",
            "Digital Transformation",
            "IT Consulting",
            "Training & Certifications",
            "AI & Automation",
            "Other",
          ],
        }),
      ],
    },

    about: {
      seo: {
        title: "About Us — CybernaNet",
        description:
          "CybernaNet is a technology and digital services company specializing in cybersecurity, IT infrastructure, software development, digital transformation and professional technology training, based in N'Djamena, Chad.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "About CybernaNet",
          heading: "Accelerating digital transformation. Strengthening security.",
          accent: "Developing skills.",
          subtext:
            "A technology and digital services company specializing in cybersecurity, IT infrastructure, software development, digital transformation and professional training — supporting businesses, public institutions, startups and organizations from N'Djamena, Chad.",
          image: IMG.meeting,
        }),

        section("featureSplit", 1, {
          eyebrow: "Why CybernaNet exists",
          heading: "Bringing technology, security and",
          accent: "people together",
          badge: "Founded to close the gap",
          body: [
            "Technology has become fundamental to how organizations operate. But digital adoption also creates new challenges. Cyber threats continue to evolve. IT environments are becoming more complex. Businesses increasingly depend on digital platforms. Cloud and hybrid infrastructure are changing how systems are deployed.",
            "And organizations need people with the right technical skills to manage all of it. CybernaNet was created to bring these capabilities together.",
          ],
          bullets: ["We Build", "We Secure", "We Transform", "We Develop"],
          image: IMG.team,
          imageSide: "left",
          cta: { label: "Explore Our Solutions", href: "/solutions" },
        }),

        section("tabbedPillars", 2, {
          kicker: "Our 360° approach",
          heading: "Technology does not operate",
          accent: "in silos",
          intro:
            "Your application depends on infrastructure. Your infrastructure depends on networks. Your network depends on security. And all of it depends on people. That is why CybernaNet takes a 360° approach.",
          pillars: [
            {
              id: id(),
              title: "We Build",
              lens: "Infrastructure",
              image: IMG.serverRoom,
              heading: "Technology infrastructure designed around your operational requirements",
              body:
                "Networks, servers, cloud and the digital platforms that run on them — built for the way your organization actually works, not a reference architecture.",
              points: ["Enterprise networks and connectivity", "Servers, storage and virtualization", "Cloud and hybrid environments", "Websites, portals and applications"],
            },
            {
              id: id(),
              title: "We Secure",
              lens: "Protection",
              image: IMG.lock,
              heading: "Security solutions designed to protect your systems, data and digital assets",
              body:
                "From assessment through architecture to incident response — security treated as an ongoing discipline rather than a one-off project.",
              points: ["Security audits and risk assessment", "Security architecture and hardening", "Identity, access and endpoint protection", "Incident and breach response"],
            },
            {
              id: id(),
              title: "We Transform",
              lens: "Modernization",
              image: IMG.automation,
              heading: "Digital technologies that improve how your organization operates",
              body:
                "Strategy that connects business objectives to technical decisions — and teams that can actually implement what they recommend.",
              points: ["IT assessments and technology audits", "Digital transformation roadmaps", "Automation and workflow improvement", "Data, business intelligence and AI"],
            },
            {
              id: id(),
              title: "We Develop",
              lens: "People",
              image: IMG.training,
              heading: "People and technical capabilities that help organizations become self-sufficient",
              body:
                "Knowledge transfer is part of the engagement, not an upsell. Your team should be able to run what we build together.",
              points: ["Internationally recognized certification tracks", "Practical labs and real-world scenarios", "Corporate and team training programs", "Ongoing knowledge transfer"],
            },
          ],
        }),

        section("iconGrid", 3, {
          tag: "Mission & vision",
          heading: "Where we are going, and",
          accent: "why",
          cards: [
            { id: id(), title: "Our Mission", description: "To design, integrate and secure innovative technology solutions that help organizations improve performance, protect their digital assets and accelerate digital transformation, while developing the technical capabilities of the next generation." },
            { id: id(), title: "Our Vision", description: "To become a trusted technology and cybersecurity partner in Africa, recognized for technical excellence, innovation, security, quality of service and contribution to a stronger digital ecosystem." },
          ],
        }),

        section("commitments", 4, {
          kicker: "The CybernaNet promise",
          heading: "We don't believe technology should make business",
          accent: "more complicated",
          intro:
            "Our role is to simplify it. We bring together the people, technology, security and expertise required to help organizations move forward with confidence — and these are the values we do not trade away to win work.",
          metrics: [
            { value: "360°", label: "Infrastructure, applications, security and people" },
            { value: "24/7", label: "Monitoring and technical support" },
            { value: "8", label: "Integrated technology capabilities" },
            { value: "10+", label: "Certification pathways delivered" },
          ],
          rules: [
            "Integrity",
            "Excellence",
            "Security",
            "Innovation",
            "Collaboration",
            "Education",
            "Responsibility",
            "Client Success",
          ],
        }),

        section("timeline", 5, {
          kicker: "Our roadmap",
          heading: "Building a stronger digital ecosystem,",
          accent: "one horizon at a time",
          intro:
            "Digital transformation is not only about adopting technology. It is about building the infrastructure, security and human capabilities required to use that technology effectively.",
          phases: [
            {
              id: id(),
              year: "Today",
              label: "Foundation",
              title: "Secure the systems organizations already depend on",
              description:
                "Assessments, security architecture, network and infrastructure engineering for businesses, public institutions and startups across Chad — with managed support behind everything we deploy.",
              stats: [
                { value: "8", label: "Capabilities in service" },
                { value: "24/7", label: "Support coverage" },
                { value: "360°", label: "Delivery model" },
              ],
            },
            {
              id: id(),
              year: "Next",
              label: "Capability",
              title: "Grow the regional pool of certified technology professionals",
              description:
                "Expanding practical training and internationally recognized certification pathways so organizations can staff, run and defend their own environments — in-person, online and through corporate programs.",
              stats: [
                { value: "10+", label: "Certification tracks" },
                { value: "4", label: "Training formats" },
                { value: "100%", label: "Hands-on lab based" },
              ],
            },
            {
              id: id(),
              year: "Vision",
              label: "Ecosystem",
              title: "A stronger, more secure and more capable digital Africa",
              description:
                "Contributing to a regional digital ecosystem where infrastructure is resilient by default, security is designed in from the start, and the skills to sustain both are locally held.",
            },
          ],
          footnote: "Innovate. Secure. Transform.",
        }),

        section("textIntro", 6, {
          subheading: "Our headquarters",
          heading: "CybernaNet | N'Djamena | Republic of Chad",
          paragraphs: [
            "We work with businesses, public institutions, startups and international organizations across the region — on site, remotely and through managed engagements.",
            "Phone: +235 60 20 20 84",
            "Email: CybernaNet@gmail.com",
          ],
          ctas: [{ label: "Talk to an Expert", href: "/contact" }],
        }),

        section("ctaBanner", 7, {
          kicker: "Let's talk",
          heading: "Let's build",
          accent: "what's next",
          subtext:
            "Tell us what you're working on. Our team will help identify the right starting point.",
          buttons: [{ label: "Talk to an Expert", href: "/contact" }],
        }),
      ],
    },

    solutions: {
      seo: {
        title: "Solutions — CybernaNet",
        description: "CybernaNet provides integrated technology services across cybersecurity, infrastructure, software, cloud, managed IT and professional training.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Solutions",
          heading: "Technology solutions built around",
          accent: "your business",
          subtext: "Integrated technology services across cybersecurity, infrastructure, software, cloud, managed IT and professional training.",
          image: IMG.earthNet,
        }),
        section("featureSplit", 1, {
          eyebrow: "Technology. Security. Expertise.",
          heading: "An integrated approach to",
          accent: "digital transformation",
          body: [
            "Digital transformation creates enormous opportunities, but it also creates new risks and operational challenges. Cyberattacks grow more sophisticated and infrastructure grows more complex.",
            "CybernaNet brings these requirements together so you get one accountable partner across the whole stack.",
          ],
          bullets: ["Build", "Secure", "Transform", "Develop"],
          image: IMG.abstractAi,
          imageSide: "right",
        }),
        section("iconGrid", 2, {
          tag: "The full stack",
          heading: "Every solution,",
          accent: "in depth",
          cards: [
            { id: id(), title: "Cybersecurity", description: "Protect What Keeps Your Business Running. Security audits, risk & vulnerability assessment, penetration testing, security architecture, EDR, IDS/IPS, MFA, IAM, incident and ransomware response, and awareness.", href: "/solutions/cybersecurity" },
            { id: id(), title: "Network & IT Infrastructure", description: "Infrastructure Designed for Performance and Resilience. LAN/WAN/VLAN, enterprise Wi-Fi, structured cabling, servers, storage, data centers, virtualization, high-availability, IP telephony and disaster recovery.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Cloud & Hybrid Infrastructure", description: "Scale Without Losing Control. Cloud readiness, migration, hybrid infrastructure, cloud security, backup and recovery across AWS, Microsoft Azure and Google Cloud.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Web & Software Development", description: "Digital Platforms Built for Business. Websites, e-commerce, custom web apps, SaaS platforms, customer portals, mobile apps, API integration, maintenance and SEO.", href: "/solutions/software-development" },
            { id: id(), title: "Managed IT Services", description: "Technology Support Without the Headache. IT support, preventive maintenance, monitoring, system & network administration, asset management and optimization.", href: "/solutions/managed-it" },
            { id: id(), title: "IT Consulting & Digital Transformation", description: "Turn Technology Into a Business Advantage. IT assessments, audits, transformation strategy, roadmaps, architecture, project management and modernization.", href: "/solutions/it-consulting" },
            { id: id(), title: "Data, AI & Automation", description: "Make Your Technology Work Smarter. Data analysis, business intelligence, process & workflow automation, AI applications and data-driven decision support.", href: "/solutions" },
            { id: id(), title: "Training & Certifications", description: "Build Skills. Build Confidence. Build Careers. Practical technology training and internationally recognized certification pathways.", href: "/solutions/training-certifications" },
          ],
        }),
        section("marquee", 3, {
          items: [
            "Security audits",
            "Penetration testing",
            "Network architecture",
            "Cloud migration",
            "SaaS platforms",
            "Managed IT",
            "IT roadmaps",
            "Process automation",
            "Certification training",
          ],
          speed: 40,
        }),
        section("ctaBanner", 4, {
          kicker: "Next step",
          heading: "Not sure where to",
          accent: "start?",
          subtext: "Tell us what you're working on — our team will help identify the right starting point.",
          buttons: [{ label: "Talk to an Expert", href: "/contact" }],
        }),
      ],
    },

    cybersecurity: {
      seo: {
        title: "Cybersecurity — CybernaNet",
        description: "Proactive security assessments, security architecture, penetration testing, monitoring and incident response from CybernaNet.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Cybersecurity",
          heading: "Protect your business before threats become",
          accent: "incidents.",
          subtext: "Cybersecurity is no longer an IT issue alone — it is a business continuity, financial, reputation and leadership issue.",
          image: IMG.cyber,
        }),
        section("featureSplit", 1, {
          eyebrow: "Why it matters",
          heading: "Security is a business decision, not just",
          accent: "a technical one",
          body: [
            "CybernaNet helps organizations understand their exposure, strengthen their defenses and respond when threats occur.",
            "We approach security as a continuous process — assess, protect, detect, respond and recover.",
          ],
          bullets: ["Reduce risk exposure", "Protect critical data", "Improve visibility", "Respond faster"],
          image: IMG.circuit,
          imageSide: "right",
          cta: { label: "Request a Security Assessment", href: "/contact" },
        }),
        section("processSteps", 2, {
          kicker: "The security lifecycle",
          heading: "Assess. Protect. Detect. Respond.",
          accent: "Recover.",
          steps: [
            { id: id(), title: "Assess", description: "Identify vulnerabilities, risks and weaknesses across your technology environment." },
            { id: id(), title: "Protect", description: "Deploy security controls designed around your infrastructure and risk profile." },
            { id: id(), title: "Detect", description: "Improve visibility into suspicious activities and potential threats." },
            { id: id(), title: "Respond", description: "Act quickly when a security incident occurs." },
            { id: id(), title: "Recover", description: "Restore operations and strengthen defenses to reduce the likelihood of recurrence." },
          ],
        }),
        section("valueList", 3, {
          kicker: "Services",
          heading: "Our cybersecurity",
          accent: "services",
          items: ["Security Audit & Risk Assessment", "Penetration Testing", "Infrastructure Protection", "Identity & Access Management", "Multi-Factor Authentication", "Security Architecture", "Incident Response", "Security Awareness", "Firewall Deployment & Configuration", "EDR & Endpoint Protection", "IDS / IPS", "Security Policies & Governance", "Ransomware Response", "Data Breach Response"],
        }),
        section("commitments", 4, {
          kicker: "Security is a continuous process",
          heading: "A secure environment today can become",
          accent: "vulnerable tomorrow",
          intro:
            "CybernaNet therefore approaches cybersecurity as an ongoing process of assessment, improvement, monitoring and education — not a project with a finish line.",
          metrics: [
            { value: "5", label: "Stages: assess, protect, detect, respond, recover" },
            { value: "24/7", label: "Monitoring and incident response readiness" },
            { value: "14", label: "Cybersecurity services in the catalogue" },
            { value: "360°", label: "Coverage across infrastructure, apps and people" },
          ],
          rules: [
            "Assess before you spend — exposure first, tooling second",
            "Security controls designed around your risk profile, not a template",
            "Visibility into suspicious activity, not just prevention",
            "A defined response path before an incident happens",
            "Awareness training so people stop being the weakest control",
          ],
        }),
        section("ctaBanner", 5, {
          kicker: "Get started",
          heading: "Ready to strengthen your",
          accent: "security posture?",
          buttons: [{ label: "Request a Security Assessment", href: "/contact" }],
        }),
      ],
    },

    "network-infrastructure": {
      seo: {
        title: "Network & IT Infrastructure — CybernaNet",
        description: "CybernaNet designs, implements and supports network and IT environments that help organizations operate efficiently, securely and continuously.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Network & IT Infrastructure",
          heading: "The infrastructure behind your",
          accent: "digital business.",
          subtext: "Reliable technology begins with reliable infrastructure — designed, implemented and supported to run efficiently, securely and continuously.",
          image: IMG.serverRoom,
        }),
        section("featureSplit", 1, {
          eyebrow: "Resilience by design",
          heading: "Infrastructure engineered for performance",
          accent: "and continuity",
          badge: "Designed · Implemented · Supported",
          body: [
            "From enterprise networks to data centers and virtualization, we build environments that stay fast, available and secure.",
            "A technology failure should never become a business failure — resilience is built in from day one.",
          ],
          bullets: ["Enterprise networking", "Servers & storage", "Virtualization", "Disaster recovery"],
          image: IMG.dataCenter,
          imageSide: "left",
          cta: { label: "Assess Your Infrastructure", href: "/contact" },
        }),
        section("columnGroups", 2, {
          kicker: "What we design and run",
          heading: "From the cable to the",
          accent: "continuity plan",
          groups: [
            { id: id(), title: "Enterprise Network Solutions", items: ["LAN", "WAN", "VLAN", "Enterprise Wi-Fi", "Network security", "Routing and switching", "Structured cabling", "Remote connectivity", "VPN", "Network optimization"] },
            { id: id(), title: "Servers, Storage & Data Centers", items: ["Server infrastructure", "Storage systems", "Backup infrastructure", "Virtualization", "Data center design", "High availability", "Disaster recovery", "Business continuity"] },
            { id: id(), title: "Unified Communications", items: ["IP telephony", "Unified communications", "Enterprise connectivity", "Voice infrastructure"] },
            { id: id(), title: "Business Continuity & Disaster Recovery", intro: "A technology failure should not become a business failure.", items: ["Backup strategies", "Disaster recovery planning", "Recovery architecture", "Business continuity planning", "Infrastructure resilience"] },
          ],
        }),
        section("statsBand", 3, {
          kicker: "Why it matters",
          heading: "A technology failure should not become",
          accent: "a business failure",
          stats: [
            { value: "4", label: "Infrastructure disciplines under one team" },
            { value: "24/7", label: "Monitoring and technical support" },
            { value: "100%", label: "Deployments with a recovery plan" },
            { value: "360°", label: "Network, server, voice and continuity coverage" },
          ],
        }),
        section("ctaBanner", 4, {
          kicker: "Next step",
          heading: "Ready to strengthen your",
          accent: "infrastructure?",
          buttons: [{ label: "Assess Your Infrastructure", href: "/contact" }],
        }),
      ],
    },

    "software-development": {
      seo: {
        title: "Web & Software Development — CybernaNet",
        description: "CybernaNet develops websites and applications designed around real business requirements — secure, scalable and built for performance.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Web & Software Development",
          heading: "Build digital experiences that work as hard as",
          accent: "your business.",
          subtext: "A digital platform should combine performance, usability, security and scalability. We develop products designed around real business requirements.",
          image: IMG.code,
        }),
        section("featureSplit", 1, {
          eyebrow: "Built for business",
          heading: "Secure, scalable products —",
          accent: "engineered end to end",
          badge: "Security designed in from line one",
          body: [
            "From corporate websites and e-commerce to SaaS platforms, customer portals and mobile apps, we build for performance and growth.",
            "Security is designed in from the first line of code, not bolted on afterwards.",
          ],
          bullets: ["Secure authentication", "Access management", "Performance & scale", "Ongoing optimization"],
          image: IMG.team,
          imageSide: "right",
          cta: { label: "Start Your Digital Project", href: "/contact" },
        }),
        section("columnGroups", 2, {
          kicker: "What we build",
          heading: "Platforms, applications and the care",
          accent: "that keeps them fast",
          groups: [
            { id: id(), title: "Websites", items: ["Corporate websites", "Institutional websites", "Service websites", "E-commerce platforms", "Campaign websites", "Customer-facing platforms"] },
            { id: id(), title: "Custom Applications", items: ["SaaS platforms", "Customer portals", "Secure extranets", "Business applications", "Internal platforms", "Web-based management systems"] },
            { id: id(), title: "Mobile Applications", intro: "Extend your digital services to customers and teams through purpose-built mobile applications.", items: [] },
            { id: id(), title: "Security by Design", items: ["Secure authentication", "Access management", "Data protection", "Application security", "Secure infrastructure", "Performance", "Scalability"] },
            { id: id(), title: "Maintenance & Optimization", items: ["Technical maintenance", "Security updates", "Performance optimization", "Speed optimization", "SEO", "Application improvements", "Ongoing support"] },
          ],
        }),
        section("marquee", 3, {
          items: ["Corporate websites", "E-commerce", "SaaS platforms", "Customer portals", "Secure extranets", "Mobile applications", "API integration", "SEO & performance"],
          speed: 36,
        }),
        section("ctaBanner", 4, {
          kicker: "Start building",
          heading: "Have a project",
          accent: "in mind?",
          buttons: [{ label: "Start Your Digital Project", href: "/contact" }],
        }),
      ],
    },

    "it-consulting": {
      seo: {
        title: "IT Consulting & Digital Transformation — CybernaNet",
        description: "CybernaNet helps organizations make better technology decisions by connecting business objectives with technical strategy.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "IT Consulting & Digital Transformation",
          heading: "Don't invest in technology without",
          accent: "a strategy.",
          subtext: "We help organizations make better technology decisions by connecting business objectives with technical strategy.",
          image: IMG.meetingRoom,
        }),
        section("featureSplit", 1, {
          eyebrow: "Strategy to delivery",
          heading: "From recommendation to",
          accent: "real implementation",
          badge: "Assess · Plan · Implement · Secure · Support",
          body: [
            "Unlike advisory firms that stop at recommendations, CybernaNet can support the implementation of the solutions it designs.",
            "That's the difference between a technology recommendation and a technology partnership.",
          ],
          bullets: ["Assess", "Plan", "Implement", "Secure", "Support"],
          image: IMG.meeting,
          imageSide: "left",
          cta: { label: "Discuss Your Roadmap", href: "/contact" },
        }),
        section("columnGroups", 2, {
          kicker: "The engagement",
          heading: "Understand. Define.",
          accent: "Build the roadmap.",
          groups: [
            { id: id(), title: "Understand Where You Are.", items: ["IT infrastructure", "Network environment", "Cybersecurity posture", "Applications", "Cloud environment", "Operational processes", "Technical capabilities"] },
            { id: id(), title: "Define Where You Need to Go.", items: ["Technology priorities", "Digital transformation objectives", "Security requirements", "Infrastructure roadmap", "Implementation priorities", "Investment requirements"] },
            { id: id(), title: "Build the Roadmap.", items: ["IT assessments", "Technology audits", "Requirements analysis", "Solution architecture", "Digital transformation strategy", "Project planning", "Technology selection", "Implementation planning"] },
          ],
        }),
        section("textIntro", 3, {
          subheading: "Then make it happen",
          heading: "The difference between a technology recommendation and a technology partnership",
          paragraphs: [
            "Unlike advisory firms that stop at recommendations, CybernaNet can support the implementation of the solutions it designs.",
            "Technology decisions can have long-term operational and financial consequences. Connecting business objectives to technical strategy — and then standing behind delivery — is how those decisions stop being gambles.",
          ],
          flowSteps: ["Assess", "Plan", "Implement", "Secure", "Support"],
          ctas: [{ label: "Discuss Your Roadmap", href: "/contact" }],
        }),
        section("ctaBanner", 4, {
          kicker: "Let's talk",
          heading: "Discuss your technology",
          accent: "roadmap",
          buttons: [{ label: "Discuss Your Technology Roadmap", href: "/contact" }],
        }),
      ],
    },

    "managed-it": {
      seo: {
        title: "Managed IT Services — CybernaNet",
        description: "CybernaNet provides ongoing IT support and maintenance designed to keep your technology environment reliable, secure and operational.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Managed IT Services",
          heading: "Let your team focus on the business.",
          accent: "We'll keep technology running.",
          subtext: "Ongoing IT support and maintenance designed to keep your technology environment reliable, secure and operational.",
          image: IMG.dataCenter,
        }),
        section("featureSplit", 1, {
          eyebrow: "Always on",
          heading: "Prevent, monitor, respond, maintain",
          accent: "and improve",
          badge: "Proactive by default",
          body: [
            "Technology problems don't wait for convenient times. We keep your environment healthy so issues are resolved before they become operational problems.",
            "Predictable, proactive IT operations — backed by specialist expertise.",
          ],
          bullets: ["Reduce downtime", "Improve reliability", "Strengthen security", "Predictable operations"],
          image: IMG.serverRoom,
          imageSide: "right",
          cta: { label: "Discuss Managed IT", href: "/contact" },
        }),
        section("valueList", 2, {
          kicker: "Scope",
          heading: "What we",
          accent: "manage",
          items: ["IT infrastructure", "Networks", "Servers", "Systems", "Endpoints", "Applications", "Backup environments", "Security systems", "IT assets"],
        }),
        section("processSteps", 3, {
          kicker: "Support model",
          heading: "How we keep it",
          accent: "running",
          steps: [
            { id: id(), title: "Prevent", description: "Identify issues before they become operational problems." },
            { id: id(), title: "Monitor", description: "Maintain visibility across your technology environment." },
            { id: id(), title: "Respond", description: "Resolve technical issues efficiently." },
            { id: id(), title: "Maintain", description: "Keep systems updated and operational." },
            { id: id(), title: "Improve", description: "Continuously identify opportunities for optimization." },
          ],
        }),
        section("commitments", 4, {
          kicker: "Why managed IT",
          heading: "Technology problems don't wait for",
          accent: "convenient times",
          intro:
            "A managed environment is a predictable one — fewer surprises, faster resolution, and less pressure on the people who have other work to do.",
          metrics: [
            { value: "24/7", label: "Infrastructure monitoring and support" },
            { value: "9", label: "Layers managed, from network to IT assets" },
            { value: "5", label: "Stage support model" },
            { value: "360°", label: "Coverage across your environment" },
          ],
          rules: [
            "Reduce technology downtime",
            "Improve system reliability",
            "Strengthen security",
            "Control IT operations",
            "Access specialist expertise",
            "Reduce pressure on internal teams",
            "Create a more predictable IT environment",
          ],
        }),
        section("ctaBanner", 5, {
          kicker: "Get started",
          heading: "Let's talk",
          accent: "managed IT",
          buttons: [{ label: "Discuss Managed IT", href: "/contact" }],
        }),
      ],
    },

    "training-certifications": {
      seo: {
        title: "Training & Certifications — CybernaNet",
        description: "Practical technology training and internationally recognized certification pathways from CybernaNet.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Training & Certifications",
          heading: "Build skills that",
          accent: "open doors.",
          subtext:
            "Technology evolves rapidly. Organizations need skilled professionals. Professionals need relevant expertise. Students need practical experience. CybernaNet provides practical technology training for businesses, institutions and individuals.",
          image: IMG.training,
        }),

        section("featureSplit", 1, {
          eyebrow: "More than classroom learning",
          heading: "Hands-on training built around",
          accent: "real-world scenarios",
          badge: "Theory · Labs · Scenarios · Certification",
          body: [
            "Theory alone does not create capability. Every program combines instruction with practical labs, real-world scenarios, certification preparation and personalized guidance.",
            "Delivered in person, online instructor-led, through distance learning and e-learning, or as corporate training tailored to your environment.",
          ],
          bullets: ["Theory", "Practical labs", "Real-world scenarios", "Certification preparation"],
          image: IMG.code,
          imageSide: "left",
          cta: { label: "Explore Training Programs", href: "/contact" },
        }),

        section("showcaseCarousel", 2, {
          kicker: "Certification programs",
          heading: "Internationally recognized",
          accent: "certification pathways",
          intro:
            "Each track combines instructor-led teaching, hands-on labs and exam preparation — for individuals building a career and for teams closing a specific skills gap.",
          items: [
            { id: id(), title: "Cisco Certified Network Associate", metric: "CCNA 200-301", description: "Routing, switching, IP connectivity, network access, security fundamentals and automation — the foundation of enterprise networking.", image: IMG.network },
            { id: id(), title: "CompTIA Server+", metric: "Server administration", description: "Server hardware, administration, storage, security, disaster recovery and troubleshooting across on-premise and hybrid environments.", image: IMG.serverRoom },
            { id: id(), title: "CompTIA Security+", metric: "Security fundamentals", description: "Threats and vulnerabilities, architecture, implementation, operations, incident response, governance and risk.", image: IMG.lock },
            { id: id(), title: "CompTIA PenTest+", metric: "Offensive security", description: "Planning and scoping, information gathering, attacks and exploits, reporting and communication for penetration testers.", image: IMG.circuit },
            { id: id(), title: "Certified Ethical Hacker", metric: "CEH · EC-Council", description: "Ethical hacking methodology, reconnaissance, system hacking, web application attacks and countermeasures.", image: IMG.cyber },
            { id: id(), title: "EC-Council Certified SOC Analyst", metric: "CSA · Blue team", description: "Security operations, log management, SIEM deployment, incident detection and response as a Tier I/II SOC analyst.", image: IMG.monitor },
            { id: id(), title: "Fortinet Certified Associate", metric: "FCA", description: "Entry-level Fortinet security fundamentals — the first step on the Fortinet certification ladder.", image: IMG.dataCenter },
            { id: id(), title: "Fortinet Certified Professional", metric: "FCP", description: "Deploying, configuring and operating Fortinet network security solutions in production environments.", image: IMG.cables },
            { id: id(), title: "Fortinet Certified Solution Specialist", metric: "FCSS", description: "Advanced design and operation of Fortinet security fabric solutions across complex infrastructures.", image: IMG.circuit },
            { id: id(), title: "Fortinet Certified Expert", metric: "FCX", description: "Expert-level architecture and troubleshooting across the full Fortinet security portfolio.", image: IMG.abstractAi },
          ],
        }),

        section("valueList", 3, {
          kicker: "Delivery",
          heading: "Training",
          accent: "formats",
          subheading: "Pick the format that fits how your people actually learn and work.",
          items: ["In-person training", "Online instructor-led training", "Distance learning", "E-learning", "Corporate training"],
        }),

        section("featureSplit", 4, {
          eyebrow: "Training for organizations",
          heading: "Upskill your technology teams around",
          accent: "your real gaps",
          badge: "Built around your environment",
          body: [
            "Corporate programs are shaped around your cybersecurity requirements, network environments, systems architecture, IT policies, technical skill gaps and certification objectives.",
            "The result is a team that can run and defend the environment you already have — not a generic syllabus.",
          ],
          bullets: ["Cybersecurity requirements", "Network environments", "Systems architecture", "Certification objectives"],
          image: IMG.people,
          imageSide: "right",
          cta: { label: "Request Corporate Training", href: "/contact" },
        }),

        section("logoStrip", 5, {
          heading: "Certification bodies we prepare candidates for",
          logos: [
            { id: id(), name: "Cisco" },
            { id: id(), name: "CompTIA" },
            { id: id(), name: "EC-Council" },
            { id: id(), name: "Fortinet" },
          ],
          speed: 30,
        }),

        section("ctaBanner", 6, {
          kicker: "Start learning",
          heading: "Build skills. Build confidence.",
          accent: "Build careers.",
          subtext:
            "Whether you are an individual pursuing certification or an organization closing a team-wide skills gap, we will map the right pathway.",
          buttons: [
            { label: "Explore Training Programs", href: "/contact" },
            { label: "Request Corporate Training", href: "/contact" },
          ],
        }),
      ],
    },

    industries: {
      seo: {
        title: "Industries — CybernaNet",
        description: "CybernaNet combines technical expertise with an understanding of the operational and security requirements of different industries.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Industries",
          heading: "Technology solutions built around",
          accent: "your industry.",
          subtext: "Different industries face different challenges. We combine technical expertise with an understanding of the operational and security requirements of each.",
          image: IMG.meetingRoom,
        }),
        section("featureSplit", 1, {
          eyebrow: "Built around you",
          heading: "One technology partner,",
          accent: "many business needs",
          badge: "Build · Reduce risk · Improve · Grow",
          body: [
            "From financial services and government to startups and industrial organizations, we design solutions around your objectives, environment, risk profile and growth plans.",
            "Whatever your industry, the objective stays the same: build reliable technology, reduce risk, improve performance and enable growth.",
          ],
          bullets: ["Financial services", "Government", "SMEs & startups", "Industrial"],
          image: IMG.meeting,
          imageSide: "right",
        }),
        section("iconGrid", 2, {
          tag: "Sectors",
          heading: "Different industries face different",
          accent: "technology challenges",
          cards: [
            { id: id(), title: "Financial Services", description: "Security, availability and trust are critical. We support financial organizations with cybersecurity, network infrastructure, IAM, business continuity, disaster recovery, secure platforms and IT consulting." },
            { id: id(), title: "Government & Public Institutions", description: "Public institutions manage sensitive information and essential services. We build secure, resilient environments through infrastructure security, network solutions, assessments, secure applications and training." },
            { id: id(), title: "SMEs & Mid-Sized Businesses", description: "Enterprise-grade technology without a large internal IT department — flexible support across infrastructure, cybersecurity, cloud, websites, applications and managed IT." },
            { id: id(), title: "Startups", description: "Technology should enable growth, not slow it down. We help startups establish scalable technology foundations from the beginning." },
            { id: id(), title: "International Organizations", description: "We support organizations requiring structured, secure and reliable technology environments." },
            { id: id(), title: "Industrial Organizations", description: "Modern industrial operations depend on connected infrastructure, data and digital systems — supported with infrastructure, cybersecurity, networking, automation and transformation." },
          ],
        }),
        section("statsBand", 3, {
          kicker: "The objective stays the same",
          heading: "Whatever your industry",
          accent: "the goal is constant",
          stats: [
            { value: "6", label: "Sectors served across the region" },
            { value: "8", label: "Technology capabilities available to each" },
            { value: "24/7", label: "Support and monitoring" },
            { value: "360°", label: "Infrastructure, applications, security and people" },
          ],
          footnote: "Build reliable technology. Reduce risk. Improve performance. Enable growth.",
        }),
        section("ctaBanner", 4, {
          kicker: "Let's talk",
          heading: "Let's talk about",
          accent: "your industry",
          buttons: [{ label: "Talk to an Expert", href: "/contact" }],
        }),
      ],
    },

    insights: {
      seo: {
        title: "Insights — CybernaNet",
        description: "Practical perspectives on cybersecurity, IT infrastructure, digital transformation and technology careers from CybernaNet.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Insights",
          heading: "Technology changes fast.",
          accent: "Stay ahead.",
          subtext: "Practical perspectives on cybersecurity, IT infrastructure, digital transformation and technology careers.",
          image: IMG.code,
        }),
        section("featureSplit", 1, {
          eyebrow: "Knowledge shared",
          heading: "Technology knowledge should be",
          accent: "accessible",
          badge: "Education as infrastructure",
          body: [
            "CybernaNet believes education is an essential part of a secure digital ecosystem.",
            "Our content is designed to make complex technology topics easier to understand and more practical to apply.",
          ],
          bullets: ["Cybersecurity", "Infrastructure", "Digital transformation", "AI & automation"],
          image: IMG.abstractAi,
          imageSide: "left",
        }),
        section("iconGrid", 2, {
          tag: "Topics",
          heading: "Explore our",
          accent: "topics",
          cards: [
            { id: id(), title: "Cybersecurity", description: "Threats, vulnerabilities, security awareness and practical protection strategies." },
            { id: id(), title: "Infrastructure", description: "Networks, servers, cloud, virtualization and data centers." },
            { id: id(), title: "Digital Transformation", description: "How organizations can use technology to improve operations and competitiveness." },
            { id: id(), title: "AI & Automation", description: "Emerging technologies and practical applications for business." },
            { id: id(), title: "IT Management", description: "Technology strategy, governance and operational best practices." },
            { id: id(), title: "Careers & Certifications", description: "Skills, certifications and career pathways for technology professionals." },
          ],
        }),
        section("marquee", 3, {
          items: ["Threat intelligence", "Zero trust", "Cloud security", "Network design", "Business continuity", "Automation", "ESG of IT", "Career pathways"],
          speed: 36,
        }),
        section("ctaBanner", 4, {
          kicker: "Stay in the loop",
          heading: "Practical perspectives, written to be",
          accent: "used",
          subtext:
            "CybernaNet believes education is an essential part of a secure digital ecosystem. Tell us what you'd like us to cover.",
          buttons: [{ label: "Explore Insights", href: "/insights" }, { label: "Suggest a Topic", href: "/contact" }],
        }),
      ],
    },

    contact: {
      seo: {
        title: "Contact Us — CybernaNet",
        description: "Tell CybernaNet about your technology challenge — our team will help identify the right starting point.",
      },
      sections: [
        section("pageHero", 0, {
          eyebrow: "Contact",
          heading: "Let's build",
          accent: "what's next.",
          subtext: "Whether you need to secure your infrastructure, build a digital platform, modernize your IT environment or develop your team's capabilities, CybernaNet is ready to help.",
          image: IMG.abstractAi,
        }),
        section("contact", 1, {
          tag: "Get in touch",
          heading: "Have a technology",
          accent: "challenge?",
          subheading:
            "Whether you need to secure your infrastructure, build a digital platform, modernize your IT environment or develop your team's technical capabilities, CybernaNet is ready to help. Tell us what you're working on and our team will help identify the right starting point.",
          formHeading: "Tell us about your requirement",
          serviceLabel: "What can we help you with?",
          submitLabel: "Send Request",
          responseNote: "N'Djamena · Response within one business day",
          privacyNote: "No obligation · No spam",
          companyEmail: "CybernaNet@gmail.com",
          companyPhone: "+235 60 20 20 84",
          companyAddress: "CybernaNet, N'Djamena, Republic of Chad",
          serviceOptions: [
            "Cybersecurity",
            "IT Infrastructure",
            "Network Solutions",
            "Cloud & Virtualization",
            "Web Development",
            "Software Development",
            "Managed IT Services",
            "Digital Transformation",
            "IT Consulting",
            "Training & Certifications",
            "AI & Automation",
            "Other",
          ],
        }),
        section("faq", 2, {
          tag: "Before you write",
          heading: "Questions we get",
          accent: "a lot",
          subheading: "If yours isn't here, the form above reaches the same team.",
        }),
      ],
    },
  },
};

const EN_FAQS = [
  {
    id: id(),
    question: "Do you work with organizations outside Chad?",
    answer:
      "Yes. We are headquartered in N'Djamena and work with businesses, public institutions and international organizations across the region — on site, remotely and through managed engagements.",
  },
  {
    id: id(),
    question: "Can you take over an environment someone else built?",
    answer:
      "Regularly. We start with an assessment of the existing infrastructure, applications and security posture, then agree a transition plan before changing anything in production.",
  },
  {
    id: id(),
    question: "Do you only advise, or do you implement as well?",
    answer:
      "Both. Unlike advisory firms that stop at recommendations, CybernaNet can implement, secure and then support the solutions it designs — assess, plan, implement, secure, support.",
  },
  {
    id: id(),
    question: "How quickly can you respond to a security incident?",
    answer:
      "Incident response readiness is part of our managed engagements, with 24/7 monitoring and support coverage. For organizations we do not yet manage, contact us and we will tell you honestly what we can mobilise and how fast.",
  },
  {
    id: id(),
    question: "Can training be delivered for our whole team?",
    answer:
      "Yes. Corporate programs are built around your cybersecurity requirements, network environment, systems architecture, IT policies, skill gaps and certification objectives — delivered in person, online instructor-led, or through distance and e-learning.",
  },
];

const FR_FAQS = [
  {
    id: id(),
    question: "Travaillez-vous avec des organisations hors du Tchad ?",
    answer:
      "Oui. Nous sommes basés à N'Djamena et travaillons avec des entreprises, des institutions publiques et des organisations internationales dans toute la région — sur site, à distance et en infogérance.",
  },
  {
    id: id(),
    question: "Pouvez-vous reprendre un environnement construit par quelqu'un d'autre ?",
    answer:
      "Régulièrement. Nous commençons par un audit de l'infrastructure, des applications et de la posture de sécurité existantes, puis nous convenons d'un plan de transition avant toute modification en production.",
  },
  {
    id: id(),
    question: "Faites-vous seulement du conseil, ou aussi la mise en œuvre ?",
    answer:
      "Les deux. Contrairement aux cabinets qui s'arrêtent aux recommandations, CybernaNet déploie, sécurise puis accompagne les solutions qu'elle conçoit : évaluer, planifier, déployer, sécuriser, accompagner.",
  },
  {
    id: id(),
    question: "Sous quel délai pouvez-vous répondre à un incident de sécurité ?",
    answer:
      "La capacité de réponse aux incidents fait partie de nos engagements d'infogérance, avec une supervision et un support 24 h/24, 7 j/7. Pour les organisations que nous ne gérons pas encore, contactez-nous : nous vous dirons honnêtement ce que nous pouvons mobiliser et à quelle vitesse.",
  },
  {
    id: id(),
    question: "La formation peut-elle être dispensée à toute notre équipe ?",
    answer:
      "Oui. Les programmes en entreprise sont construits autour de vos exigences de cybersécurité, de votre environnement réseau, de votre architecture système, de vos politiques IT, de vos déficits de compétences et de vos objectifs de certification — en présentiel, en ligne avec formateur, à distance ou en e-learning.",
  },
];

// Each FAQ carries its own locale; the public endpoint filters on it and on
// `enabled`, so both fields have to be seeded or nothing renders.
const withDefaults = (list, locale) =>
  list.map((f, i) => ({ ...f, locale, enabled: true, order: i, category: "General" }));

export const defaultFaqs = [...withDefaults(EN_FAQS, "en"), ...withDefaults(FR_FAQS, "fr")];

export const defaultSettings = {
  leadRecipients: ["CybernaNet@gmail.com"],
  autoResponse: {
    subject: "Thanks for reaching out to CybernaNet",
    greeting: "Hi {{name}},",
    body:
      "Thanks for getting in touch with CybernaNet! We've received your message and a member of our team will reply shortly to help identify the right starting point for your project.\n\nIn the meantime, feel free to reply directly to this email with any extra details.",
    ctaLabel: "Visit our site",
    ctaUrl: "https://example.com",
    footer: "— The CybernaNet Team",
  },
  smtp: {
    host: "",
    port: 587,
    secure: false,
    user: "",
    fromName: "CybernaNet",
    fromEmail: "CybernaNet@gmail.com",
    configured: false,
  },
};
