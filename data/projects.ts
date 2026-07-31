export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  outcome: string;
  cover: string;
  accent: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "dengue-predictive-model",
    index: "01",
    title: "Dengue Predictive Model",
    category: "Public Health · Machine Learning",
    year: "2024",
    summary:
      "A regression and classification pipeline that forecasts dengue outbreak risk from climate and epidemiological data.",
    problem:
      "Dengue outbreaks correlate strongly with climate patterns, but health departments often react to case spikes instead of anticipating them.",
    approach:
      "Cleaned multi-year climate and case-count datasets, engineered lag features for rainfall and temperature, and benchmarked Scikit-learn regressors before settling on a gradient-boosted model.",
    stack: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
    outcome:
      "Delivered a risk-scoring notebook and dashboard that flags high-risk districts weeks ahead of historical outbreak onset.",
    cover: "/images/projects/dengue.jpg",
    accent: "#5B8DEF",
    githubUrl: "https://github.com/mmanoj770/dengue-predictive-model",
  },
  {
    slug: "train-journey-time-prediction",
    index: "02",
    title: "Train Journey Time Prediction",
    category: "Transportation · Regression",
    year: "2024",
    summary:
      "A model estimating real-world train journey durations using historical schedules, delays, and route metadata.",
    problem:
      "Published timetables rarely reflect real transit times once delays, weather, and route congestion are factored in.",
    approach:
      "Aggregated historical run data, handled missing and inconsistent timestamps, and trained ensemble models to predict arrival deltas per route segment.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    outcome:
      "Produced a prediction service that narrows expected arrival windows and surfaces the routes most prone to delay.",
    cover: "/images/projects/train.jpg",
    accent: "#7C6FF0",
    githubUrl: "https://github.com/mmanoj770/train-journey-time-prediction",
  },
  {
    slug: "discovery-agent",
    index: "03",
    title: "Discovery Agent",
    category: "Applied AI · Agents",
    year: "2025",
    summary:
      "An autonomous research agent that plans, searches, and synthesizes findings across multiple sources into a structured brief.",
    problem:
      "Manual research across scattered sources is slow and inconsistent, especially when the same synthesis pattern repeats often.",
    approach:
      "Designed a tool-using agent loop with task decomposition, retrieval, and a verification pass to reduce hallucinated claims before final synthesis.",
    stack: ["Python", "LLM Orchestration", "Vector Search"],
    outcome:
      "Cut manual research time significantly for repeatable brief formats while keeping a human-in-the-loop review step.",
    cover: "/images/projects/discovery-agent.jpg",
    accent: "#5B8DEF",
    githubUrl: "https://github.com/mmanoj770/discovery-agent",
  },
  {
    slug: "deep-learning-project",
    index: "04",
    title: "Deep Learning Project",
    category: "Computer Vision · Neural Networks",
    year: "2025",
    summary:
      "A convolutional neural network built and trained from first principles to explore architecture decisions and regularization.",
    problem:
      "Understanding deep learning at the level of architecture trade-offs requires building networks by hand, not just calling high-level APIs.",
    approach:
      "Implemented and iterated on a CNN in PyTorch, experimenting with normalization, augmentation, and learning-rate schedules to close the gap between training and validation performance.",
    stack: ["Python", "PyTorch", "NumPy"],
    outcome:
      "Reached a stable, well-generalized model and documented the architecture decisions that mattered most.",
    cover: "/images/projects/deep-learning.jpg",
    accent: "#7C6FF0",
    githubUrl: "https://github.com/mmanoj770/deep-learning-project",
  },
  {
    slug: "full-stack-ai-project",
    index: "05",
    title: "Full Stack AI Project",
    category: "Product · End-to-End AI",
    year: "2025",
    summary:
      "A complete product wrapping a trained model behind a real interface, API, and deployment pipeline.",
    problem:
      "Most model work never leaves a notebook; turning it into something usable requires a full application layer.",
    approach:
      "Built an API around the trained model, connected it to a frontend interface, and handled the deployment and monitoring needed for real usage.",
    stack: ["Python", "Next.js", "REST APIs"],
    outcome:
      "Shipped a working end-to-end product, closing the loop from data to a usable interface.",
    cover: "/images/projects/full-stack-ai.jpg",
    accent: "#5B8DEF",
    githubUrl: "https://github.com/mmanoj770/full-stack-ai-project",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
