import { randomUUID } from "crypto";

const id = () => randomUUID();

function section(type, order, data) {
  return { id: id(), type, order, visible: true, data };
}

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
          headingLine1: "Innovate. Secure.",
          headingHighlight: "Transform.",
          subtext:
            "Technology that works for your business. Security that works around the clock. CybernaNet helps organizations build, secure and transform their digital environments through integrated technology solutions, cybersecurity, infrastructure engineering, software development and professional training.",
          primaryCta: { label: "Explore Our Solutions", href: "/solutions" },
          secondaryCta: { label: "Talk to an Expert", href: "/contact" },
        }),
        section("iconGrid", 1, {
          heading: "One Partner. Multiple Technology Capabilities.",
          cards: [
            { id: id(), title: "Cybersecurity", description: "Protect your systems, networks, identities and data with proactive security assessments, security architecture, penetration testing, monitoring and incident response.", href: "/solutions/cybersecurity" },
            { id: id(), title: "Network & IT Infrastructure", description: "Design and implement reliable enterprise networks, servers, Wi-Fi, data centers, virtualization and business continuity environments.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Web & Software Development", description: "Create secure, scalable websites, e-commerce platforms, SaaS applications, customer portals and business applications.", href: "/solutions/software-development" },
            { id: id(), title: "Managed IT Services", description: "Keep your technology environment operational through technical support, maintenance, monitoring and managed IT services.", href: "/solutions/managed-it" },
            { id: id(), title: "Consulting & Digital Transformation", description: "Turn technology into a business advantage through IT strategy, digital transformation and technology advisory.", href: "/solutions/it-consulting" },
            { id: id(), title: "Training & Certifications", description: "Develop practical technology capabilities through professional training and globally recognized certification pathways.", href: "/solutions/training-certifications" },
          ],
          cta: { label: "View All Solutions", href: "/solutions" },
        }),
        section("textIntro", 2, {
          heading: "Security Should Never Be an Afterthought.",
          paragraphs: [
            "A website can be developed by one company, hosted by another and secured by someone else. Your business should not have to work that way. CybernaNet takes a connected approach to technology.",
            "We don't simply develop your digital platform — we consider the infrastructure behind it. We don't simply install a network — we consider how it should be protected. We don't simply fix technology problems — we help your teams understand how to prevent them.",
          ],
          flowSteps: ["Infrastructure", "Applications", "Cybersecurity", "People"],
        }),
        section("processSteps", 3, {
          heading: "From Challenge to Solution",
          steps: [
            { id: id(), title: "01. Understand", description: "We assess your business, technology environment and objectives." },
            { id: id(), title: "02. Design", description: "We develop the right technology architecture and implementation roadmap." },
            { id: id(), title: "03. Implement", description: "Our teams deploy and integrate the required solutions." },
            { id: id(), title: "04. Secure", description: "Security is embedded across infrastructure, applications, systems and access." },
            { id: id(), title: "05. Support", description: "We provide maintenance, technical support and ongoing optimization." },
            { id: id(), title: "06. Develop", description: "We strengthen your internal capabilities through knowledge transfer and training." },
          ],
        }),
        section("ctaBanner", 4, {
          heading: "Building a More Secure Digital Africa",
          subtext:
            "CybernaNet is built with a regional vision: to contribute to the development of a stronger, more secure and more capable digital ecosystem across Africa.",
          buttons: [
            { label: "Start a Conversation", href: "/contact" },
            { label: "Request a Consultation", href: "/contact" },
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
          heading: "Accelerating Digital Transformation. Strengthening Security. Developing Skills.",
          subtext:
            "CybernaNet is a technology and digital services company specializing in cybersecurity, IT infrastructure, software development, digital transformation and professional technology training. Based in N'Djamena, Chad, we support businesses, public institutions, startups and organizations in designing, implementing, securing and optimizing their technology environments.",
        }),
        section("textIntro", 1, {
          heading: "Why CybernaNet Exists",
          paragraphs: [
            "Technology has become fundamental to how organizations operate. But digital adoption also creates new challenges. Cyber threats continue to evolve. IT environments are becoming more complex. Businesses increasingly depend on digital platforms. Cloud and hybrid infrastructure are changing how systems are deployed. And organizations need people with the right technical skills to manage all of it.",
            "CybernaNet was created to bring these capabilities together.",
          ],
        }),
        section("iconGrid", 2, {
          heading: "Our 360° Approach",
          intro:
            "Technology does not operate in silos. Your application depends on infrastructure. Your infrastructure depends on networks. Your network depends on security. And all of it depends on people. That is why CybernaNet takes a 360° approach.",
          cards: [
            { id: id(), title: "We Build", description: "Technology infrastructure designed around your operational requirements." },
            { id: id(), title: "We Secure", description: "Security solutions designed to protect your systems, data and digital assets." },
            { id: id(), title: "We Transform", description: "Digital technologies that improve how your organization operates." },
            { id: id(), title: "We Develop", description: "People and technical capabilities that help organizations become more self-sufficient." },
          ],
        }),
        section("iconGrid", 3, {
          cards: [
            { id: id(), title: "Our Mission", description: "To design, integrate and secure innovative technology solutions that help organizations improve performance, protect their digital assets and accelerate digital transformation, while developing the technical capabilities of the next generation." },
            { id: id(), title: "Our Vision", description: "To become a trusted technology and cybersecurity partner in Africa, recognized for technical excellence, innovation, security, quality of service and contribution to a stronger digital ecosystem." },
          ],
        }),
        section("valueList", 4, {
          heading: "Our Values",
          items: ["Integrity", "Excellence", "Security", "Innovation", "Collaboration", "Education", "Responsibility", "Client Success"],
        }),
        section("textIntro", 5, {
          heading: "Our Headquarters",
          paragraphs: ["CybernaNet | N'Djamena | Republic of Chad", "Phone: +235 60 20 20 84", "Email: CybernaNet@gmail.com"],
        }),
        section("textIntro", 6, {
          heading: "The CybernaNet Promise",
          paragraphs: [
            "We don't believe technology should make business more complicated. Our role is to simplify it.",
            "We bring together the people, technology, security and expertise required to help organizations move forward with confidence.",
            "Innovate. Secure. Transform.",
          ],
        }),
        section("ctaBanner", 7, {
          heading: "Let's Build What's Next",
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
          heading: "Technology Solutions Built Around Your Business",
          subtext: "CybernaNet provides integrated technology services across cybersecurity, infrastructure, software, cloud, managed IT and professional training.",
        }),
        section("textIntro", 1, {
          heading: "Technology. Security. Expertise.",
          paragraphs: [
            "Digital transformation creates enormous opportunities, but it also creates new risks and operational challenges. Cyberattacks are becoming more sophisticated, IT infrastructure is becoming increasingly complex, and skilled technology professionals are becoming increasingly important.",
            "CybernaNet brings these requirements together through an integrated approach.",
          ],
        }),
        section("iconGrid", 2, {
          cards: [
            { id: id(), title: "Build", description: "Design reliable networks, infrastructure, cloud environments and digital platforms." },
            { id: id(), title: "Secure", description: "Protect systems, data, identities and critical infrastructure against evolving cyber threats." },
            { id: id(), title: "Transform", description: "Modernize operations through software, cloud, automation, data and digital technologies." },
            { id: id(), title: "Develop", description: "Strengthen internal capabilities through practical, internationally aligned technology training." },
          ],
        }),
        section("iconGrid", 3, {
          heading: "Every Solution, In Depth",
          cards: [
            { id: id(), title: "Cybersecurity", description: "Protect What Keeps Your Business Running. Security audits, cybersecurity consulting, risk assessment, vulnerability assessment, penetration testing, security architecture, firewall deployment and configuration, EDR and endpoint protection, IDS/IPS, MFA, IAM, security policies and governance, incident response, ransomware response, data breach response and cybersecurity awareness.", href: "/solutions/cybersecurity" },
            { id: id(), title: "Network & IT Infrastructure", description: "Infrastructure Designed for Performance and Resilience. LAN, WAN, VLAN, enterprise Wi-Fi, network architecture, structured cabling, routers and switches, servers, storage systems, data center infrastructure, virtualization, high-availability environments, IP telephony, business continuity and disaster recovery.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Cloud & Hybrid Infrastructure", description: "Scale Without Losing Control. Cloud readiness assessment, cloud migration, hybrid infrastructure, virtual server environments, cloud security, infrastructure management, backup and recovery, virtualization and performance optimization. Cloud environments include AWS, Microsoft Azure and Google Cloud.", href: "/solutions/network-infrastructure" },
            { id: id(), title: "Web & Software Development", description: "Digital Platforms Built for Business. Corporate websites, e-commerce websites, custom web applications, SaaS platforms, customer portals, secure extranets, business applications, mobile applications, API and system integration, website maintenance, technical optimization and SEO.", href: "/solutions/software-development" },
            { id: id(), title: "Managed IT Services", description: "Technology Support Without the Technology Headache. IT support, preventive and corrective maintenance, infrastructure monitoring, system and network administration, IT asset management, technical troubleshooting, backup management, security maintenance and infrastructure optimization.", href: "/solutions/managed-it" },
            { id: id(), title: "IT Consulting & Digital Transformation", description: "Turn Technology Into a Business Advantage. IT assessments, technology audits, digital transformation strategy, IT roadmaps, technology architecture, requirements analysis, project management, infrastructure planning, cybersecurity strategy, technology modernization and systems integration.", href: "/solutions/it-consulting" },
            { id: id(), title: "Data, AI & Automation", description: "Make Your Technology Work Smarter. Data analysis, business intelligence, process automation, AI applications, workflow automation, data-driven decision support and technology integration.", href: "/solutions" },
            { id: id(), title: "Training & Certifications", description: "Build Skills. Build Confidence. Build Careers. Practical technology training for professionals, organizations and individuals seeking to develop technical capabilities and pursue internationally recognized certifications.", href: "/solutions/training-certifications" },
          ],
        }),
        section("ctaBanner", 4, {
          heading: "Not Sure Where to Start?",
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
          heading: "Protect Your Business Before Threats Become Incidents.",
          subtext: "Cybersecurity is no longer an IT issue alone. It is a business continuity issue, a financial issue, a reputation issue and a leadership issue. CybernaNet helps organizations understand their exposure, strengthen their defenses and respond when threats occur.",
        }),
        section("processSteps", 1, {
          heading: "Assess. Protect. Detect. Respond. Recover.",
          steps: [
            { id: id(), title: "Assess", description: "Identify vulnerabilities, risks and weaknesses across your technology environment." },
            { id: id(), title: "Protect", description: "Deploy security controls designed around your infrastructure and risk profile." },
            { id: id(), title: "Detect", description: "Improve visibility into suspicious activities and potential threats." },
            { id: id(), title: "Respond", description: "Act quickly when a security incident occurs." },
            { id: id(), title: "Recover", description: "Restore operations and strengthen defenses to reduce the likelihood of recurrence." },
          ],
        }),
        section("valueList", 2, {
          heading: "Our Cybersecurity Services",
          items: ["Security Audit & Risk Assessment", "Penetration Testing", "Infrastructure Protection", "Identity & Access Management", "Multi-Factor Authentication", "Security Architecture", "Incident Response", "Security Awareness"],
        }),
        section("textIntro", 3, {
          heading: "Security Is a Continuous Process.",
          paragraphs: ["A secure environment today can become vulnerable tomorrow. CybernaNet therefore approaches cybersecurity as an ongoing process of assessment, improvement, monitoring and education."],
        }),
        section("ctaBanner", 4, {
          heading: "Ready to Strengthen Your Security Posture?",
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
          heading: "The Infrastructure Behind Your Digital Business.",
          subtext: "Reliable technology begins with reliable infrastructure. CybernaNet designs, implements and supports network and IT environments that help organizations operate efficiently, securely and continuously.",
        }),
        section("columnGroups", 1, {
          groups: [
            { id: id(), title: "Enterprise Network Solutions", items: ["LAN", "WAN", "VLAN", "Enterprise Wi-Fi", "Network security", "Routing and switching", "Structured cabling", "Remote connectivity", "VPN", "Network optimization"] },
            { id: id(), title: "Servers, Storage & Data Centers", items: ["Server infrastructure", "Storage systems", "Backup infrastructure", "Virtualization", "Data center design", "High availability", "Disaster recovery", "Business continuity"] },
            { id: id(), title: "Unified Communications", items: ["IP telephony", "Unified communications", "Enterprise connectivity", "Voice infrastructure"] },
            { id: id(), title: "Business Continuity & Disaster Recovery", intro: "A technology failure should not become a business failure.", items: ["Backup strategies", "Disaster recovery planning", "Recovery architecture", "Business continuity planning", "Infrastructure resilience"] },
          ],
        }),
        section("ctaBanner", 2, {
          heading: "Ready to Strengthen Your Infrastructure?",
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
          heading: "Build Digital Experiences That Work as Hard as Your Business.",
          subtext: "A digital platform should combine performance, usability, security and scalability. CybernaNet develops websites and applications designed around real business requirements.",
        }),
        section("columnGroups", 1, {
          groups: [
            { id: id(), title: "Websites", items: ["Corporate websites", "Institutional websites", "Service websites", "E-commerce platforms", "Campaign websites", "Customer-facing digital platforms"] },
            { id: id(), title: "Custom Applications", items: ["SaaS platforms", "Customer portals", "Secure extranets", "Business applications", "Internal platforms", "Web-based management systems"] },
            { id: id(), title: "Mobile Applications", intro: "Extend your digital services to customers and teams through purpose-built mobile applications.", items: [] },
            { id: id(), title: "Security by Design", items: ["Secure authentication", "Access management", "Data protection", "Application security", "Secure infrastructure", "Performance", "Scalability"] },
            { id: id(), title: "Maintenance & Optimization", items: ["Technical maintenance", "Security updates", "Performance optimization", "Speed optimization", "SEO", "Application improvements", "Ongoing support"] },
          ],
        }),
        section("ctaBanner", 2, {
          heading: "Have a Project in Mind?",
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
          heading: "Don't Invest in Technology Without a Strategy.",
          subtext: "Technology decisions can have long-term operational and financial consequences. CybernaNet helps organizations make better technology decisions by connecting business objectives with technical strategy.",
        }),
        section("columnGroups", 1, {
          groups: [
            { id: id(), title: "Understand Where You Are.", items: ["IT infrastructure", "Network environment", "Cybersecurity posture", "Applications", "Cloud environment", "Operational processes", "Technical capabilities"] },
            { id: id(), title: "Define Where You Need to Go.", items: ["Technology priorities", "Digital transformation objectives", "Security requirements", "Infrastructure roadmap", "Implementation priorities", "Investment requirements"] },
            { id: id(), title: "Build the Roadmap.", items: ["IT assessments", "Technology audits", "Requirements analysis", "Solution architecture", "Digital transformation strategy", "Project planning", "Technology selection", "Implementation planning"] },
          ],
        }),
        section("textIntro", 2, {
          heading: "Then Make It Happen.",
          paragraphs: [
            "Unlike advisory firms that stop at recommendations, CybernaNet can support the implementation of the solutions it designs.",
            "That's the difference between a technology recommendation and a technology partnership.",
          ],
          flowSteps: ["Assess", "Plan", "Implement", "Secure", "Support"],
        }),
        section("ctaBanner", 3, {
          heading: "Let's Talk Strategy",
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
          heading: "Let Your Team Focus on the Business. We'll Help Keep Technology Running.",
          subtext: "Technology problems don't wait for convenient times. CybernaNet provides ongoing IT support and maintenance designed to keep your technology environment reliable, secure and operational.",
        }),
        section("valueList", 1, {
          heading: "What We Manage",
          items: ["IT infrastructure", "Networks", "Servers", "Systems", "Endpoints", "Applications", "Backup environments", "Security systems", "IT assets"],
        }),
        section("processSteps", 2, {
          heading: "Our Support Model",
          steps: [
            { id: id(), title: "Prevent", description: "Identify issues before they become operational problems." },
            { id: id(), title: "Monitor", description: "Maintain visibility across your technology environment." },
            { id: id(), title: "Respond", description: "Resolve technical issues efficiently." },
            { id: id(), title: "Maintain", description: "Keep systems updated and operational." },
            { id: id(), title: "Improve", description: "Continuously identify opportunities for optimization." },
          ],
        }),
        section("valueList", 3, {
          heading: "Why Managed IT?",
          items: ["Reduce technology downtime", "Improve system reliability", "Strengthen security", "Control IT operations", "Access specialist expertise", "Reduce pressure on internal teams", "Create a more predictable IT environment"],
        }),
        section("ctaBanner", 4, {
          heading: "Let's Talk Managed IT",
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
          heading: "Build Skills That Open Doors.",
          subtext: "Technology evolves rapidly. Organizations need skilled professionals. Professionals need relevant expertise. Students need practical experience. CybernaNet provides practical technology training for businesses, institutions and individuals seeking to strengthen technical capabilities and prepare for internationally recognized certifications.",
        }),
        section("valueList", 1, {
          heading: "Our Certification Programs",
          items: [
            "Cisco Certified Network Associate (CCNA 200-301)",
            "CompTIA Server+",
            "CompTIA Security+",
            "CompTIA PenTest+",
            "Certified Ethical Hacker (CEH), EC-Council",
            "EC-Council Certified SOC Analyst (CSA)",
            "Fortinet Certified Associate (FCA)",
            "Fortinet Certified Professional (FCP)",
            "Fortinet Certified Solution Specialist (FCSS)",
            "Fortinet Certified Expert (FCX)",
          ],
        }),
        section("valueList", 2, {
          heading: "More Than Classroom Learning.",
          items: ["Theory", "Practical Labs", "Real-World Scenarios", "Certification Preparation", "Personalized Guidance"],
        }),
        section("valueList", 3, {
          heading: "Training Formats",
          items: ["In-person training", "Online instructor-led training", "Distance learning", "E-learning", "Corporate training"],
        }),
        section("textIntro", 4, {
          heading: "Training for Organizations",
          paragraphs: ["Upskill your technology teams through programs tailored to cybersecurity requirements, network environments, systems architecture, IT policies, technical skill gaps and certification objectives."],
        }),
        section("ctaBanner", 5, {
          heading: "Ready to Build Your Team's Skills?",
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
          heading: "Technology Solutions Built Around Your Industry.",
          subtext: "Different industries face different technology challenges. CybernaNet combines technical expertise with an understanding of the operational and security requirements of different organizations.",
        }),
        section("iconGrid", 1, {
          cards: [
            { id: id(), title: "Financial Services", description: "Security, availability and trust are critical to financial institutions. We support financial organizations with cybersecurity, network infrastructure, identity and access management, business continuity, disaster recovery, secure digital platforms and IT consulting." },
            { id: id(), title: "Government & Public Institutions", description: "Public institutions manage sensitive information and essential services. CybernaNet helps build secure, resilient technology environments through infrastructure security, network solutions, cybersecurity assessments, secure applications, data protection, IT support and training." },
            { id: id(), title: "SMEs & Mid-Sized Businesses", description: "Growing businesses often need enterprise-grade technology without building a large internal IT department. We provide flexible support across IT infrastructure, cybersecurity, cloud, websites, business applications, managed IT and technical support." },
            { id: id(), title: "Startups", description: "Technology should enable growth, not slow it down. CybernaNet helps startups establish scalable technology foundations from the beginning." },
            { id: id(), title: "International Organizations & Institutions", description: "We support organizations requiring structured, secure and reliable technology environments." },
            { id: id(), title: "Industrial Organizations", description: "Modern industrial operations increasingly depend on connected infrastructure, data and digital systems. CybernaNet supports organizations with infrastructure, cybersecurity, networking, automation and digital transformation solutions." },
          ],
        }),
        section("textIntro", 2, {
          heading: "One Technology Partner. Multiple Business Needs.",
          paragraphs: ["Whatever your industry, our objective remains the same: Build reliable technology. Reduce risk. Improve performance. Enable growth."],
        }),
        section("ctaBanner", 3, {
          heading: "Let's Talk About Your Industry",
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
          heading: "Technology Changes Fast. Stay Ahead.",
          subtext: "Cybersecurity threats evolve. Technology changes. Business expectations change even faster. Our Insights platform brings together practical perspectives on cybersecurity, IT infrastructure, digital transformation and technology careers.",
        }),
        section("iconGrid", 1, {
          heading: "Explore Our Topics",
          cards: [
            { id: id(), title: "Cybersecurity", description: "Threats, vulnerabilities, security awareness and practical protection strategies." },
            { id: id(), title: "Infrastructure", description: "Networks, servers, cloud, virtualization and data centers." },
            { id: id(), title: "Digital Transformation", description: "How organizations can use technology to improve operations and competitiveness." },
            { id: id(), title: "AI & Automation", description: "Emerging technologies and practical applications for business." },
            { id: id(), title: "IT Management", description: "Technology strategy, governance and operational best practices." },
            { id: id(), title: "Careers & Certifications", description: "Skills, certifications and career pathways for technology professionals." },
          ],
        }),
        section("textIntro", 2, {
          heading: "Technology Knowledge Should Be Accessible.",
          paragraphs: ["CybernaNet believes education is an essential part of a secure digital ecosystem. Our content is designed to make complex technology topics easier to understand and more practical to apply."],
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
          heading: "Let's Build What's Next.",
          subtext: "Have a Technology Challenge? Whether you need to secure your infrastructure, build a digital platform, modernize your IT environment or develop your team's technical capabilities, CybernaNet is ready to help. Tell us what you're working on — our team will help identify the right starting point.",
        }),
        section("contact", 1, {
          tag: "Contact",
          heading: "Talk to CybernaNet",
          formHeading: "Tell Us About Your Requirement",
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
  },
};

export const defaultFaqs = [];

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
