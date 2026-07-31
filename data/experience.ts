export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "mysql-intern",
    role: "MySQL Intern",
    org: "Database Systems",
    period: "2026",
    description:
      "Worked hands-on with relational database design, query optimization, and data integrity across live datasets.",
  },
  {
    id: "virtual-internship",
    role: "Virtual Internship",
    org: "Remote Program",
    period: "2026",
    description:
      "Completed a structured remote program applying data analysis and machine learning fundamentals to real briefs.",
  },
  {
    id: "forge-innovations",
    role: "AI Engineer (In Progress)",
    org: "Forge Innovations & Ventures",
    period: "2026 — Present",
    description:
      "Building applied AI systems end-to-end, from data pipelines to deployed model-backed products.",
  },
];
