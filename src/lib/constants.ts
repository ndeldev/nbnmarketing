// Brand name - easy to find/replace when brand is finalized
export const BRAND_NAME = "Meridian";
export const BRAND_TAGLINE = "Capital Markets Communications";

// Site configuration
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://meridian.agency";
export const SITE_DESCRIPTION = `Full-stack investor relations for public companies. We help issuers build market value through strategic communications across North America and Europe.`;

// SEO Keywords for capital markets positioning
export const SITE_KEYWORDS = [
  "investor relations agency",
  "capital markets communications",
  "TSX-V marketing",
  "CSE investor awareness",
  "Frankfurt listing support",
  "shareholder acquisition",
  "public company IR",
  "investor awareness campaigns",
  "European investor outreach",
  "stock promotion services",
] as const;

// Navigation links
export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Services data
export const SERVICES = [
  {
    id: "advertising",
    title: "Digital Advertising",
    shortDescription: "Reach investors with precision-targeted campaigns",
    description: "Multi-platform digital advertising across Google, Bing, and programmatic networks targeting self-directed investors.",
    icon: "Target",
  },
  {
    id: "content",
    title: "Content & Publications",
    shortDescription: "Build credibility through premium media placement",
    description: "CEO interviews, company profiles, and editorial features placed in leading financial publications.",
    icon: "FileText",
  },
  {
    id: "europe",
    title: "European Distribution",
    shortDescription: "Expand your reach to DACH region investors",
    description: "Targeted campaigns for Frankfurt-listed issuers and companies seeking European retail investor exposure.",
    icon: "Globe",
  },
  {
    id: "email",
    title: "Email Marketing",
    shortDescription: "Connect directly with active investors",
    description: "Permission-based email campaigns to verified investor databases, segmented by criteria and sector interest.",
    icon: "Mail",
  },
  {
    id: "social",
    title: "Social & Video",
    shortDescription: "Build executive visibility and thought leadership",
    description: "LinkedIn thought leadership, YouTube investor presentations, and CEO video content that attracts attention.",
    icon: "Video",
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    shortDescription: "Measure campaign impact on market performance",
    description: "Real-time dashboards, shareholder acquisition tracking, and ROI analysis correlated with trading metrics.",
    icon: "BarChart3",
  },
] as const;

// Audience segments for services section
export const AUDIENCE_SEGMENTS = [
  {
    id: "startups",
    label: "Emerging",
    description: "Early-stage public companies building initial shareholder base",
  },
  {
    id: "scaleups",
    label: "Growth",
    description: "Companies with catalysts ready to expand market awareness",
  },
  {
    id: "enterprise",
    label: "Established",
    description: "Mature issuers seeking sustained investor engagement",
  },
] as const;

// Social links
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/meridian-agency",
  twitter: "https://twitter.com/meridianagency",
} as const;

// Contact info
export const CONTACT_EMAIL = "hello@meridian.agency";

// Detailed service data for individual service pages
export interface ServiceDetail {
  headline: string;
  tagline: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  advertising: {
    headline: "Digital Advertising for Investor Acquisition",
    tagline: "Precision-targeted campaigns that put your company in front of active investors",
    features: [
      {
        icon: "Search",
        title: "Search Advertising",
        description: "Google and Bing campaigns targeting investors actively researching opportunities in your sector.",
      },
      {
        icon: "Globe",
        title: "Programmatic Display",
        description: "Banner and native ads across premium financial websites and investor-focused publications.",
      },
      {
        icon: "Target",
        title: "Audience Targeting",
        description: "Custom audiences built from investor databases, trading behavior, and financial interest signals.",
      },
      {
        icon: "RefreshCw",
        title: "Retargeting",
        description: "Re-engage visitors who viewed your investor presentation but haven't yet taken action.",
      },
      {
        icon: "DollarSign",
        title: "Budget Optimization",
        description: "Allocate spend across channels to maximize qualified investor visits and minimize cost per acquisition.",
      },
      {
        icon: "BarChart",
        title: "Performance Tracking",
        description: "Track campaign performance correlated with trading volume and shareholder growth.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Strategy & Targeting",
        description: "Define your ideal investor profile and build targeting parameters across platforms.",
      },
      {
        step: 2,
        title: "Campaign Setup",
        description: "Build campaigns with proper tracking, creative assets, and landing page optimization.",
      },
      {
        step: 3,
        title: "Launch & Optimize",
        description: "Deploy campaigns with ongoing bid management, A/B testing, and budget allocation.",
      },
      {
        step: 4,
        title: "Report & Scale",
        description: "Analyze results, correlate with market activity, and scale successful campaigns.",
      },
    ],
    benefits: [
      {
        icon: "Target",
        title: "Precise Targeting",
        description: "Reach investors actively researching opportunities in your sector and market cap range.",
      },
      {
        icon: "Zap",
        title: "Fast Results",
        description: "Generate investor interest immediately while building long-term shareholder awareness.",
      },
      {
        icon: "BarChart3",
        title: "Measurable ROI",
        description: "Track every dollar spent to its impact on trading volume and shareholder acquisition.",
      },
      {
        icon: "Sliders",
        title: "Flexible Scaling",
        description: "Increase or decrease spend based on corporate catalysts and market conditions.",
      },
    ],
    faqs: [
      {
        question: "What platforms do you advertise on?",
        answer: "We run campaigns across Google, Bing, and programmatic networks including major financial publishers. Platform mix depends on your target investor profile and budget.",
      },
      {
        question: "How do you target investors specifically?",
        answer: "We use a combination of keyword targeting, custom audiences from investor databases, interest-based targeting on financial topics, and retargeting of your website visitors.",
      },
      {
        question: "What budget do we need for effective campaigns?",
        answer: "Effective investor acquisition campaigns typically start at $10K/month in ad spend. This allows for meaningful testing and optimization across platforms.",
      },
      {
        question: "How do you measure campaign success?",
        answer: "We track qualified website visits, investor presentation views, and broker inquiries. We also correlate campaign timing with trading volume and shareholder count changes.",
      },
    ],
    relatedServices: ["content", "email", "analytics"],
  },
  content: {
    headline: "Content & Publications",
    tagline: "Build credibility with premium media placement and executive thought leadership",
    features: [
      {
        icon: "FileText",
        title: "CEO Interviews",
        description: "Video and written interviews with your CEO placed on major financial media platforms.",
      },
      {
        icon: "BookOpen",
        title: "Company Profiles",
        description: "In-depth company profiles published on investor-focused websites and newsletters.",
      },
      {
        icon: "Newspaper",
        title: "Press Distribution",
        description: "Strategic press release distribution to financial media and wire services.",
      },
      {
        icon: "Award",
        title: "Thought Leadership",
        description: "Executive bylines and contributed articles in industry publications.",
      },
      {
        icon: "BarChart",
        title: "Research Coverage",
        description: "Sponsored research reports and analyst coverage to build institutional awareness.",
      },
      {
        icon: "Globe",
        title: "Media Relations",
        description: "Ongoing relationships with financial journalists covering your sector.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Story Development",
        description: "Identify your most compelling investment thesis and key differentiators.",
      },
      {
        step: 2,
        title: "Content Creation",
        description: "Produce interview content, profiles, and articles that resonate with investors.",
      },
      {
        step: 3,
        title: "Media Placement",
        description: "Secure placements in publications that reach your target investor audience.",
      },
      {
        step: 4,
        title: "Amplification",
        description: "Promote content through paid channels and social media for maximum reach.",
      },
    ],
    benefits: [
      {
        icon: "TrendingUp",
        title: "Credibility Building",
        description: "Third-party coverage builds trust that your own marketing cannot achieve alone.",
      },
      {
        icon: "Users",
        title: "Broader Reach",
        description: "Access audiences through established financial media with built-in readership.",
      },
      {
        icon: "Share2",
        title: "SEO Value",
        description: "Quality backlinks and brand mentions improve your search visibility over time.",
      },
      {
        icon: "Target",
        title: "Investor Education",
        description: "Help potential investors understand your story through in-depth content.",
      },
    ],
    faqs: [
      {
        question: "What publications do you work with?",
        answer: "We have relationships with major financial publishers including Investing News Network, Stockhouse, CEO.ca, and sector-specific outlets covering mining, tech, and life sciences.",
      },
      {
        question: "How long does content production take?",
        answer: "CEO interviews typically take 2-3 weeks from scheduling to publication. Company profiles take 3-4 weeks including research, writing, and client review.",
      },
      {
        question: "Do you guarantee placements?",
        answer: "We guarantee placement in our partner publications. For earned media (journalist coverage), we secure opportunities but cannot guarantee specific outlets.",
      },
      {
        question: "Can you ghostwrite for our executives?",
        answer: "Yes, we provide full ghostwriting services for executive thought leadership articles, ensuring your team's expertise reaches the market without consuming their time.",
      },
    ],
    relatedServices: ["advertising", "social", "email"],
  },
  europe: {
    headline: "European Distribution",
    tagline: "Reach retail investors across Germany, Austria, and Switzerland",
    features: [
      {
        icon: "Globe",
        title: "DACH Campaigns",
        description: "Targeted advertising and content campaigns reaching German-speaking investors.",
      },
      {
        icon: "FileText",
        title: "German Content",
        description: "Professionally translated and localized content for European audiences.",
      },
      {
        icon: "Users",
        title: "Database Access",
        description: "Access to verified European investor databases for email and direct outreach.",
      },
      {
        icon: "Newspaper",
        title: "EU Media Placement",
        description: "Content placement in German-language financial publications and portals.",
      },
      {
        icon: "Building",
        title: "Frankfurt Support",
        description: "Specialized support for dual-listed companies on Frankfurt exchange.",
      },
      {
        icon: "BarChart3",
        title: "EU Analytics",
        description: "Track European investor engagement and trading activity separately.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Market Analysis",
        description: "Assess European investor appetite for your sector and investment thesis.",
      },
      {
        step: 2,
        title: "Localization",
        description: "Translate and adapt your investor materials for German-speaking audiences.",
      },
      {
        step: 3,
        title: "Campaign Launch",
        description: "Deploy coordinated advertising, content, and email campaigns in DACH region.",
      },
      {
        step: 4,
        title: "Performance Review",
        description: "Analyze European investor acquisition and trading activity metrics.",
      },
    ],
    benefits: [
      {
        icon: "Globe",
        title: "New Investor Pool",
        description: "Access European retail investors who actively trade North American securities.",
      },
      {
        icon: "Clock",
        title: "Extended Trading",
        description: "European investors can provide trading activity outside North American hours.",
      },
      {
        icon: "TrendingUp",
        title: "Diversification",
        description: "Reduce reliance on any single geographic investor base.",
      },
      {
        icon: "Building",
        title: "Frankfurt Listing Value",
        description: "Maximize the investor relations value of your Frankfurt dual-listing.",
      },
    ],
    faqs: [
      {
        question: "Do I need a Frankfurt listing for European campaigns?",
        answer: "No, European investors can purchase shares on TSX-V, CSE, and OTC markets directly. However, a Frankfurt listing makes trading more convenient and can increase campaign effectiveness.",
      },
      {
        question: "What languages do you support?",
        answer: "We produce content in German for DACH markets. We work with professional financial translators to ensure accuracy and appropriate terminology.",
      },
      {
        question: "How large is the European retail investor market?",
        answer: "Germany alone has over 12 million retail investors, with strong interest in resource and technology sectors. The DACH region represents significant untapped potential for most issuers.",
      },
      {
        question: "How do you track European investor engagement?",
        answer: "We use geo-targeted analytics, European-specific landing pages, and trading data analysis to measure campaign performance in the DACH region specifically.",
      },
    ],
    relatedServices: ["advertising", "content", "email"],
  },
  email: {
    headline: "Email Marketing",
    tagline: "Connect directly with verified investor databases",
    features: [
      {
        icon: "Mail",
        title: "Database Access",
        description: "Permission-based email campaigns to verified self-directed investor lists.",
      },
      {
        icon: "Users",
        title: "Audience Segmentation",
        description: "Target by investment criteria, portfolio size, sector interest, and geography.",
      },
      {
        icon: "PenTool",
        title: "Content Creation",
        description: "Compelling email content that drives opens, clicks, and investor action.",
      },
      {
        icon: "BarChart3",
        title: "Performance Analytics",
        description: "Track opens, clicks, website visits, and downstream investor engagement.",
      },
      {
        icon: "Zap",
        title: "Automation",
        description: "Automated sequences for investor nurturing and catalyst announcements.",
      },
      {
        icon: "Shield",
        title: "Compliance",
        description: "All campaigns structured for compliance with securities regulations.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audience Definition",
        description: "Define target investor profile and select appropriate database segments.",
      },
      {
        step: 2,
        title: "Content Development",
        description: "Create compelling email content with clear calls-to-action.",
      },
      {
        step: 3,
        title: "Campaign Deployment",
        description: "Send campaigns with proper tracking and deliverability optimization.",
      },
      {
        step: 4,
        title: "Analysis & Follow-up",
        description: "Analyze engagement metrics and deploy follow-up sequences to engaged investors.",
      },
    ],
    benefits: [
      {
        icon: "Target",
        title: "Direct Access",
        description: "Reach investors directly in their inbox without intermediary platforms.",
      },
      {
        icon: "DollarSign",
        title: "Cost Efficiency",
        description: "Email remains one of the most cost-effective channels for investor outreach.",
      },
      {
        icon: "Repeat",
        title: "Relationship Building",
        description: "Nurture investor interest over time through regular communication.",
      },
      {
        icon: "Zap",
        title: "Catalyst Support",
        description: "Quickly communicate important news and corporate developments.",
      },
    ],
    faqs: [
      {
        question: "How do you ensure email deliverability?",
        answer: "We use authenticated sending domains, maintain list hygiene, follow best practices for content, and monitor sender reputation to ensure high inbox placement rates.",
      },
      {
        question: "What investor databases do you have access to?",
        answer: "We work with multiple investor database providers covering self-directed investors in North America and Europe, with filtering by sector interest, portfolio size, and trading activity.",
      },
      {
        question: "How often can we email investors?",
        answer: "Campaign frequency depends on your news flow and the specific database. Typically, 1-2 campaigns per month is sustainable without list fatigue, with additional sends for material news.",
      },
      {
        question: "Is investor email marketing compliant with regulations?",
        answer: "Yes, all campaigns use permission-based lists and include proper disclaimers. We structure campaigns to comply with securities regulations and email marketing laws.",
      },
    ],
    relatedServices: ["advertising", "content", "analytics"],
  },
  social: {
    headline: "Social & Video",
    tagline: "Build executive visibility and investor engagement through social channels",
    features: [
      {
        icon: "Linkedin",
        title: "LinkedIn Strategy",
        description: "Executive thought leadership and company page optimization for investor visibility.",
      },
      {
        icon: "Video",
        title: "CEO Video Content",
        description: "Professional investor presentation videos and executive interview content.",
      },
      {
        icon: "Youtube",
        title: "YouTube Channel",
        description: "Build a video library of investor education content and company updates.",
      },
      {
        icon: "Twitter",
        title: "Twitter/X Presence",
        description: "Strategic posting and engagement for real-time investor communication.",
      },
      {
        icon: "TrendingUp",
        title: "Community Building",
        description: "Build and engage an active community of retail investors and followers.",
      },
      {
        icon: "BarChart3",
        title: "Social Analytics",
        description: "Track engagement, reach, and correlation with investor interest.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Strategy",
        description: "Review current social presence and develop platform-specific strategies.",
      },
      {
        step: 2,
        title: "Content Calendar",
        description: "Plan content mix including videos, posts, and engagement activities.",
      },
      {
        step: 3,
        title: "Production & Publishing",
        description: "Produce content and maintain consistent publishing schedule.",
      },
      {
        step: 4,
        title: "Engagement & Growth",
        description: "Monitor comments, engage with followers, and grow audience organically.",
      },
    ],
    benefits: [
      {
        icon: "Users",
        title: "Executive Visibility",
        description: "Position your CEO as a thought leader that investors want to follow.",
      },
      {
        icon: "MessageSquare",
        title: "Direct Engagement",
        description: "Respond to investor questions and build relationships at scale.",
      },
      {
        icon: "Share2",
        title: "Organic Reach",
        description: "Quality content gets shared, extending your reach beyond paid channels.",
      },
      {
        icon: "Video",
        title: "Visual Storytelling",
        description: "Video content communicates your story more effectively than text alone.",
      },
    ],
    faqs: [
      {
        question: "Should our CEO be active on social media?",
        answer: "Executive social presence, particularly on LinkedIn, can significantly impact investor perception. We help CEOs build authentic presence without consuming excessive time.",
      },
      {
        question: "What type of video content works best?",
        answer: "Short-form investor updates, site visit footage, and CEO commentary on industry trends perform well. We also produce longer investor presentation videos for detailed company overviews.",
      },
      {
        question: "How do you handle negative comments?",
        answer: "We monitor all channels and have protocols for responding to legitimate questions while appropriately managing negative or misleading comments.",
      },
      {
        question: "Can you manage our social accounts entirely?",
        answer: "Yes, we offer full social media management including content creation, posting, and engagement. We also offer hybrid models where we provide content for your team to post.",
      },
    ],
    relatedServices: ["content", "advertising", "analytics"],
  },
  analytics: {
    headline: "Analytics & Reporting",
    tagline: "Measure campaign impact on shareholder acquisition and market performance",
    features: [
      {
        icon: "BarChart3",
        title: "Campaign Dashboards",
        description: "Real-time visibility into campaign performance across all channels.",
      },
      {
        icon: "Users",
        title: "Shareholder Tracking",
        description: "Monitor shareholder count growth and beneficial ownership changes.",
      },
      {
        icon: "TrendingUp",
        title: "Market Correlation",
        description: "Correlate marketing activity with trading volume and price movement.",
      },
      {
        icon: "Globe",
        title: "Geographic Analysis",
        description: "Understand where your investors are located and how they engage.",
      },
      {
        icon: "FileText",
        title: "Monthly Reports",
        description: "Comprehensive monthly reports with insights and recommendations.",
      },
      {
        icon: "Target",
        title: "ROI Analysis",
        description: "Calculate cost per acquired shareholder and campaign return on investment.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Tracking Setup",
        description: "Implement comprehensive tracking across website, ads, and email.",
      },
      {
        step: 2,
        title: "Dashboard Configuration",
        description: "Build custom dashboards showing metrics that matter to your business.",
      },
      {
        step: 3,
        title: "Ongoing Monitoring",
        description: "Continuously monitor campaign performance and market indicators.",
      },
      {
        step: 4,
        title: "Reporting & Optimization",
        description: "Deliver regular reports with actionable recommendations for improvement.",
      },
    ],
    benefits: [
      {
        icon: "Eye",
        title: "Full Visibility",
        description: "See exactly how your IR budget is performing across all channels.",
      },
      {
        icon: "Target",
        title: "Data-Driven Decisions",
        description: "Allocate budget to channels and tactics that deliver results.",
      },
      {
        icon: "TrendingUp",
        title: "Market Insights",
        description: "Understand how marketing activity correlates with market performance.",
      },
      {
        icon: "DollarSign",
        title: "ROI Clarity",
        description: "Know your cost per acquired shareholder and campaign effectiveness.",
      },
    ],
    faqs: [
      {
        question: "What metrics do you track?",
        answer: "We track website traffic, engagement, lead generation, email performance, social metrics, and correlate with shareholder count, trading volume, and market cap changes.",
      },
      {
        question: "How do you attribute market changes to marketing?",
        answer: "While direct attribution is complex in public markets, we use timing analysis, geographic correlation, and statistical methods to understand marketing impact.",
      },
      {
        question: "Can we access dashboards directly?",
        answer: "Yes, clients receive login access to real-time dashboards. We also provide training on how to interpret the data and make decisions.",
      },
      {
        question: "How often do you report?",
        answer: "We provide weekly campaign updates and comprehensive monthly reports with analysis and recommendations. Additional reporting is available for active campaigns.",
      },
    ],
    relatedServices: ["advertising", "email", "social"],
  },
};
