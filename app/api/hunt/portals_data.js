// ============================================================================
// Comprehensive Public-Facing UAE Job Portals, Career Ecosystems & Tender Gateways
// ============================================================================

export const JOB_HUNT_PORTAL_CATEGORIES = [
  {
    id: "job_boards",
    title: "Job Portals (Major Regional & General)",
    icon: "Globe",
    portals: [
      {
        name: "LinkedIn Jobs (UAE)",
        url: "https://www.linkedin.com/jobs/search/?keywords=Information+Technology&location=United+Arab+Emirates",
        tag: "Most Active Tech Platform",
        description: "Software engineering, cloud, cybersecurity, AI, and enterprise IT across Dubai and Abu Dhabi."
      },
      {
        name: "Naukrigulf",
        url: "https://www.naukrigulf.com/it-jobs-in-uae",
        tag: "High Volume Tech",
        description: "Developers, systems engineers, cloud architects, ERP, and database specialists."
      },
      {
        name: "Bayt.com",
        url: "https://www.bayt.com/en/uae/jobs/information-technology-jobs/",
        tag: "Largest Middle East Board",
        description: "IT support, infrastructure, web development, and digital transformation."
      },
      {
        name: "GulfTalent",
        url: "https://www.gulftalent.com/uae/jobs/sector/information-technology",
        tag: "Mid-to-Senior Leadership",
        description: "Solutions architects, technical leads, and IT engineering management."
      },
      {
        name: "Indeed UAE",
        url: "https://ae.indeed.com/q-it-jobs-l-united-arab-emirates-jobs.html",
        tag: "Large Tech Aggregator",
        description: "SME tech postings and multinational corporate IT roles."
      },
      {
        name: "Foundit Gulf (Monster)",
        url: "https://www.founditgulf.com/it-jobs-in-uae",
        tag: "Systems & Network",
        description: "System administration, software development, and network engineering."
      },
      {
        name: "Dubizzle Jobs UAE",
        url: "https://dubai.dubizzle.com/jobs/it-telecom/",
        tag: "Local UAE Direct",
        description: "Entry-to-mid IT support, technician roles, and network support."
      },
      {
        name: "eFinancialCareers Gulf",
        url: "https://www.efinancialcareers-gulf.com/jobs/technology",
        tag: "FinTech & Banking IT",
        description: "Quantitative development, algorithmic trading tech, and banking infrastructure."
      }
    ]
  },
  {
    id: "startup_platforms",
    title: "Startup Platforms (Tech & Innovation Hubs)",
    icon: "Sparkles",
    portals: [
      {
        name: "Wellfound (AngelList)",
        url: "https://wellfound.com/location/united-arab-emirates",
        tag: "UAE Tech Startups",
        description: "AI researchers, software engineers, and full-stack startup developers."
      },
      {
        name: "Hub71 Talent Portal",
        url: "https://www.hub71.com/community/careers/",
        tag: "Abu Dhabi Tech Hub",
        description: "Seed to growth-stage tech startups in Abu Dhabi global tech ecosystem."
      },
      {
        name: "SaviorHire",
        url: "https://www.saviorhire.com/jobs",
        tag: "Vetted Tech Talent",
        description: "Developers, DevOps, and data science talent in the UAE."
      },
      {
        name: "DIFC Innovation Hub Careers",
        url: "https://www.difc.ae/careers/",
        tag: "FinTech & Web3 Startups",
        description: "FinTech, blockchain, AI, and regulatory tech roles in Dubai."
      },
      {
        name: "ADGM Careers (Abu Dhabi)",
        url: "https://www.adgm.com/careers",
        tag: "Financial Free-Zone Tech",
        description: "Digital finance, cloud engineering, and cybersecurity."
      }
    ]
  },
  {
    id: "tech_agencies",
    title: "Specialized Tech Recruitment Agency Portals",
    icon: "Building2",
    portals: [
      {
        name: "Michael Page Middle East (Tech)",
        url: "https://www.michaelpage.ae/jobs/technology",
        tag: "Enterprise & Leadership",
        description: "Enterprise architects, CIO/CTO leadership, and specialized AI/data roles."
      },
      {
        name: "AIQU Solutions",
        url: "https://www.aiqusearch.com/jobs",
        tag: "AI & Data Science",
        description: "Dedicated Middle East tech recruitment firm for AI, cloud, and data science."
      },
      {
        name: "Hays Middle East (Technology)",
        url: "https://www.hays.ae/jobs/information-technology",
        tag: "Software & Cyber Defense",
        description: "Contract and permanent roles across software engineering, cyber, and ERP."
      },
      {
        name: "Charterhouse Middle East",
        url: "https://www.charterhouseme.ae/jobs/technology",
        tag: "Digital Transformation",
        description: "Digital transformation, tech advisory, and enterprise applications."
      },
      {
        name: "Tiger Recruitment (Tech Division)",
        url: "https://tiger-recruitment.com/ae/disciplines/tech/",
        tag: "Product & Engineering",
        description: "Disruptive startups, product management, and full-stack development."
      },
      {
        name: "Cooper Fitch UAE",
        url: "https://cooperfitch.ae/jobs/technology/",
        tag: "Corporate IT Services",
        description: "Corporate tech placements, IT services, and IT project management."
      },
      {
        name: "Adecco Middle East",
        url: "https://www.adeccome.com/jobs/",
        tag: "Global IT Staffing",
        description: "Enterprise IT contract staffing and permanent technology placements."
      }
    ]
  },
  {
    id: "government_portals",
    title: "Government Portals & Sovereign Ecosystems",
    icon: "Shield",
    portals: [
      {
        name: "Dubai Careers (dubaicareers.ae)",
        url: "https://dubaicareers.ae/en/Pages/default.aspx",
        tag: "Official Dubai Gov",
        description: "Central portal for IT and digital roles across Digital Dubai, DEWA, RTA, Smart Dubai."
      },
      {
        name: "TAMM Abu Dhabi Careers",
        url: "https://www.tamm.abudhabi/en/life-events/individual/Finding-a-Job/Careers",
        tag: "Abu Dhabi Government",
        description: "Abu Dhabi government digital infrastructure and smart city tech roles."
      },
      {
        name: "Federal Government Careers (FAHR / Bayanati)",
        url: "https://www.fahr.gov.ae/",
        tag: "UAE Federal Ministries",
        description: "Tech roles across UAE federal ministries and government entities."
      },
      {
        name: "DDA (Dubai Development Authority)",
        url: "https://dda.gov.ae/en/careers",
        tag: "Freezone Digital Tech",
        description: "Careers across TECOM Group, Dubai Internet City & Media City."
      }
    ]
  }
];

export const TENDER_PORTAL_CATEGORIES = [
  {
    id: "gov_it_tenders",
    title: "Government IT Tenders",
    icon: "ShieldCheck",
    portals: [
      {
        name: "Ministry of Finance (MoF) Digital Procurement",
        url: "https://mof.gov.ae/federal-procurement/",
        tag: "Federal Sovereign Tenders",
        description: "Centralized portal for UAE federal ministries for IT services, cloud solutions, and enterprise hardware."
      },
      {
        name: "Dubai eSupply (esupply.dubai.gov.ae)",
        url: "https://esupply.dubai.gov.ae",
        tag: "40+ Dubai Gov Entities",
        description: "Official procurement portal for Digital Dubai, RTA, Dubai Police, DDA powered by Jaggaer/Tejari."
      },
      {
        name: "Abu Dhabi Procurement Gate (TAMM / SAP Ariba)",
        url: "https://www.tamm.abudhabi/en/tamm-categories/business/procurement/government-procurement",
        tag: "Abu Dhabi Gov (DGS)",
        description: "Department of Government Support portal for IT, software, and infrastructure tenders."
      },
      {
        name: "Central Bank of the UAE (CBUAE) E-Procurement",
        url: "https://www.centralbank.ae/en/about-us/procurement-and-tenders/",
        tag: "Banking & FinTech Sourcing",
        description: "Financial sector IT infrastructure, fintech licensing, and cybersecurity procurement."
      },
      {
        name: "Tejari (Jaggaer Middle East)",
        url: "https://portal.tejari.com",
        tag: "GCC Primary Marketplace",
        description: "Primary e-procurement marketplace used by public, semi-gov, and commercial entities in UAE."
      }
    ]
  },
  {
    id: "enterprise_semi_gov",
    title: "Enterprise & Semi-Gov IT Tenders",
    icon: "Building2",
    portals: [
      {
        name: "e& (Etisalat) Supplier Portal",
        url: "https://www.eand.com/en/procurement.html",
        tag: "Telecom & Cloud Infra",
        description: "Telecom networks, data center hardware, software licensing, and enterprise cloud systems."
      },
      {
        name: "ADNOC Supplier Portal (Ariba)",
        url: "https://www.adnoc.ae/en/suppliers",
        tag: "Energy Sector Enterprise IT",
        description: "Enterprise IT, SCADA/OT security, networking, and digital transformation consulting."
      },
      {
        name: "DEWA Supplier Portal",
        url: "https://www.dewa.gov.ae/en/supplier-and-partners/supplier/supplier-services",
        tag: "Smart Grid & IoT",
        description: "Smart grid technology, IoT devices, cyber defense, and enterprise IT services."
      },
      {
        name: "Emirates Group / Dnata Procurement",
        url: "https://www.theemiratesgroup.com/en/procurement/",
        tag: "Aviation & ERP Sourcing",
        description: "Aviation IT, enterprise ERP, cloud systems, and airline operational software."
      },
      {
        name: "Dubai Airports Sourcing Portal",
        url: "https://www.dubaiairports.ae/business/suppliers",
        tag: "Airport Biometrics & IT",
        description: "Airport IT infrastructure, biometrics, surveillance, and systems integration."
      }
    ]
  },
  {
    id: "b2b_it_marketplaces",
    title: "B2B IT Marketplaces & Procurement Platforms",
    icon: "Layers",
    portals: [
      {
        name: "IT Bidz (itbidz.com)",
        url: "https://itbidz.com",
        tag: "UAE IT RFQ Marketplace",
        description: "Connecting businesses with vetted IT suppliers to post RFQs, compare quotes, and procure services."
      },
      {
        name: "Tradeling (tradeling.com)",
        url: "https://www.tradeling.com/ae-en/category/electronics-it",
        tag: "MENA B2B Wholesale",
        description: "Major MENA B2B wholesale platform for commercial IT hardware, office tech, and electronics."
      },
      {
        name: "Peko (peko.one)",
        url: "https://peko.one",
        tag: "SaaS & Cloud Sourcing",
        description: "Procurement platform tailored for software licenses, SaaS subscriptions, and cloud tools."
      },
      {
        name: "Bizaar (bizaar.ai)",
        url: "https://bizaar.ai",
        tag: "AI Tech Marketplace",
        description: "B2B tech distributor marketplace for enterprise networking devices, access points, and servers."
      },
      {
        name: "Webishopi (TechBee)",
        url: "https://webishopi.com",
        tag: "Hardware & Infrastructure",
        description: "AI-powered B2B e-procurement and quoting platform for IT hardware and structured cabling."
      }
    ]
  },
  {
    id: "tier1_distributors",
    title: "Tier-1 IT Distributors & Cloud Partner Portals",
    icon: "Cpu",
    portals: [
      {
        name: "Ingram Micro UAE / Cloud Marketplace",
        url: "https://ae.ingrammicro.com",
        tag: "Global Distributor",
        description: "Enterprise hardware (Cisco, HP, Lenovo) and cloud subscriptions (Microsoft, AWS)."
      },
      {
        name: "Redington Gulf (CloudQuarks)",
        url: "https://redingtongroup.com/middle-east/",
        tag: "Regional Cloud Aggregator",
        description: "Enterprise servers, storage, security, and cloud licensing distribution."
      },
      {
        name: "Mindware UAE",
        url: "https://mindware.net",
        tag: "Dell, Cisco & Microsoft",
        description: "Authorized distributor portal for Dell Technologies, Cisco, Microsoft, and Juniper."
      },
      {
        name: "Logicom Cloud & Partner Portal",
        url: "https://www.logicom.net/partners/",
        tag: "Telecom & Cloud Licensing",
        description: "Value-added distributor platform servicing UAE system integrators with enterprise tech."
      }
    ]
  },
  {
    id: "tender_aggregators",
    title: "UAE Tender Aggregators & RFP Monitoring Portals",
    icon: "FileText",
    portals: [
      {
        name: "UAETenders (uaetenders.com)",
        url: "https://www.uaetenders.com",
        tag: "Daily UAE RFPs",
        description: "Aggregates daily public and private sector RFPs, RFIs, and IT service bids across all 7 emirates."
      },
      {
        name: "TendersPedia / TendersInfo UAE",
        url: "https://www.tendersinfo.com/country-uae-tenders.php",
        tag: "GCC Tender Tracker",
        description: "Tracks commercial and government tender notices for software, managed IT, and infrastructure."
      }
    ]
  },
  {
    id: "agency_matchmaking",
    title: "B2B Agency Matchmaking & RFQ Platforms",
    icon: "Users",
    portals: [
      {
        name: "Clutch.co (UAE / Middle East)",
        url: "https://clutch.co/ae/developers",
        tag: "Verified Agency Briefs",
        description: "Businesses submit requirements for custom software development, AI implementation, and data analytics."
      },
      {
        name: "Sortlist (MENA)",
        url: "https://www.sortlist.com/software-development/dubai-ae",
        tag: "Matchmaking Briefs",
        description: "Project matchmaking platform where clients post briefs for workflow automation and bespoke apps."
      },
      {
        name: "TechBehemoths UAE",
        url: "https://techbehemoths.com/companies/dubai",
        tag: "AI & Custom Software",
        description: "Companies post specific IT project requirements and AI agent development briefs."
      }
    ]
  },
  {
    id: "ai_contract_networks",
    title: "Specialized Tech & AI Contract Networks",
    icon: "Zap",
    portals: [
      {
        name: "Braintrust",
        url: "https://www.usebraintrust.com",
        tag: "Enterprise Talent Network",
        description: "Enterprises post software engineering, machine learning, and AI automation project requirements."
      },
      {
        name: "Toptal",
        url: "https://www.toptal.com",
        tag: "Top 3% Vetted Talent",
        description: "High-level project requirements for custom software architecture, AI engineering, and data science."
      },
      {
        name: "Upwork (Enterprise / AI Development)",
        url: "https://www.upwork.com/freelance-jobs/ai-agent-development/",
        tag: "AI Agents & LLM Fine-Tuning",
        description: "Dedicated categories for AI Agent Development, LLM Fine-tuning, and workflow automation."
      }
    ]
  },
  {
    id: "ai_marketplaces",
    title: "AI Agent & Automation Marketplaces",
    icon: "Bot",
    portals: [
      {
        name: "Kore.ai AI Marketplace",
        url: "https://kore.ai/marketplace/",
        tag: "Conversational & Agentic",
        description: "Deploy, configure, and procure conversational AI and agentic workflows for ITSM and customer service."
      },
      {
        name: "Moveworks AI Agent Marketplace",
        url: "https://www.moveworks.com/platform",
        tag: "Enterprise AI Assistants",
        description: "AI plugins and agents built to automate internal IT service desks, procurement, and data reasoning."
      },
      {
        name: "AWS Marketplace (UAE Region)",
        url: "https://aws.amazon.com/marketplace",
        tag: "Cloud AI Solutions",
        description: "List and procure custom-built AI automation agents, RFQ parsers, and data extraction agents."
      },
      {
        name: "Microsoft Azure Marketplace",
        url: "https://azuremarketplace.microsoft.com/",
        tag: "Enterprise Azure AI",
        description: "Enterprise-ready AI agents and bespoke software solutions directly for corporate procurement."
      },
      {
        name: "OpenAI GPT Store & Custom MCP Hubs",
        url: "https://chatgpt.com/gpts",
        tag: "Custom GPTs & MCPs",
        description: "Custom AI agents and Model Context Protocol (MCP) servers tailored to specific automation tasks."
      }
    ]
  }
];
