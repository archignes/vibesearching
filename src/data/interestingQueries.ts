// src/data/interestingQueries.ts

export interface interestingQuerySource {
  url: string;
  text: string;
  logo?: string; // optional icon or favicon
}

export interface interestingQuery {
  text: string;
  sources: interestingQuerySource[];
}

export const interestingQueries: interestingQuery[] = [
  {
    text: "Tell me a challenge to do",
    sources: [
      {
        url: "https://x.com/klivdahl/status/1475220450598924297",
        text: "Livdahl (2021)",
        logo: "/favicons/x.ico",
      },
    ],
  },
  {
    text: "What countries replaced nickel with iron alloys in the 20th century?",
    sources: [
      {
        url: "https://arxiv.org/abs/2305.07614",
        text: "Weller et al. (2024)",
        logo: "/favicons/arxiv.png",
      },
    ],
  },
  {
    text: "Is climate change real?",
    sources: [
      {
        url: "https://link.springer.com/article/10.1007/s13347-022-00521-7",
        text: "Narayanan & De Cremer (2022)",
        logo: "/favicons/springer.png",
      },
    ],
  },
  {
    text: "nutritional advice that experts have reversed their stance on in the last 5 years",
    sources: [
      {
        url: "https://exa.ai/blog/websets-evals",
        text: "Bryk (2025)",
        logo: "/favicons/exa.ico",
      },
    ],
  },
  {
    text: "What rocket was the first spacecraft that ever approached Uranus launched on?",
    sources: [
      {
        url: "https://arxiv.org/abs/2210.03350",
        text: "Press et al. (2022)",
        logo: "/favicons/arxiv.png",
      },
    ],
  },
  {
    text: "northam fake chinese company 1.4million",
    sources: [
      {
        url: "https://datasociety.net/library/searching-for-alternative-facts/",
        text: "Tripodi (2018)",
        logo: "/favicons/datasociety.png",
      },
    ],
  },
  {
    text: "milk bad",
    sources: [
      {
        url: "https://journals.sagepub.com/doi/10.1177/20539517231158997",
        text: "Haider & Rödl (2023)",
        logo: "/favicons/sagepub.webp",
      },
    ],
  },
  {
    text: "kalergi plan",
    sources: [
      {
        url: "https://hapgood.us/2019/04/12/data-voids-and-the-google-this-ploy-kalergi-plan/",
        text: "Hapgood (2019)",
        logo: "/favicons/wp.ico",
      },
    ],
  },
  {
    text: "Had a seizure Now what?",
    sources: [
      {
        url: "https://x.com/soft/status/1449406390976409600",
        text: "@soft (2021)",
        logo: "/favicons/x.ico",
      },
    ],
  },
  {
    text: "Which drama series won the most recent Primetime Emmy Award for Outstanding Drama Series?",
    sources: [
      {
        url: "https://arxiv.org/abs/2310.03214",
        text: "Vu et al. (2023)",
        logo: "/favicons/arxiv.png",
      },
    ],
  },
  {
    text: "What is the impact of continuous glucose monitors on reducing long-term diabetes complications such as cardiovascular disease, neuropathy, and kidney disease?",
    sources: [
      {
        url: "https://blog.elicit.com/elicit-reports-eval/",
        text: "Fortier-Dubois (2025)",
        logo: "/favicons/elicit.png",
      },
    ],
  },
  {
    text: "what's the difference in sleep tracking features between a smart ring, smartwatch and tracking mat",
    sources: [
      {
        url: "https://blog.google/products/search/ai-mode-search/",
        text: "Stein (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "best quality newspapers in the us",
    sources: [
      {
        url: "https://emmalurie.github.io/docs/websci18-investigating.pdf",
        text: "Lurie & Mustafaraj (2018)",
        logo: "/favicons/default.png",
      },
    ],
  },
  {
    text: "why did WSJ dump half its SF bureau editors and reporters at a time when those tech companies are newsier than ever and AI is dominating every narrative?",
    sources: [
      {
        url: "https://x.com/chaykak/status/1897375492510216573",
        text: "Chayka (2025)",
        logo: "/favicons/x.ico",
      },
    ],
  },
  {
    text: "What is the capital of France?",
    sources: [
      {
        url: "https://nicholas.carlini.com/writing/llm-forecast/question/Capital-of-Paris",
        text: "Carlini (2023)",
        logo: "/favicons/carlini.ico",
      },
    ],
  },
  {
    text: "(((((( TI = (((memor* OR distributed memory OR distributed cognition OR offloaded cognition OR offloaded memory OR mind* OR cogniti* OR attention*)AND(web* OR Internet* OR smartphone* OR google effect))AND(compar* OR effect* OR impact* OR implicat* OR review* OR research* OR discuss* OR survey*))))))))",
    sources: [
      {
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10830778/",
        text: "Gong & Yang (2024)",
        logo: "/favicons/pmc-ncbi-nlm-nih.png",
      },
    ],
  },
  {
    text: "What advice would you give to a user who is looking for reviews to distinguish between high- and low-quality content? How can a user tell if the reviewer actually tested the products, compared with other products, or if they are just trying to push users to buy bad sponsored products?",
    sources: [
      {
        url: "https://housefresh.com/finding-helpful-content-in-an-enshittified-google/",
        text: "Navarro & Ashton (2024)",
        logo: "/favicons/housefresh.png",
      },
    ],
  },
  {
    text: "best laptops for gaming",
    sources: [
      {
        url: "https://housefresh.com/finding-helpful-content-in-an-enshittified-google/",
        text: "Navarro & Ashton (2024)",
        logo: "/favicons/housefresh.png",
      },
    ],
  },
  {
    text: "best credit cards for bad credit",
    sources: [
      {
        url: "https://housefresh.com/finding-helpful-content-in-an-enshittified-google/",
        text: "Navarro & Ashton (2024)",
        logo: "/favicons/housefresh.png",
      },
    ],
  },
  {
    text: "best air purifier",
    sources: [
      {
        url: "https://housefresh.com/finding-helpful-content-in-an-enshittified-google/",
        text: "Navarro & Ashton (2024)",
        logo: "/favicons/housefresh.png",
      },
    ],
  },
  {
    text: "Shouldn't 'best of' lists be treated as product reviews?",
    sources: [
      {
        url: "https://housefresh.com/david-vs-digital-goliaths/",
        text: "Navarro & Ashton (2024)",
        logo: "/favicons/housefresh.png",
      },
    ],
  },
  {
    text: "When you're searching for affordable or budget-friendly products, are you looking for the best you can buy or just whatever's available?",
    sources: [
      {
        url: "https://housefresh.com/how-google-decimated-housefresh/",
        text: "Navarro & Ashton (2024)",
        logo: "/favicons/housefresh.png",
      },
    ],
  },
  {
    text: "Why do people search the Internet?",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "how tall is mt everest",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "verbena",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "calories in a banana",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "what is the tallest tree",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "obsequious",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "history of ATM machines",
    sources: [
      {
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
        text: "Google (2025)",
        logo: "/favicons/google.ico",
      },
    ],
  },
  {
    text: "Is Google Making us Stupid?",
    sources: [
      {
        url: "https://www.pewresearch.org/internet/2010/02/19/part-1-a-review-of-responses-to-a-tension-pair-about-whether-google-will-make-people-stupid/",
        text: "Anderson (2010)",
        logo: "/favicons/pewresearch.ico",
      },
      {
        url: "https://www.theatlantic.com/magazine/archive/2008/07/is-google-making-us-stupid/306868/",
        text: "Carr (2008)",
        logo: "/favicons/theatlantic.ico",
      },
    ],
  },
  {
    text: "Is cooperation or competition the driving force guiding the evolution of society?",
    sources: [
      {
        url: "https://arxiv.org/abs/2304.09848",
        text: "Liu et al. (2023)",
        logo: "/favicons/arxiv.png",
      },
    ],
  },
  {
    text: "What are the latest discoveries from the James Webb Space Telescope?",
    sources: [
      {
        url: "https://arxiv.org/abs/2304.09848",
        text: "Liu et al. (2023)",
        logo: "/favicons/arxiv.png",
      },
    ],
  },
  {
    text: "What is an AI product which doesn't exist today but you wish did?",
    sources: [
      {
        url: "https://x.com/OfficialLoganK/status/1767715018747809896",
        text: "@OfficialLoganK (2024)",
        logo: "/favicons/x.ico",
      },
    ],
  },
];
