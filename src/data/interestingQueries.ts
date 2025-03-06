// src/data/interestingQueries.ts

export interface interestingQuerySource {
  url: string;
  text: string;
  logo?: string; // optional icon or favicon
}

export interface interestingQuery {
  text: string;
  source: interestingQuerySource;
}

export const interestingQueries: interestingQuery[] = [
  {
    text: "Tell me a challenge to do",
    source: {
      url: "https://x.com/klivdahl/status/1475220450598924297",
      text: "Livdahl (2021)",
      logo: "/favicons/x.ico",
    },
  },
  {
    text: "What countries replaced nickel with iron alloys in the 20th century?",
    source: {
      url: "https://arxiv.org/abs/2305.07614",
      text: "Weller et al. (2024)",
      logo: "/favicons/arxiv.png",
    },
  },
  {
    text: "Is climate change real?",
    source: {
      url: "https://link.springer.com/article/10.1007/s13347-022-00521-7",
      text: "Narayanan & De Cremer (2022)",
      logo: "/favicons/springer.png",
    },
  },
  {
    text: "nutritional advice that experts have reversed their stance on in the last 5 years",
    source: {
      url: "https://exa.ai/blog/websets-evals",
      text: "Bryk (2025)",
      logo: "/favicons/exa.ico",
    },
  },
  {
    text: "What rocket was the first spacecraft that ever approached Uranus launched on?",
    source: {
      url: "https://arxiv.org/abs/2210.03350",
      text: "Press et al. (2022)",
      logo: "/favicons/arxiv.png",
    },
  },
  {
    text: "northam fake chinese company 1.4million",
    source: {
      url: "https://datasociety.net/library/searching-for-alternative-facts/",
      text: "Tripodi (2018)",
      logo: "/favicons/datasociety.png",
    },
  },
  {
    text: "milk bad",
    source: {
      url: "https://journals.sagepub.com/doi/10.1177/20539517231158997",
      text: "Haider & Rödl (2023)",
      logo: "/favicons/sagepub.webp",
    },
  },
  {
    text: "kalergi plan",
    source: {
      url: "https://hapgood.us/2019/04/12/data-voids-and-the-google-this-ploy-kalergi-plan/",
      text: "Hapgood (2019)",
      logo: "/favicons/wp.ico",
    },
  },
  {
    text: "Had a seizure Now what?",
    source: {
      url: "https://x.com/soft/status/1449406390976409600",
      text: "@soft (2021)",
      logo: "/favicons/x.ico",
    },
  },
  {
    text: "Which drama series won the most recent Primetime Emmy Award for Outstanding Drama Series?",
    source: {
      url: "https://arxiv.org/abs/2310.03214",
      text: "Vu et al. (2023)",
      logo: "/favicons/arxiv.png",
    },
  },
  {
    text: "What is the impact of continuous glucose monitors on reducing long-term diabetes complications such as cardiovascular disease, neuropathy, and kidney disease?",
    source: {
      url: "https://blog.elicit.com/elicit-reports-eval/",
      text: "Fortier-Dubois (2025)",
      logo: "/favicons/elicit.png",
    },
  },
  {
    text: "what's the difference in sleep tracking features between a smart ring, smartwatch and tracking mat",
    source: {
      url: "https://blog.google/products/search/ai-mode-search/",
      text: "Stein (2025)",
      logo: "/favicons/google.ico",
    },
  },
  {
    text: "best quality newspapers in the us",
    source: {
      url: "https://emmalurie.github.io/docs/websci18-investigating.pdf",
      text: "Lurie & Mustafaraj (2018)",
      logo: "/favicons/default.png",
    },
  },
];
