export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "programming-languages",
    label: "Programming Languages",
    items: ["Python", "C", "C++", "TypeScript", "JavaScript", "SQL"],
  },
  {
    id: "libraries",
    label: "Libraries",
    items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "SciPy"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    items: ["PyTorch", "TensorFlow", "Next.js", "React", "FastAPI", "Tailwind CSS"],
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    items: [
      "Supervised Learning",
      "Deep Learning (CNNs)",
      "Generative AI & LLMs",
      "RAG Systems",
      "AI Agents",
      "Prompt Engineering",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Vector Databases (Chroma/Pinecone)"],
  },
  {
    id: "developer-tools",
    label: "Developer Tools",
    items: ["Git & GitHub", "Docker", "VS Code", "Jupyter Notebooks", "Postman", "Vercel"],
  },
  {
    id: "soft-skills",
    label: "Soft Skills",
    items: [
      "Problem Solving",
      "Continuous Learning",
      "Analytical Thinking",
      "Technical Communication",
      "Project Leadership",
    ],
  },
];
