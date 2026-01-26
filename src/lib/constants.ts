// Brand name - easy to find/replace when brand is finalized
export const BRAND_NAME = "Meridian";
export const BRAND_TAGLINE = "B2B Marketing That Drives Growth";

// Site configuration
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://meridian.agency";
export const SITE_DESCRIPTION = `${BRAND_NAME} is a B2B marketing agency specializing in publications, newsletters, outreach campaigns, ads, SEO, and technical SEO.`;

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
    id: "publications",
    title: "Publications",
    shortDescription: "Industry-leading content that establishes thought leadership",
    description: "Create compelling whitepapers, reports, and industry publications that position your brand as an authority in your space.",
    icon: "FileText",
  },
  {
    id: "newsletters",
    title: "Newsletters",
    shortDescription: "Engage your audience with consistent, valuable content",
    description: "Build and nurture subscriber relationships with strategic email newsletters that drive engagement and conversions.",
    icon: "Mail",
  },
  {
    id: "outreach",
    title: "Outreach",
    shortDescription: "Connect with decision-makers at scale",
    description: "Strategic outreach campaigns that open doors and build meaningful B2B relationships with your target accounts.",
    icon: "Users",
  },
  {
    id: "campaigns",
    title: "Campaigns",
    shortDescription: "Integrated marketing campaigns that deliver results",
    description: "Multi-channel marketing campaigns designed to generate qualified leads and accelerate your sales pipeline.",
    icon: "Megaphone",
  },
  {
    id: "ads",
    title: "Paid Advertising",
    shortDescription: "Precision-targeted ads that maximize ROI",
    description: "Data-driven paid advertising across LinkedIn, Google, and programmatic channels to reach your ideal buyers.",
    icon: "Target",
  },
  {
    id: "seo",
    title: "SEO",
    shortDescription: "Organic visibility that compounds over time",
    description: "Content-driven SEO strategies that improve your search rankings and drive qualified organic traffic.",
    icon: "Search",
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    shortDescription: "The foundation for search success",
    description: "Technical audits, site architecture optimization, and Core Web Vitals improvements that maximize your search performance.",
    icon: "Code",
  },
] as const;

// Audience segments for services section
export const AUDIENCE_SEGMENTS = [
  {
    id: "startups",
    label: "Startups",
    description: "Early-stage companies looking to establish market presence",
  },
  {
    id: "scaleups",
    label: "Scale-ups",
    description: "Growing companies ready to accelerate their marketing",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    description: "Large organizations seeking strategic marketing partners",
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
  publications: {
    headline: "B2B Publications & PR",
    tagline: "Establish thought leadership with strategic content that positions your brand as an industry authority",
    features: [
      {
        icon: "FileText",
        title: "Whitepapers & Reports",
        description: "In-depth research publications that showcase your expertise and generate high-quality leads.",
      },
      {
        icon: "BookOpen",
        title: "Industry Analysis",
        description: "Data-driven market analysis that positions your company as a trusted industry voice.",
      },
      {
        icon: "Newspaper",
        title: "Press Releases",
        description: "Strategic PR distribution to major business publications and industry media outlets.",
      },
      {
        icon: "Award",
        title: "Thought Leadership",
        description: "Executive bylines and contributed articles in top-tier industry publications.",
      },
      {
        icon: "BarChart",
        title: "Research Studies",
        description: "Original research that generates media coverage and establishes market authority.",
      },
      {
        icon: "Globe",
        title: "Media Relations",
        description: "Ongoing relationships with journalists and editors in your industry vertical.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Strategy",
        description: "We analyze your market position, competitors, and target audience to develop a content strategy that differentiates your brand.",
      },
      {
        step: 2,
        title: "Content Development",
        description: "Our writers and researchers create compelling, data-backed content that resonates with your audience.",
      },
      {
        step: 3,
        title: "Editorial Review",
        description: "Rigorous editing and fact-checking ensures every piece meets the highest standards of quality.",
      },
      {
        step: 4,
        title: "Distribution & Promotion",
        description: "Strategic placement across owned, earned, and paid channels to maximize reach and impact.",
      },
    ],
    benefits: [
      {
        icon: "TrendingUp",
        title: "Increased Authority",
        description: "Position your brand as the go-to expert in your industry through consistent, high-quality content.",
      },
      {
        icon: "Users",
        title: "Lead Generation",
        description: "Gated content like whitepapers and reports drive qualified leads into your sales funnel.",
      },
      {
        icon: "Share2",
        title: "Media Coverage",
        description: "Earn mentions in industry publications and business media through strategic PR efforts.",
      },
      {
        icon: "Target",
        title: "Brand Differentiation",
        description: "Stand out from competitors with unique insights and original research.",
      },
    ],
    faqs: [
      {
        question: "How long does it take to produce a whitepaper?",
        answer: "A comprehensive whitepaper typically takes 4-6 weeks from initial research to final design. This includes research, interviews, writing, editing, and professional design. Rush timelines are available for time-sensitive topics.",
      },
      {
        question: "Do you handle distribution and promotion?",
        answer: "Yes, we offer end-to-end publication services including distribution strategy, press release writing, media outreach, and promotional campaigns to maximize the reach and impact of your content.",
      },
      {
        question: "Can you ghostwrite for our executives?",
        answer: "Absolutely. We specialize in executive ghostwriting for bylined articles, LinkedIn content, and contributed pieces in industry publications. We capture your executives' voice and expertise.",
      },
      {
        question: "What industries do you specialize in?",
        answer: "We have deep experience in B2B technology, SaaS, fintech, healthcare tech, and professional services. Our writers have industry-specific expertise to create credible, authoritative content.",
      },
    ],
    relatedServices: ["newsletters", "campaigns", "seo"],
  },
  newsletters: {
    headline: "Newsletter Marketing Services",
    tagline: "Build lasting relationships with your audience through strategic email newsletters that drive engagement",
    features: [
      {
        icon: "Mail",
        title: "Newsletter Strategy",
        description: "Develop a content calendar and editorial strategy aligned with your business goals.",
      },
      {
        icon: "PenTool",
        title: "Content Creation",
        description: "Professional writing and design for newsletters that your subscribers actually want to read.",
      },
      {
        icon: "Users",
        title: "List Growth",
        description: "Proven tactics to grow your subscriber base with engaged, qualified prospects.",
      },
      {
        icon: "BarChart3",
        title: "Analytics & Optimization",
        description: "Track performance metrics and continuously optimize for higher engagement.",
      },
      {
        icon: "Zap",
        title: "Automation",
        description: "Set up automated sequences for onboarding, nurturing, and re-engagement.",
      },
      {
        icon: "Shield",
        title: "Deliverability",
        description: "Ensure your emails reach the inbox with proper authentication and list hygiene.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Strategy",
        description: "We review your current email program, audience, and goals to create a tailored newsletter strategy.",
      },
      {
        step: 2,
        title: "Content Planning",
        description: "Develop an editorial calendar with themes, formats, and cadence that keeps subscribers engaged.",
      },
      {
        step: 3,
        title: "Production & Send",
        description: "Our team handles writing, design, and deployment so you can focus on your business.",
      },
      {
        step: 4,
        title: "Analyze & Iterate",
        description: "Monthly reporting and optimization recommendations to continuously improve performance.",
      },
    ],
    benefits: [
      {
        icon: "MessageSquare",
        title: "Direct Audience Access",
        description: "Build a direct communication channel that you own, independent of social media algorithms.",
      },
      {
        icon: "Heart",
        title: "Stronger Relationships",
        description: "Regular touchpoints keep your brand top-of-mind and build trust with your audience.",
      },
      {
        icon: "DollarSign",
        title: "Revenue Driver",
        description: "Email consistently delivers the highest ROI of any marketing channel for B2B companies.",
      },
      {
        icon: "Repeat",
        title: "Retention & Upsell",
        description: "Keep existing customers engaged and informed about new products and services.",
      },
    ],
    faqs: [
      {
        question: "How often should we send our newsletter?",
        answer: "The optimal frequency depends on your audience and content quality. Most B2B companies see best results with weekly or bi-weekly newsletters. We'll help you find the right cadence based on engagement data.",
      },
      {
        question: "What email platforms do you work with?",
        answer: "We work with all major email marketing platforms including HubSpot, Mailchimp, Klaviyo, ConvertKit, ActiveCampaign, and enterprise solutions like Marketo and Pardot.",
      },
      {
        question: "Can you help grow our subscriber list?",
        answer: "Yes, list growth is a core part of our newsletter service. We implement proven tactics including content upgrades, lead magnets, landing page optimization, and co-registration partnerships.",
      },
      {
        question: "Do you provide newsletter templates?",
        answer: "We design custom newsletter templates that match your brand identity and are optimized for readability across email clients and devices. Templates are mobile-responsive and accessible.",
      },
    ],
    relatedServices: ["publications", "outreach", "campaigns"],
  },
  outreach: {
    headline: "B2B Outreach Marketing",
    tagline: "Connect with decision-makers at your target accounts through strategic, personalized outreach",
    features: [
      {
        icon: "Target",
        title: "Account Targeting",
        description: "Identify and prioritize high-value accounts based on fit, intent, and engagement signals.",
      },
      {
        icon: "UserPlus",
        title: "Contact Research",
        description: "Build verified contact lists with accurate emails and direct phone numbers.",
      },
      {
        icon: "MessageCircle",
        title: "Personalized Messaging",
        description: "Craft compelling outreach sequences tailored to each prospect's role and pain points.",
      },
      {
        icon: "RefreshCw",
        title: "Multi-Channel Sequences",
        description: "Coordinate outreach across email, LinkedIn, and phone for maximum response rates.",
      },
      {
        icon: "Calendar",
        title: "Meeting Scheduling",
        description: "Handle the back-and-forth to get qualified meetings on your sales team's calendar.",
      },
      {
        icon: "LineChart",
        title: "Performance Tracking",
        description: "Detailed analytics on open rates, reply rates, and meetings booked.",
      },
    ],
    process: [
      {
        step: 1,
        title: "ICP Definition",
        description: "Define your ideal customer profile and build a targeted account list that matches your best customers.",
      },
      {
        step: 2,
        title: "Messaging Development",
        description: "Create personalized messaging frameworks and sequences that resonate with each persona.",
      },
      {
        step: 3,
        title: "Campaign Execution",
        description: "Launch multi-touch outreach campaigns with consistent follow-up and optimization.",
      },
      {
        step: 4,
        title: "Lead Handoff",
        description: "Qualified meetings are seamlessly handed off to your sales team with full context.",
      },
    ],
    benefits: [
      {
        icon: "Zap",
        title: "Faster Pipeline",
        description: "Generate qualified meetings with decision-makers without the long wait of inbound marketing.",
      },
      {
        icon: "Target",
        title: "Precision Targeting",
        description: "Focus your efforts on the exact companies and roles most likely to buy.",
      },
      {
        icon: "TrendingUp",
        title: "Scalable Growth",
        description: "Systematically expand your market presence without proportionally increasing headcount.",
      },
      {
        icon: "Handshake",
        title: "Quality Conversations",
        description: "Start relationships with personalized outreach that demonstrates genuine understanding.",
      },
    ],
    faqs: [
      {
        question: "Is cold outreach still effective in B2B?",
        answer: "Yes, when done right. Personalized, relevant outreach to well-researched prospects consistently generates qualified meetings. The key is quality over quantity and genuine value in your messaging.",
      },
      {
        question: "How do you ensure email deliverability?",
        answer: "We use proper email authentication (SPF, DKIM, DMARC), warm up new domains gradually, maintain list hygiene, and follow best practices to ensure high inbox placement rates.",
      },
      {
        question: "What response rates should we expect?",
        answer: "Response rates vary by industry and offer, but our campaigns typically achieve 15-25% response rates with 5-10% positive reply rates. We optimize continuously to improve these metrics.",
      },
      {
        question: "Do you integrate with our CRM?",
        answer: "Yes, we integrate with Salesforce, HubSpot, and other major CRMs to ensure seamless lead handoff and activity tracking. Your sales team will have full visibility into outreach history.",
      },
    ],
    relatedServices: ["campaigns", "newsletters", "ads"],
  },
  campaigns: {
    headline: "B2B Marketing Campaigns",
    tagline: "Integrated multi-channel campaigns that generate demand and accelerate your sales pipeline",
    features: [
      {
        icon: "Megaphone",
        title: "Campaign Strategy",
        description: "Develop integrated campaign plans aligned with your sales goals and buyer journey.",
      },
      {
        icon: "Layers",
        title: "Multi-Channel Execution",
        description: "Coordinate messaging across content, email, social, paid media, and events.",
      },
      {
        icon: "FileText",
        title: "Content Development",
        description: "Create campaign assets including landing pages, emails, ads, and sales collateral.",
      },
      {
        icon: "Rocket",
        title: "Launch Management",
        description: "Handle all aspects of campaign deployment, coordination, and optimization.",
      },
      {
        icon: "BarChart3",
        title: "Attribution & ROI",
        description: "Track campaign performance with multi-touch attribution and revenue impact analysis.",
      },
      {
        icon: "Users",
        title: "Sales Enablement",
        description: "Equip your sales team with the tools and content to capitalize on campaign-generated leads.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Campaign Planning",
        description: "Define campaign objectives, target audience, messaging, channels, and success metrics.",
      },
      {
        step: 2,
        title: "Asset Creation",
        description: "Develop all creative assets, content, and technical infrastructure needed for the campaign.",
      },
      {
        step: 3,
        title: "Launch & Optimize",
        description: "Execute the campaign with continuous monitoring and real-time optimization.",
      },
      {
        step: 4,
        title: "Report & Learn",
        description: "Analyze results, document learnings, and provide recommendations for future campaigns.",
      },
    ],
    benefits: [
      {
        icon: "TrendingUp",
        title: "Pipeline Acceleration",
        description: "Generate a surge of qualified leads and opportunities aligned with sales capacity.",
      },
      {
        icon: "MessageSquare",
        title: "Unified Messaging",
        description: "Ensure consistent brand messaging across all touchpoints and channels.",
      },
      {
        icon: "Target",
        title: "Market Penetration",
        description: "Make a significant impact in specific segments, verticals, or geographic markets.",
      },
      {
        icon: "Clock",
        title: "Time to Market",
        description: "Launch campaigns faster with experienced execution and established processes.",
      },
    ],
    faqs: [
      {
        question: "How long does a typical campaign run?",
        answer: "Campaign duration depends on objectives and complexity. Product launches typically run 6-8 weeks, while always-on demand generation campaigns run continuously with quarterly refreshes. We'll recommend the right approach for your goals.",
      },
      {
        question: "What budget do we need for an effective campaign?",
        answer: "Effective B2B campaigns typically require $25K-$100K+ depending on scope and channels. This includes creative development, media spend, and management. We'll work with your budget to maximize impact.",
      },
      {
        question: "How do you measure campaign success?",
        answer: "We track leading indicators (impressions, clicks, form fills) and lagging indicators (MQLs, SQLs, pipeline, revenue). We establish clear KPIs upfront and provide transparent reporting throughout.",
      },
      {
        question: "Can you work with our existing marketing team?",
        answer: "Absolutely. We can serve as an extension of your team, handling specific aspects of campaign execution, or manage campaigns end-to-end. We adapt to your needs and processes.",
      },
    ],
    relatedServices: ["outreach", "ads", "newsletters"],
  },
  ads: {
    headline: "B2B Advertising Services",
    tagline: "Precision-targeted paid advertising that reaches your ideal buyers and maximizes ROI",
    features: [
      {
        icon: "Linkedin",
        title: "LinkedIn Advertising",
        description: "Reach decision-makers with sponsored content, InMail, and conversation ads.",
      },
      {
        icon: "Search",
        title: "Google Ads",
        description: "Capture high-intent searches with targeted search, display, and YouTube campaigns.",
      },
      {
        icon: "Globe",
        title: "Programmatic Display",
        description: "Account-based display advertising that reaches target accounts across the web.",
      },
      {
        icon: "RefreshCw",
        title: "Retargeting",
        description: "Re-engage website visitors and nurture prospects through the buying journey.",
      },
      {
        icon: "DollarSign",
        title: "Budget Optimization",
        description: "Allocate spend across channels to maximize conversions and minimize cost per lead.",
      },
      {
        icon: "BarChart",
        title: "Conversion Tracking",
        description: "Implement proper tracking to measure true campaign ROI and optimize effectively.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Audit & Strategy",
        description: "Assess your current advertising efforts and develop a data-driven media strategy.",
      },
      {
        step: 2,
        title: "Campaign Setup",
        description: "Build campaigns with proper targeting, creative, and tracking infrastructure.",
      },
      {
        step: 3,
        title: "Launch & Optimize",
        description: "Deploy campaigns with ongoing bid management, A/B testing, and budget allocation.",
      },
      {
        step: 4,
        title: "Scale & Iterate",
        description: "Expand successful campaigns and continuously test new audiences and creative.",
      },
    ],
    benefits: [
      {
        icon: "Target",
        title: "Precise Targeting",
        description: "Reach specific job titles, companies, and industries with laser-focused targeting.",
      },
      {
        icon: "Zap",
        title: "Fast Results",
        description: "Generate leads quickly while building long-term organic growth strategies.",
      },
      {
        icon: "BarChart3",
        title: "Measurable ROI",
        description: "Track every dollar spent to its impact on pipeline and revenue.",
      },
      {
        icon: "Sliders",
        title: "Flexible Scaling",
        description: "Increase or decrease spend based on business needs and market conditions.",
      },
    ],
    faqs: [
      {
        question: "Which advertising platform is best for B2B?",
        answer: "LinkedIn is typically the most effective for B2B due to its professional targeting capabilities. However, the best mix depends on your audience and goals. We often recommend a combination of LinkedIn for demand generation and Google for capturing existing intent.",
      },
      {
        question: "What's a typical cost per lead on LinkedIn?",
        answer: "B2B LinkedIn CPLs typically range from $50-$200+ depending on targeting, offer, and industry. We focus on cost per qualified lead and cost per opportunity, not just raw lead volume, to ensure true ROI.",
      },
      {
        question: "How much should we budget for paid advertising?",
        answer: "Effective B2B advertising programs typically start at $10K/month in ad spend plus management fees. This allows for meaningful testing and optimization. We'll recommend a budget based on your goals and market.",
      },
      {
        question: "Do you create ad creative and copy?",
        answer: "Yes, our creative team produces all ad assets including copy, images, and video. We A/B test multiple variations to find what resonates best with your audience and continuously refresh creative to prevent fatigue.",
      },
    ],
    relatedServices: ["campaigns", "seo", "outreach"],
  },
  seo: {
    headline: "B2B SEO Services",
    tagline: "Build sustainable organic visibility that compounds over time and drives qualified traffic",
    features: [
      {
        icon: "Search",
        title: "Keyword Strategy",
        description: "Identify high-value keywords your target buyers are searching for throughout their journey.",
      },
      {
        icon: "FileText",
        title: "Content Strategy",
        description: "Develop a content roadmap that targets valuable keywords and establishes topical authority.",
      },
      {
        icon: "PenTool",
        title: "Content Creation",
        description: "Produce SEO-optimized content that ranks well and converts visitors to leads.",
      },
      {
        icon: "Link",
        title: "Link Building",
        description: "Earn high-quality backlinks through content marketing, digital PR, and outreach.",
      },
      {
        icon: "BarChart",
        title: "Analytics & Reporting",
        description: "Track rankings, traffic, and conversions with transparent monthly reporting.",
      },
      {
        icon: "TrendingUp",
        title: "Competitive Analysis",
        description: "Monitor competitor SEO strategies and identify opportunities to outrank them.",
      },
    ],
    process: [
      {
        step: 1,
        title: "SEO Audit",
        description: "Comprehensive analysis of your current SEO performance, technical health, and opportunities.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description: "Create a prioritized SEO roadmap based on impact, effort, and business goals.",
      },
      {
        step: 3,
        title: "Implementation",
        description: "Execute on-page optimization, content creation, and link building initiatives.",
      },
      {
        step: 4,
        title: "Monitor & Optimize",
        description: "Track results, iterate on strategy, and continuously improve organic performance.",
      },
    ],
    benefits: [
      {
        icon: "TrendingUp",
        title: "Compounding Returns",
        description: "Unlike paid ads, organic traffic builds over time and continues generating leads indefinitely.",
      },
      {
        icon: "DollarSign",
        title: "Lower Cost Per Lead",
        description: "Organic leads typically cost 60-70% less than paid leads once rankings are established.",
      },
      {
        icon: "Shield",
        title: "Brand Credibility",
        description: "Ranking for key terms signals authority and builds trust with potential buyers.",
      },
      {
        icon: "Target",
        title: "Intent-Based Traffic",
        description: "Capture buyers actively searching for solutions like yours at every funnel stage.",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer: "SEO is a long-term investment. You'll typically see initial improvements in 3-6 months, with significant results at 6-12 months. The timeline depends on your starting point, competition, and investment level.",
      },
      {
        question: "Do you guarantee rankings?",
        answer: "No reputable SEO agency can guarantee specific rankings because search algorithms are constantly evolving. We do guarantee transparent, ethical practices and a focus on driving qualified traffic and leads, not just rankings.",
      },
      {
        question: "What's included in your SEO service?",
        answer: "Our comprehensive SEO service includes keyword research, on-page optimization, content strategy and creation, technical SEO recommendations, link building, and monthly reporting. We customize the mix based on your needs.",
      },
      {
        question: "How do you measure SEO success?",
        answer: "We track keyword rankings, organic traffic, and most importantly, organic conversions and leads. We set up proper attribution to measure the true business impact of our SEO efforts.",
      },
    ],
    relatedServices: ["technical-seo", "publications", "campaigns"],
  },
  "technical-seo": {
    headline: "Technical SEO Services",
    tagline: "Build the technical foundation that enables your content to rank and your site to perform",
    features: [
      {
        icon: "Code",
        title: "Technical Audits",
        description: "Comprehensive crawl and analysis to identify issues impacting search performance.",
      },
      {
        icon: "Gauge",
        title: "Core Web Vitals",
        description: "Optimize LCP, INP, and CLS to meet Google's page experience requirements.",
      },
      {
        icon: "SiteMap",
        title: "Site Architecture",
        description: "Structure your site for optimal crawlability and internal link flow.",
      },
      {
        icon: "FileCode",
        title: "Schema Markup",
        description: "Implement structured data to enhance search listings and enable rich results.",
      },
      {
        icon: "Globe",
        title: "International SEO",
        description: "Proper hreflang implementation and geo-targeting for multi-market sites.",
      },
      {
        icon: "Smartphone",
        title: "Mobile Optimization",
        description: "Ensure flawless mobile experience that meets Google's mobile-first indexing.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Technical Audit",
        description: "Deep crawl analysis identifying indexation, crawlability, and rendering issues.",
      },
      {
        step: 2,
        title: "Prioritized Roadmap",
        description: "Organize findings by impact and effort to create an actionable improvement plan.",
      },
      {
        step: 3,
        title: "Implementation Support",
        description: "Work with your development team to implement fixes correctly and efficiently.",
      },
      {
        step: 4,
        title: "Validation & Monitoring",
        description: "Verify fixes, monitor for regressions, and track performance improvements.",
      },
    ],
    benefits: [
      {
        icon: "Zap",
        title: "Faster Load Times",
        description: "Improved site speed enhances user experience and reduces bounce rates.",
      },
      {
        icon: "Search",
        title: "Better Crawlability",
        description: "Ensure search engines can discover and index all your important content.",
      },
      {
        icon: "TrendingUp",
        title: "Higher Rankings",
        description: "Technical health is a foundational ranking factor that enables content to perform.",
      },
      {
        icon: "Shield",
        title: "Future-Proofing",
        description: "Stay ahead of algorithm updates by meeting technical best practices.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between SEO and technical SEO?",
        answer: "Technical SEO focuses on the infrastructure that enables search engines to crawl, index, and render your site. Content SEO focuses on creating content that ranks. Both are essential for a complete SEO strategy.",
      },
      {
        question: "Do you implement fixes or just provide recommendations?",
        answer: "We provide detailed, developer-friendly recommendations and can work directly with your engineering team to ensure proper implementation. For smaller sites, we can handle implementation directly.",
      },
      {
        question: "How often should we do a technical SEO audit?",
        answer: "We recommend a comprehensive technical audit annually, with quarterly monitoring for sites that change frequently. Major site redesigns or platform migrations should always include a technical SEO review.",
      },
      {
        question: "Will technical SEO improvements break our site?",
        answer: "When implemented correctly, no. We provide detailed specifications and work closely with your development team to ensure changes are deployed safely. We recommend staging environment testing before production deployment.",
      },
    ],
    relatedServices: ["seo", "campaigns", "publications"],
  },
};
