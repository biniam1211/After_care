export const metadata = {
  title: "Find Local Services & Programs for Foster Youth",
  description:
    "Search verified free and low-cost programs for foster youth across housing, food, healthcare, employment, college grants, and legal aid. Filter by California ZIP code or connect directly with AfterCare AI.",
  keywords: [
    "foster youth services",
    "foster care resources",
    "aging out of foster care California",
    "foster youth housing vouchers FYI",
    "Chafee Grant California",
    "Medi-Cal to 26 former foster youth",
    "AB 12 extended foster care",
    "Orange County foster youth programs",
    "Los Angeles foster youth resources",
  ],
  openGraph: {
    title: "Find Local Services & Programs · AfterCare",
    description:
      "Search verified free and low-cost social services near you. Food, housing, healthcare, employment, and education support for foster youth.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AfterCare Resource & Services Navigator",
    url: "https://aftercare.app/services",
    description:
      "Search thousands of verified free and low-cost programs by ZIP code across housing, food, healthcare, employment, education, and legal services for current and former foster youth.",
    applicationCategory: "SocialServicesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "ZIP code-based local service search",
      "8 Foster support and SDOH categories",
      "Interactive Benefits Screener",
      "Verified California & national program catalog",
      "Instant AfterCare AI guidance integration",
      "Saved program board",
    ],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I find local resources for foster youth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the AfterCare Services Navigator at aftercare.app/services. Enter your ZIP code to search verified free and low-cost programs across housing, healthcare, food, education, and employment.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to prove my foster care status to access these resources?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The AfterCare resource directory is open and free to everyone. Many listings serve all transition-age youth, and foster-specific programs explain exactly what verification (like a dependency letter) is needed.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Former Foster Youth Medi-Cal to 26 program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under California law and the ACA, anyone who was in foster care on their 18th birthday is entitled to 100% free Medi-Cal coverage until age 26, regardless of income.",
        },
      },
      {
        "@type": "Question",
        name: "Is AfterCare free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% free forever for all current and former foster youth. No ads, no data selling, no paywalls.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      {children}
    </>
  );
}
