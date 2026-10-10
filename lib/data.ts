export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  departmentCode: string;
  tagline: string;
  shortDesc: string;
  technicalCapabilities: string[];
  stages?: string[];
  visualImage: string;
  accent: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  criticality: string;
  image: string;
}

export interface CapabilityItem {
  name: string;
  category: "Mechanical Equipment" | "Piping & Components" | "Rotating Equipment" | "Coatings Inspection" | "Electrical & Instrumentation";
  standards: string[];
  description: string;
}

export interface NetworkHub {
  id: string;
  region: string;
  hubType: "Central Operations Hub" | "Regional Network Hub" | "Coverage Network Zone";
  location: string;
  coordinates: { x: number; y: number };
  description: string;
  countries: string[];
  status: "Active Operations" | "Network Deployment";
}

export interface TechnicalDiscipline {
  id: string;
  number: string;
  title: string;
  description: string;
  scope: string;
  image: string;
}

export interface ToolEquipment {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  category: string;
  image: string;
}

export const BRAND_INFO = {
  name: "UNIQUE INSPECTION INTEGRATED SERVICES",
  shortName: "UIIS",
  domain: "uniqueiis.com",
  tagline: "A Safer, Stronger Tomorrow",
  slogan: "INSPECT • ASSURE • DELIVER • ADD VALUE",
  coreMessage: ["INSPECT", "ASSURE", "DELIVER", "ADD VALUE"],
  statement: "Engineering confidence across inspection, verification, technical support and industrial quality assurance.",
  description: "Unique Inspection Integrated Services is an independent inspection services provider committed to quality, safety and compliance. We support clients across Oil & Gas, Petrochemical, Power, Water, Infrastructure and Industrial sectors through reliable third-party inspection, vendor surveillance, verification, audit, expediting and technical support services.",
  contact: {
    buildingNumber: "7952",
    street: "26",
    district: "Madinat Al-Ummal Dist.",
    postalCode: "3441",
    city: "Al-Khobar",
    country: "Kingdom of Saudi Arabia",
    fullAddress: "Building Number: 7952, Street 26, Madinat Al-Ummal Dist., Postal code: 3441, City: Al-Khobar, Kingdom of Saudi Arabia",
    mobile: "+966 57 143 4288",
    phoneDisplay: "+966 571 434 288",
    email: "info@uniqueiis.com",
    salesEmail: "info@uniqueiis.com",
    website: "www.uniqueiis.com",
  },
  colors: {
    deepNavy: "#060A14",
    titanium: "#94A3B8",
    emerald: "#10B981",
    gold: "#F59E0B",
    white: "#FFFFFF",
  }
};

export const TRUST_PILLARS = [
  {
    number: "01",
    label: "INSPECT",
    sublabel: "WITH PRECISION",
    headline: "Verify equipment, materials and workmanship.",
    description: "Independent third-party inspection performed at manufacturer, vendor and site facilities. We verify that products and assets are manufactured in strict compliance with approved requirements, international codes, and project specifications.",
    features: [
      "Raw material verification & Mill Test Certificate (MTC) review",
      "In-process manufacturing surveillance across forming, fitting & welding",
      "Final inspection, hydrostatic proof testing & Factory Acceptance Tests",
      "Marking, packing, preservation and pre-shipment release inspection"
    ],
    metric: "Source to Site",
    accentColor: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "group-hover:border-emerald-500/50",
    badge: "Verification"
  },
  {
    number: "02",
    label: "ASSURE",
    sublabel: "WITH CONFIDENCE",
    headline: "Support quality, compliance and technical requirements.",
    description: "Systematic quality management audits, supplier pre-qualification, and Level III technical governance ensuring client specifications are honored and critical non-conformities are eliminated before dispatch.",
    features: [
      "Vendor Survey & Audit (VSA) for manufacturing capacity & ISO 9001 systems",
      "NDT procedure preparation, review, technical approval & Level III advisory",
      "Special process qualification (Welding, Heat Treatment, Protective Coating)",
      "Continuous risk identification, corrective action tracking & punch list closure"
    ],
    metric: "Code Conformity",
    accentColor: "from-blue-500/20 to-blue-500/5",
    borderColor: "group-hover:border-blue-500/50",
    badge: "Governance"
  },
  {
    number: "03",
    label: "DELIVER",
    sublabel: "WITH COMMITMENT",
    headline: "Help projects achieve quality and timely execution.",
    description: "Proactive field and desk expediting combined with qualified technical manpower deployment, ensuring critical capital goods and plant systems arrive on schedule without compromising integrity.",
    features: [
      "Field and desk expediting across major manufacturing supply chains",
      "Production timeline validation against contractual master delivery dates",
      "Deployment of certified QA/QC engineers, inspectors and specialists",
      "Clear electronic reporting, milestone recovery plans and rapid communication"
    ],
    metric: "On-Time Integrity",
    accentColor: "from-amber-500/20 to-amber-500/5",
    borderColor: "group-hover:border-amber-500/50",
    badge: "Execution"
  },
  {
    number: "04",
    label: "ADD VALUE",
    sublabel: "FOR A BETTER TOMORROW",
    headline: "Drive efficiency and long-term asset reliability.",
    description: "Delivering tangible value by reducing rework risks, improving equipment traceability, protecting capital investments, and building collaborative partnerships that endure across project lifecycles.",
    features: [
      "Reduced risk of rework, material defects and schedule bottlenecks",
      "Complete dossier support, digital records and high-resolution photography",
      "Client-centric tailored solutions aligned with Saudi Vision 2030 standards",
      "Continual improvement through systematic preventive engineering practices"
    ],
    metric: "Lifecycle Value",
    accentColor: "from-emerald-500/20 to-teal-500/5",
    borderColor: "group-hover:border-teal-500/50",
    badge: "Value Driven"
  }
];

export const WHY_CHOOSE_UIIS = [
  {
    number: "01",
    title: "Independent & Unbiased Inspection",
    desc: "Rigorous third-party objectivity that provides stakeholders with factual, unbiased technical verification free from commercial conflicts.",
    badge: "Impartiality"
  },
  {
    number: "02",
    title: "Experienced & Qualified Engineers",
    desc: "Field-tested inspection personnel carrying certified credentials (CSWIP, AWS, API, AMPP, ASNT Level II/III) and major client approvals.",
    badge: "Competence"
  },
  {
    number: "03",
    title: "Focus on Quality, Safety & Compliance",
    desc: "Uncompromising adherence to international codes, client specifications, and stringent occupational health and safety standards.",
    badge: "Compliance"
  },
  {
    number: "04",
    title: "On-Time Reporting & Communication",
    desc: "Transparent electronic documentation, high-resolution photographic evidence, and rapid daily/weekly progress updates directly to clients.",
    badge: "Transparency"
  },
  {
    number: "05",
    title: "Support Across Saudi Arabia & International Standards",
    desc: "Deep local capability within the Kingdom aligned with global standards (ASME, API, ASTM, AWS, ISO, ASNT, AMPP, IEC, EN).",
    badge: "Global Reach"
  },
  {
    number: "06",
    title: "Client-Centric & Value-Driven Approach",
    desc: "Tailored inspection solutions designed to maximize added value, protect project schedules, and foster long-term collaborative trust.",
    badge: "Client Centric"
  }
];

export const CORE_VALUES = [
  {
    name: "INTEGRITY",
    subtitle: "Ethical and transparent",
    description: "We uphold the highest ethical standards, technical honesty, and transparent communication across every inspection assignment.",
    accent: "emerald"
  },
  {
    name: "PROFESSIONALISM",
    subtitle: "Competence and accountability",
    description: "Demonstrating deep engineering competence, accountability for our findings, and disciplined execution in all field and office interactions.",
    accent: "blue"
  },
  {
    name: "SAFETY",
    subtitle: "People and environment first",
    description: "Zero harm is our absolute priority. We strictly prioritize occupational health, workforce protection, and environmental stewardship.",
    accent: "amber"
  },
  {
    name: "CUSTOMER FOCUS",
    subtitle: "Long-term partnerships",
    description: "Listening to client expectations, tailoring technical solutions, and building productive, trusting relationships that ensure customer success.",
    accent: "teal"
  },
  {
    name: "CONTINUOUS IMPROVEMENT",
    subtitle: "Innovation and best practices",
    description: "Driving continual improvement through systematic research, modern inspection tools, well-defined metrics, and client feedback.",
    accent: "indigo"
  },
  {
    name: "TEAMWORK",
    subtitle: "Together we achieve more",
    description: "Harnessing multidisciplinary teamwork and seamless coordination between inspectors, clients, and manufacturers to achieve excellence.",
    accent: "emerald"
  }
];

export const COMPANY_COMMITMENTS = [
  {
    title: "HEALTH & SAFETY",
    statement: "Zero harm is our priority in every assignment.",
    desc: "Proactive safety protocols, PPE enforcement, and thorough hazard identification protecting our teams and project personnel."
  },
  {
    title: "ENVIRONMENT",
    statement: "Responsible practices for a cleaner and greener future.",
    desc: "Minimizing environmental impact through sustainable operational procedures and technical oversight on eco-critical assets."
  },
  {
    title: "QUALITY",
    statement: "Consistent, reliable and high-quality inspection services.",
    desc: "Systematic quality control governed by ISO 9001:2015 management principles, certified procedures, and preventive practices."
  },
  {
    title: "PEOPLE",
    statement: "Investing in our people to build a stronger tomorrow.",
    desc: "Continuous technical training, international certification programs, and career progression fostering top-tier engineering talent."
  },
  {
    title: "SUSTAINABILITY",
    statement: "Supporting a safer, more resilient and sustainable world.",
    desc: "Contributing directly to industrial longevity, resource protection, and the transformative goals of Saudi Vision 2030."
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "oil-gas",
    title: "Oil & Gas",
    category: "Upstream & Downstream",
    description: "Comprehensive third-party inspection, vendor surveillance, and NDT for drilling equipment, exploration units, processing facilities, refineries, and transmission infrastructure.",
    criticality: "High Pressure & Critical Containment",
    image: "/images/uiis/industries/oil_and_gas_3d.jpg"
  },
  {
    id: "petrochemical",
    title: "Petrochemical",
    category: "Chemical & Refining Plants",
    description: "Quality assurance across high-temperature reactors, cracking furnaces, fractionation towers, chemical piping networks, and specialized alloy vessels.",
    criticality: "Severe Thermal & Corrosive Service",
    image: "/images/uiis/industries/petrochemical_3d.jpg"
  },
  {
    id: "power-utilities",
    title: "Power & Utilities",
    category: "Generation & Distribution",
    description: "Technical surveillance for heavy power turbines, steam generators, superheaters, high-voltage transformers, switchgear, and utility networks.",
    criticality: "Continuous Grid Reliability",
    image: "/images/uiis/industries/power_utilities_3d.jpg"
  },
  {
    id: "water-infrastructure",
    title: "Water & Infrastructure",
    category: "Desalination & Transmission",
    description: "Inspection support for large-scale seawater desalination facilities, pumping stations, water treatment systems, and strategic transmission pipelines.",
    criticality: "Civil & Hydraulic Integrity",
    image: "/images/uiis/industries/water_infrastructure_3d.jpg"
  },
  {
    id: "industrial-construction",
    title: "Industrial & Construction",
    category: "Heavy Civil & Manufacturing",
    description: "Structural steel verification, modular skids, foundational assemblies, high-capacity equipment installation, and industrial plant construction oversight.",
    criticality: "Structural Integrity & Code Adherence",
    image: "/images/uiis/industries/industrial_construction_3d.jpg"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "vendor-inspection-department",
    number: "01",
    title: "Vendor Inspection Department",
    departmentCode: "VID",
    tagline: "Independent shop inspection across every critical manufacturing stage.",
    shortDesc: "Vendor inspection, also known as third-party inspection, is performed at manufacturer, vendor and sub-vendor facilities on behalf of the client to verify that products are manufactured in accordance with approved requirements, applicable codes, standards and project specifications. Approved engineers perform inspection before, during and after manufacturing, in line with approved ITPs and procedures.",
    technicalCapabilities: [
      "Kick-off Meetings (KOM) and Pre-Inspection Meetings (PIM)",
      "Raw material verification, metallurgy checks & Mill Test Certificate (MTC) review",
      "Welding surveillance (WPS, PQR, WPQ) and destructive test verification",
      "In-process manufacturing surveillance & non-conformance tracking",
      "Hydrostatic, pneumatic, proof testing and Factory Acceptance Tests (FAT)",
      "Final inspection, marking, packing and pre-shipment release certification"
    ],
    stages: ["Kick-off Meeting", "Pre-Inspection Meeting", "Document Review", "Raw Material Inspection", "In-Process Inspection", "Final Inspection", "Final Acceptance Test", "Final Release", "Pre-Shipment Inspection", "Marking, Packing & Loading"],
    visualImage: "/images/uiis/services/vid_3d.jpg",
    accent: "emerald"
  },
  {
    id: "vendor-expediting-department",
    number: "02",
    title: "Vendor Expediting Department",
    departmentCode: "VED",
    tagline: "Monitoring and supporting project and vendor progress to ensure quality and timely delivery.",
    shortDesc: "Expediting is a project support function used to secure the quality and timely delivery of goods and components. It monitors manufacturing progress, quality status, packing readiness, conformity with standards and schedule commitments. Unique Inspection's expediting team helps clients ensure purchased goods are delivered on the planned date, in the agreed quality and at the agreed location.",
    technicalCapabilities: [
      "Manufacturing Progress Monitoring across all supplier tiers",
      "Quality Status Follow-up and bottleneck resolution",
      "Documentation & Schedule Review against master milestones",
      "Packing Readiness Verification and logistics alignment",
      "Supplier Coordination and proactive recovery scheduling",
      "Field and Desk Expediting with transparent progress reporting"
    ],
    stages: ["Manufacturing Progress", "Quality Follow-up", "Documentation Review", "Packing Readiness", "Supplier Coordination", "Delivery Status Reporting"],
    visualImage: "/images/uiis/services/ved_3d.jpg",
    accent: "blue"
  },
  {
    id: "project-inspection-department",
    number: "03",
    title: "Project Inspection Department",
    departmentCode: "PID",
    tagline: "Site inspection covering materials, equipment, and systems from receipt to commissioning.",
    shortDesc: "Project inspection involves inspection of materials, equipment and systems at site during construction, installation, pre-commissioning and final acceptance. It supports quality assurance from receipt of materials through installation and commissioning, ensuring compliance with project specifications.",
    technicalCapabilities: [
      "Incoming Material Inspection & storage preservation verification",
      "Mechanical Equipment & Components erection surveillance",
      "Pressure Gauges & Relief Valves calibration and verification",
      "Pipe & Piping Components fit-up, alignment and bolt torquing",
      "Welding, Coating & NDT Inspection during field construction",
      "Electrical & Instrumentation Equipment installation & pre-commissioning verification"
    ],
    stages: ["Incoming Material Receipt", "Mechanical Equipment", "Piping & Relief Systems", "Welding & NDT", "E&I Verification", "Pre-Commissioning"],
    visualImage: "/images/uiis/services/pid_3d.jpg",
    accent: "emerald"
  },
  {
    id: "vendor-survey-audit",
    number: "04",
    title: "Vendor Survey and Audit",
    departmentCode: "VSA",
    tagline: "Assessing vendor capability, technical facilities, quality systems and production control.",
    shortDesc: "Unique Inspection performs supplier and factory audits to assess whether vendors have the capability, facilities, quality systems and resources required to deliver products in the right quality and within the required time frame. The audit scope includes company existence, ISO certification, quality management review, capacity assessment, and facility reliability.",
    technicalCapabilities: [
      "Supplier Capability & Capacity assessment for critical procurement",
      "Quality Management Systems (QMS) audit compliant with ISO 9001",
      "Certifications & Documents verification and statutory compliance",
      "Facility & Production Control machinery calibration and tooling audit",
      "Workforce & Working Conditions skills and safety assessment",
      "Delivery Reliability scoring and comprehensive audit reports"
    ],
    stages: ["Existence Checks", "QMS Review", "Capacity Assessment", "Facility Control", "Workforce Assessment", "Audit Scorecard"],
    visualImage: "/images/uiis/services/vsa_3d.jpg",
    accent: "amber"
  },
  {
    id: "professional-expertise-supply",
    number: "05",
    title: "Professional and Expertise Supply",
    departmentCode: "PES",
    tagline: "Supplying qualified technical manpower and experienced professionals across K.S.A.",
    shortDesc: "Unique Inspection provides qualified technical manpower and recruitment support across K.S.A., supplying experienced professionals and skilled personnel for short, medium and long-term project requirements across industrial and engineering projects.",
    technicalCapabilities: [
      "Project Managers & Project Engineers",
      "Quality Inspectors & QA/QC Specialists",
      "Drilling Specialists & Offshore / Onshore Specialists",
      "IT Professionals, Auditors and Technicians",
      "Electrical & Instrumentation (E&I) Specialists",
      "Machinery Operators, Equipment Operators & Logistics Support"
    ],
    stages: ["Technical Vetting", "Qualification Matching", "Mobilization", "On-Site Support"],
    visualImage: "/images/uiis/services/pes_3d.jpg",
    accent: "blue"
  },
  {
    id: "ndt-support-services",
    number: "06",
    title: "NDT Support Services",
    departmentCode: "NSS",
    tagline: "Advanced non-destructive testing support for quality, integrity and reliability.",
    shortDesc: "Unique Inspection provides critical NDT solutions and full-scope NDT support services to contractors, fabricators and industrial clients. Modern NDT methods are used during manufacturing, fabrication, construction and in-service inspection to ensure product integrity, reduce risks and maintain quality without destroying the serviceability of the asset.",
    technicalCapabilities: [
      "NDT procedure preparation, review and formal approval support",
      "Training and certification support for Level II inspectors per ASNT TC-1A / CP-189",
      "Level III consulting services and dispute technical resolution",
      "Inspection planning and technical coordination for fabrication and site",
      "Reporting and documentation support with full radiographic / ultrasonic traceability",
      "Support during fabrication, construction and in-service turnaround inspection"
    ],
    stages: ["Procedure Review", "Level III Consulting", "Method Execution", "Certification Support"],
    visualImage: "/images/uiis/services/nss_3d.jpg",
    accent: "emerald"
  },
  {
    id: "packing-inspection",
    number: "07",
    title: "Packing Inspection",
    departmentCode: "PI",
    tagline: "Verifying packing readiness, preservation, marking and loading verification.",
    shortDesc: "Packing inspection ensures that equipment and commodities are properly packaged, labeled, preserved, and secured for storage and international transport. We verify compliance with client packing specifications, export packaging norms, moisture protection, and transit security.",
    technicalCapabilities: [
      "Verification of seaworthy timber packaging and preservation methods",
      "Inspection of desiccants, vapor barrier foils and anti-corrosion protection",
      "Verification of shipping markings, handling instructions and equipment tagging",
      "Stowage, lashing and weight distribution verification during container loading",
      "Photographic documentation of packaging before container sealing",
      "Pre-shipment release certification and handover verification"
    ],
    stages: ["Packaging Inspection", "Preservation Checks", "Markings Verification", "Loading Surveillance", "Release Endorsement"],
    visualImage: "/images/uiis/services/pi_3d.jpg",
    accent: "amber"
  }
];

export const VENDOR_INSPECTION_LIFECYCLE = [
  { step: "01", name: "Kick-off Meeting", desc: "Aligning on project quality scope, communication matrix, and contractual milestones." },
  { step: "02", name: "Pre-Inspection Meeting", desc: "Reviewing Inspection and Test Plans (ITP), witness points, and notification timelines." },
  { step: "03", name: "Document Review", desc: "Checking drawings, WPS, PQR, WPQ, calibration certificates, and material approvals." },
  { step: "04", name: "Raw Material / Incoming Inspection", desc: "Verifying plates, forgings, pipes, heats, and Mill Test Certificates (MTC)." },
  { step: "05", name: "In-Process Inspection", desc: "Surveillance during forming, welding, heat treatment, and dimension checking." },
  { step: "06", name: "Final Inspection", desc: "Witnessing hydrostatic testing, pneumatic testing, dimensional and visual examination." },
  { step: "07", name: "Final Acceptance Test", desc: "Validating Factory Acceptance Tests (FAT), operational checks, and code stampings." },
  { step: "08", name: "Final Release", desc: "Verifying punch list closures, documentation completeness, and issuing release recommendation." },
  { step: "09", name: "Pre-Shipment Inspection", desc: "Checking surface preparation, coating DFT, identification tags, and clean conditions." },
  { step: "10", name: "Marking, Packing & Visual Inspection", desc: "Confirming seaworthy packing, crating, desiccants, markings, and loading verification." }
];

export const VID_BENEFITS = [
  "Independent third-party assurance",
  "Verification of compliance with client requirements",
  "Improved quality and traceability",
  "Reduced risk of delays and non-conformities",
  "Clear electronic reporting and communication",
  "Support for timely release and shipment"
];

export const INSPECTION_COVERAGE = {
  mechanicalEquipment: {
    title: "Mechanical Equipment",
    subtitle: "Static & Rotating Machinery",
    items: [
      "Pressure Vessels",
      "Tanks",
      "Heat Exchangers",
      "Columns",
      "Boilers",
      "Structural Steel",
      "Line Pipe",
      "Fabricated Pipe",
      "Bends, Valves, Flanges and Fittings",
      "Skids",
      "RTR / GRE / GRP Pipes and Fittings",
      "Pumps, Compressors, Turbines, Motors and Rotating Equipment"
    ],
    image: "/images/uiis/commodities/pressure_vessels.jpg"
  },
  coatingsInspection: {
    title: "Coatings Inspection",
    subtitle: "Surface Preparation & Protection",
    description: "Critical and non-critical coating inspection for FBE and liquid coating systems on line pipes, fabricated piping, bends, flanges, fittings, structural steel, offshore platforms and mechanical equipment in accordance with applicable specifications, drawings and manufacturer recommendations.",
    stages: [
      "Surface Preparation",
      "Environmental Checks",
      "DFT (Dry Film Thickness)",
      "Holiday Test",
      "Coating Repair",
      "Final Release"
    ],
    image: "/images/uiis/services/dft_gauge_pipe.jpg"
  },
  electricalInstrumentation: {
    title: "Electrical & Instrumentation",
    subtitle: "Power & Control Systems",
    items: [
      "Alarm Systems",
      "Cables",
      "Control Panels",
      "Current / Voltage Regulators",
      "Motors",
      "Motor Control Centers (MCC)",
      "Rectifiers",
      "Switchgears",
      "Transformers",
      "UPS Systems"
    ],
    image: "/images/uiis/services/ei_switchgear_inspection.jpg"
  }
};

export const VENDOR_EXPEDITING_CAPABILITIES = [
  "Manufacturing Progress Monitoring",
  "Quality Status Follow-up",
  "Documentation & Schedule Review",
  "Packing Readiness Verification",
  "Supplier Coordination",
  "Field and Desk Expediting",
  "Delivery Status Reporting"
];

export const PROJECT_INSPECTION_SCOPE = [
  "Incoming Material Inspection",
  "Mechanical Equipment & Components",
  "Pressure Gauges & Relief Valves",
  "Pipe & Piping Components",
  "Welding, Coating & NDT Inspection",
  "Electrical & Instrumentation Equipment",
  "Installation / Pre-Commissioning Verification"
];

export const VENDOR_SURVEY_AUDIT_FOCUS = [
  "Capability & Capacity",
  "Quality Management System",
  "Certifications & Documents",
  "Facility & Production Control",
  "Workforce & Working Conditions",
  "Delivery Reliability"
];

export const PROFESSIONAL_EXPERTISE_CATEGORIES = [
  "Project Managers",
  "Project Engineers",
  "Quality Inspectors",
  "Drilling Specialists",
  "Offshore & Onshore Specialists",
  "IT Professionals",
  "Auditors and Technicians",
  "E&I Specialists",
  "Machinery Operators",
  "Administration Staff",
  "Equipment Operators",
  "Heavy & Light Drivers"
];

export const NDT_SERVICES_OFFERED = [
  "NDT procedure preparation, review and approval support",
  "Training and certification support for Level II inspectors as per ASNT TC-1A / CP-189 guidance",
  "Level III consulting services",
  "Inspection planning and technical coordination",
  "Reporting and documentation support",
  "Support during fabrication, construction and in-service inspection"
];

export const NDT_METHODS = [
  {
    code: "UT",
    name: "Ultrasonic Testing",
    fullName: "Ultrasonic Testing (UT)",
    desc: "High-frequency ultrasonic sound waves to detect internal discontinuities, laminations, planar weld flaws, and precision thickness measurements.",
    image: "/images/uiis/services/vid_3d.jpg"
  },
  {
    code: "RT",
    name: "Radiographic Testing",
    fullName: "Radiographic Testing (RT)",
    desc: "X-ray and gamma-ray radiographic examination providing permanent volumetric inspection records of weldments, castings, and pressure components.",
    image: "/images/uiis/ndt/rt_radiography_3d.jpg"
  },
  {
    code: "MT",
    name: "Magnetic Particle Testing",
    fullName: "Magnetic Particle Testing (MT)",
    desc: "Magnetic flux leakage technique for revealing surface and near-surface linear cracks in ferromagnetic materials and structural welds.",
    image: "/images/uiis/ndt/mt_magnetic_3d.jpg"
  },
  {
    code: "PT",
    name: "Penetrant Testing",
    fullName: "Liquid Penetrant Testing (PT)",
    desc: "Capillary-action dye penetrant testing for identifying surface-breaking discontinuities across non-porous metals, stainless steels, and alloys.",
    image: "/images/uiis/ndt/pt_penetrant_3d.jpg"
  },
  {
    code: "VT",
    name: "Visual Testing",
    fullName: "Visual Testing (VT)",
    desc: "Direct and remote visual inspection utilizing calibrated gauges and optical borescopes to examine surface conditions, weld profiles, and alignment.",
    image: "/images/uiis/tools/borescope_hd_3d.jpg"
  },
  {
    code: "HT",
    name: "Holiday / Coating Testing",
    fullName: "Holiday / Coating Continuity Testing",
    desc: "High-voltage and low-voltage spark testing to locate pinholes, voids, and continuity defects in protective and anti-corrosive coating films.",
    image: "/images/uiis/tools/coating_thickness_gauge_3d.jpg"
  }
];

export const NDT_BENEFITS = [
  "Product integrity and reliability",
  "Better quality assurance",
  "Reduced rework and production risk",
  "Technical compliance support",
  "Better documentation and traceability"
];

export const INSPECTION_WORKFLOW_STEPS = [
  { step: "01", title: "Inspection Request / NOI", desc: "Receive client inquiry, Notice of Inspection (NOI), and project requirements." },
  { step: "02", title: "Scope & Document Review", desc: "Review ITP, engineering drawings, standards, specifications, and client requirements." },
  { step: "03", title: "Inspector Assignment", desc: "Assign qualified and experienced inspector(s) matched to scope discipline and location." },
  { step: "04", title: "Pre-Inspection Preparation", desc: "Ensure documents, checklists, calibrated tools, consumables, and safety readiness." },
  { step: "05", title: "Site / Vendor Inspection", desc: "Conduct physical inspection as per approved ITP, standards, and applicable codes." },
  { step: "06", title: "Witness & Hold Points", desc: "Witness, verify, and document contractual hold and witness points as per ITP." },
  { step: "07", title: "Findings / NCR / Punch List", desc: "Raise formal findings, Non-Conformance Reports (NCR), or punch lists for deviations." },
  { step: "08", title: "Corrective Action Verification", desc: "Verify vendor corrective actions, conduct re-inspection, and validate proper closure." },
  { step: "09", title: "Final Inspection & Acceptance", desc: "Ensure all contractual requirements are fulfilled and equipment is fully acceptable." },
  { step: "10", title: "Inspection Report", desc: "Issue detailed electronic inspection report with photographs, results, and status." },
  { step: "11", title: "Release / Client Clearance", desc: "Support client for final release, shipment clearance, and successful project completion." }
];

export const CLIENT_DELIVERABLES = [
  { title: "Inspection Reports", desc: "Structured, detailed technical reports issued promptly following each inspection." },
  { title: "High-Resolution Photographs", desc: "Clear photographic evidence documenting equipment condition and markings." },
  { title: "Punch List & NCR Status", desc: "Live tracking of open items, non-conformities, and verified corrective actions." },
  { title: "Document Review Comments", desc: "Detailed engineering comments on drawings, WPS, PQR, and test procedures." },
  { title: "Daily / Weekly Progress Updates", desc: "Regular communication ensuring project managers stay ahead of fabrication status." },
  { title: "Material Release Recommendation", desc: "Formal endorsement confirming items meet specifications prior to dispatch." },
  { title: "Closing Report & Compliance Status", desc: "Comprehensive final documentation validating full contractual conformity." },
  { title: "Complete Dossier Support", desc: "Organized compilation of all manufacturing records and inspection certificates." },
  { title: "Digital Copy (As Required)", desc: "Easily accessible electronic files formatted for seamless project archiving." },
  { title: "Direct Communication with Client", desc: "Dedicated coordination desk for immediate technical consultations." }
];

export const WORKFLOW_CLIENT_BENEFITS = [
  "Clear and Transparent Process",
  "Timely Information",
  "Reduced Risk of Non-Conformity",
  "Better Quality Assurance",
  "On-Time Project Execution",
  "Trusted Independent Partner",
  "Long-Term Value and Reliability"
];

export const TECHNICAL_DISCIPLINES: TechnicalDiscipline[] = [
  { id: "mech-eq", number: "01", title: "Mechanical Equipment", description: "Pressure vessels, tanks, heat exchangers, columns, boilers", scope: "Plate forming, nozzle fit-up, weld surveillance, hydrostatic proof tests, and vessel stamping.", image: "/images/uiis/services/ved_3d.jpg" },
  { id: "piping", number: "02", title: "Piping & Pipeline", description: "Carbon steel, stainless steel, alloy, CRA, spools, fabrication & erection", scope: "Material verification, spool dimensions, bevel prep, weld mapping, and hydrotesting.", image: "/images/uiis/services/pid_3d.jpg" },
  { id: "valves", number: "03", title: "Valves & Flow Control", description: "Gate, globe, check, ball, butterfly valves, actuators", scope: "Shell pressure tests, high/low pressure seat leakage, torque tests, and actuator calibration.", image: "/images/uiis/disciplines/valves_cutaway_3d.jpg" },
  { id: "gre-grp", number: "04", title: "GRE / GRP Piping & Fittings", description: "Pipes, fittings, sleeves, flanges, dismantling joints", scope: "Resin curing checks, lamination surveillance, joint bonding, barcol hardness, and hydrotests.", image: "/images/uiis/services/grp_pipe_inspection.jpg" },
  { id: "coatings", number: "05", title: "Coating & Painting", description: "Surface preparation, coating application, DFT measurement", scope: "Blast profile measurement, environmental conditions, dry film thickness, and holiday testing.", image: "/images/uiis/tools/coating_thickness_gauge_3d.jpg" },
  { id: "structural", number: "06", title: "Structural Steel", description: "Fabrication, welding, dimensional check, bolted structure", scope: "Fit-up inspection, bolt torque verification, beam camber, and ultrasonic weld testing.", image: "/images/uiis/industries/industrial_construction_3d.jpg" },
  { id: "electrical", number: "07", title: "Electrical Equipment", description: "LV/MV switchgear, panels, motors, transformers", scope: "Insulation resistance, dielectric tests, busbar alignment, and factory functional tests.", image: "/images/uiis/disciplines/electrical_switchgear_3d.jpg" },
  { id: "instrumentation", number: "08", title: "Instrumentation", description: "Transmitters, gauges, analyzers, control valves, loop check", scope: "Bench calibration, hydrostatic checks, signal response, wiring integrity, and loop checks.", image: "/images/uiis/services/pes_3d.jpg" },
  { id: "rotating", number: "09", title: "Rotating Equipment", description: "Pumps, compressors, gearboxes, turbines, alignment check", scope: "Rotor dynamic balancing, mechanical run tests, vibration analysis, and shaft alignment.", image: "/images/uiis/disciplines/steam_turbine_rotor_3d.jpg" },
  { id: "special-proc", number: "10", title: "Materials & Special Processes", description: "Raw materials, castings, forgings, rubber lining, cladding and more", scope: "Chemical analysis, mechanical tests, heat treatment charts, PMI, and clad bonding checks.", image: "/images/uiis/about_3d_inspection.jpg" }
];

export const TECHNICAL_STANDARDS = [
  { code: "ASME", name: "American Society of Mechanical Engineers", role: "Boiler & Pressure Vessel Codes (BPVC)" },
  { code: "API", name: "American Petroleum Institute", role: "Piping, Equipment & Inspection Standards" },
  { code: "ASTM", name: "American Society for Testing and Materials", role: "Materials & Testing Standards" },
  { code: "AWS", name: "American Welding Society", role: "Welding Standards & Structural Fabrication" },
  { code: "ISO", name: "International Organization for Standardization", role: "Management & Technical Standards" },
  { code: "ASNT", name: "American Society for Nondestructive Testing", role: "NDT Standards & Qualification" },
  { code: "AMPP", name: "AMPP / NACE International", role: "Coating & Corrosion Prevention Standards" },
  { code: "IEC", name: "International Electrotechnical Commission", role: "Electrical & Instrumentation Codes" },
  { code: "EN", name: "European Standards", role: "European Engineering & Fabrication Standards" }
];

export const INSPECTOR_QUALIFICATIONS = [
  { code: "CSWIP", title: "CSWIP 3.1 Welding Inspector", desc: "Certified international welding surveillance and visual joint verification." },
  { code: "ASNT", title: "ASNT NDT Level II / III", desc: "Qualified non-destructive testing execution and technical Level III consulting." },
  { code: "API", title: "API Inspector (API 510/570/653)", desc: "Authorized inspection for pressure vessels, piping, and storage tanks." },
  { code: "AMPP", title: "AMPP / NACE Coating Inspector (Level II)", desc: "Protective coating and corrosion control certified inspectors." },
  { code: "CLIENT", title: "Client Approved Inspectors", desc: "Qualified and approved inspectors meeting major national and client standards." },
  { code: "TEAM", title: "Experienced Multidiscipline Team", desc: "Cross-functional engineering specialists covering all capital equipment." }
];

export const INSPECTION_TOOLS: ToolEquipment[] = [
  { id: "tool-1", name: "DFT Gauge", category: "Coating Inspection", description: "High-precision digital dry film thickness gauge for magnetic and non-magnetic metallic substrates.", image: "/images/uiis/tools/coating_thickness_gauge_3d.jpg" },
  { id: "tool-2", name: "Ultrasonic Thickness Gauge", category: "NDT Equipment", description: "Precision digital acoustic gauge for residual wall thickness measurement and lamination checks.", image: "/images/uiis/services/vid_3d.jpg" },
  { id: "tool-3", name: "Coating Holiday Detector", category: "Coating Inspection", description: "High-voltage spark tester for locating microscopic pinholes and discontinuities in protective linings.", image: "/images/uiis/tools/coating_thickness_gauge_3d.jpg" },
  { id: "tool-4", name: "Welding Gauge Set", category: "Welding Inspection", description: "Calibrated bridge cam and fillet weld gauges for throat, bevel angle, undercut, and misalignment.", image: "/images/uiis/services/pid_3d.jpg" },
  { id: "tool-5", name: "Calibrated Measuring Tools", category: "Dimensional Control", description: "Vernier calipers, micrometers, and precision dial indicators with valid calibration certificates.", image: "/images/uiis/services/vsa_3d.jpg" },
  { id: "tool-6", name: "Borescope / Videoscope", category: "Remote Visual", description: "High-definition flexible optical videoscopes for internal pipe and vessel cavity inspection.", image: "/images/uiis/tools/borescope_hd_3d.jpg" },
  { id: "tool-7", name: "NDT Equipment (UT / MT / PT)", category: "NDT Support", description: "Flaw detectors, magnetic electromagnetic yokes, and ultraviolet inspection kits.", image: "/images/uiis/ndt/mt_magnetic_3d.jpg" },
  { id: "tool-8", name: "Inspection Photography", category: "Reporting & Traceability", description: "High-resolution digital optical equipment for clear photographic evidence and dossier records.", image: "/images/uiis/hero_refinery_night_3d.jpg" }
];

export const SERVICE_DELIVERY_MODEL = [
  { step: "01", name: "Client Requirement", desc: "Thorough understanding of scope, specifications, standards, and milestones." },
  { step: "02", name: "Planning & Mobilization", desc: "Assigning qualified engineers, reviewing documentation, and preparing schedules." },
  { step: "03", name: "Team Deployment", desc: "Deploying certified personnel to vendor workshops, mills, or project sites." },
  { step: "04", name: "On-Site Execution", desc: "Rigorous inspection, witnessing hold points, and recording findings per ITP." },
  { step: "05", name: "Reporting & Communication", desc: "Issuing transparent, electronic reports with photos within agreed turnaround times." },
  { step: "06", name: "Client Review & Feedback", desc: "Reviewing inspection results, addressing inquiries, and verifying closures." },
  { step: "07", name: "Continuous Support", desc: "Ongoing technical coordination throughout fabrication and construction." },
  { step: "08", name: "Successful Project Delivery", desc: "Ensuring zero defect release, compliance verification, and on-time handover." }
];

export const OUR_PEOPLE_AREAS = [
  { title: "Field Inspection", desc: "Experienced inspectors conducting rigorous physical verification at manufacturing plants and fabrication yards.", image: "/images/uiis/services/pid_site_engineer.jpg" },
  { title: "Project Support", desc: "Dedicated coordination personnel ensuring seamless technical alignment between stakeholders.", image: "/images/uiis/services/pes_technical_team.jpg" },
  { title: "Technical Discussion", desc: "Collaborative engineering consultations resolving non-conformities and optimizing quality plans.", image: "/images/uiis/services/vid_team_review.jpg" },
  { title: "Quality Assurance", desc: "Systematic QA/QC oversight ensuring full adherence to codes, standards, and contractual criteria.", image: "/images/uiis/services/vsa_3d.jpg" },
  { title: "Teamwork on Site", desc: "Cohesive multidisciplinary execution delivering reliable results on complex industrial jobs.", image: "/images/uiis/industries/industrial_construction_3d.jpg" }
];

export const WORLDWIDE_NETWORK_COUNTRIES = {
  middleEast: ["Saudi Arabia", "United Arab Emirates", "Oman", "Bahrain", "Qatar", "Kuwait", "Egypt", "Jordan", "Iran"],
  asiaPacific: ["Pakistan", "Indonesia", "Malaysia", "Taiwan", "Korea", "Japan", "India", "China", "Singapore", "Thailand", "Philippines", "Australia"],
  europe: ["France", "Portugal", "Spain", "UK", "Belgium", "Denmark", "Finland", "Germany", "Holland", "Netherlands", "Norway", "Sweden", "Switzerland", "Czech Republic", "Turkey", "Russia", "Austria", "Italy", "Romania", "Greece", "Hungary", "Ireland", "Poland"],
  americasAfrica: ["South Africa", "Brazil", "Canada", "U.S.A.", "Mexico"]
};

export const COUNTRY_FLAG_CODES: Record<string, string> = {
  "Saudi Arabia": "sa",
  "United Arab Emirates": "ae",
  "Oman": "om",
  "Bahrain": "bh",
  "Qatar": "qa",
  "Kuwait": "kw",
  "Egypt": "eg",
  "Jordan": "jo",
  "Iran": "ir",
  "Pakistan": "pk",
  "Indonesia": "id",
  "Malaysia": "my",
  "Taiwan": "tw",
  "Korea": "kr",
  "Japan": "jp",
  "India": "in",
  "China": "cn",
  "Singapore": "sg",
  "Thailand": "th",
  "Philippines": "ph",
  "Australia": "au",
  "France": "fr",
  "Portugal": "pt",
  "Spain": "es",
  "UK": "gb",
  "Belgium": "be",
  "Denmark": "dk",
  "Finland": "fi",
  "Germany": "de",
  "Holland": "nl",
  "Netherlands": "nl",
  "Norway": "no",
  "Sweden": "se",
  "Switzerland": "ch",
  "Czech Republic": "cz",
  "Turkey": "tr",
  "Russia": "ru",
  "Austria": "at",
  "Italy": "it",
  "Romania": "ro",
  "Greece": "gr",
  "Hungary": "hu",
  "Ireland": "ie",
  "Poland": "pl",
  "South Africa": "za",
  "Brazil": "br",
  "Canada": "ca",
  "U.S.A.": "us",
  "Mexico": "mx"
};

export const GLOBAL_NETWORK: NetworkHub[] = [
  {
    id: "hub-ksa",
    region: "Kingdom of Saudi Arabia & Gulf Region",
    hubType: "Central Operations Hub",
    location: "Al-Khobar, Kingdom of Saudi Arabia",
    coordinates: { x: 58, y: 45 },
    description: "Central operational coordination hub for vendor inspection, vendor expediting, project inspection, vendor survey & audit, and NDT support across Saudi Arabia and the GCC.",
    countries: ["Saudi Arabia", "United Arab Emirates", "Oman", "Bahrain", "Qatar", "Kuwait", "Egypt", "Jordan"],
    status: "Active Operations"
  },
  {
    id: "hub-asia",
    region: "Asia & Pacific Industrial Corridor",
    hubType: "Regional Network Hub",
    location: "Asia-Pacific Region",
    coordinates: { x: 77, y: 52 },
    description: "Network coordination for equipment manufacturing, pressure vessels, fabricated piping, valves, and rotating equipment across major manufacturing centers in Asia.",
    countries: ["China", "India", "Japan", "Korea", "Singapore", "Malaysia", "Indonesia", "Taiwan", "Thailand", "Pakistan", "Philippines", "Australia"],
    status: "Active Operations"
  },
  {
    id: "hub-europe",
    region: "European Manufacturing & Engineering Network",
    hubType: "Regional Network Hub",
    location: "European Region",
    coordinates: { x: 49, y: 32 },
    description: "Qualified inspection network covering heavy equipment, turbomachinery, cryogenic vessels, and specialized alloy fabrication across European industrial facilities.",
    countries: ["Germany", "UK", "France", "Italy", "Spain", "Netherlands", "Belgium", "Norway", "Sweden", "Switzerland", "Austria", "Poland", "Czech Republic", "Turkey"],
    status: "Active Operations"
  },
  {
    id: "hub-americas",
    region: "Americas & International Network",
    hubType: "Coverage Network Zone",
    location: "Americas Region",
    coordinates: { x: 23, y: 40 },
    description: "Inspection and expediting network coverage supporting capital equipment manufacturing, pump packages, electrical controls, and international logistics.",
    countries: ["U.S.A.", "Canada", "Mexico", "Brazil", "South Africa"],
    status: "Active Operations"
  }
];

export const PARTNER_ECOSYSTEM_LOGOS: PartnerLogo[] = [
  { id: "sepco", name: "SEPCO", category: "EPC & Infrastructure", image: "/images/uiis/partners/sepco_card.png" },
  { id: "subsea7", name: "Subsea7", category: "Offshore & Subsea", image: "/images/uiis/partners/subsea7_card.png" },
  { id: "jgc-gulf", name: "JGC Gulf International", category: "EPC & Engineering", image: "/images/uiis/partners/jgc_gulf_card.png" },
  { id: "tecnicas-reunidas", name: "Técnicas Reunidas", category: "Global Engineering & Construction", image: "/images/uiis/partners/tecnicas_reunidas_card.png" },
  { id: "larsen-toubro", name: "Larsen & Toubro", category: "Technology, Engineering & Construction", image: "/images/uiis/partners/larsen_toubro_card.png" },
  { id: "saipem", name: "Saipem", category: "Energy Engineering & Infrastructure", image: "/images/uiis/partners/saipem_card.png" },
  { id: "cbi", name: "CB&I", category: "Storage & Energy Infrastructure", image: "/images/uiis/partners/cbi_card.png" },
  { id: "klc", name: "KLC", category: "Contracting & Engineering", image: "/images/uiis/partners/klc_card.png" },
  { id: "br-cat", name: "BR CAT International Company", category: "Industrial Construction & Contracting", image: "/images/uiis/partners/br_cat_card.png" },
  { id: "wison", name: "Wison", category: "Engineering & High-Tech Services", image: "/images/uiis/partners/wison_card.png" },
  { id: "osc", name: "OSC", category: "Oil & Gas Industrial Services", image: "/images/uiis/partners/osc_card.png" },
  { id: "sinopec", name: "Sinopec", category: "Energy & Chemical Engineering", image: "/images/uiis/partners/sinopec_card.png" }
];
