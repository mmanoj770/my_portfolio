export type ProtosemWeek = {
  id: number;
  title: string;
  status: "complete" | "placeholder";
  summary: string;
  reflection: string;
  learnings: string[];
  hero: string;
  gallery: string[];
  pdf: string | null;
};

const placeholder = (id: number): ProtosemWeek => ({
  id,
  title: `Week ${id}`,
  status: "placeholder",
  summary: "This week's log has not been published yet.",
  reflection: "Coming soon.",
  learnings: [],
  hero: "/protosem/placeholder.jpg",
  gallery: [],
  pdf: null,
});

export const protosemWeeks: ProtosemWeek[] = [
  {
    id: 0,
    title: "Week 0 — Orientation",
    status: "complete",
    summary:
      "Week 0 marked the beginning of my Protosem journey. The week focused on understanding the program, exploring my strengths, and preparing for the 20-week learning experience through interactive activities, self-reflection, and professional development.",
    reflection:
      "The orientation week helped me realize that Protosem is much more than a technical program. Every activity—from problem-solving games to personality assessment and LinkedIn branding—was designed to improve both technical and professional skills. By the end of the week, I had a clear understanding of the learning path ahead and the importance of continuous self-improvement.",
    learnings: [
      "Participated in mind-challenging activities that improved logical thinking and teamwork.",
      "Understood the objectives, structure, and expectations of the 20-week Protosem program.",
      "Completed the 16Personalities assessment to better understand my personality, strengths, and decision-making style.",
      "Reflected on my qualities by choosing an anime character that best represented my personality.",
      "Learned how to build a professional LinkedIn profile and establish a strong online presence.",
    ],
    hero: "/protosem/week-0-hero.jpg",
    gallery: ["/protosem/week-0-hero.jpg", "/protosem/week-0-1.jpg"],
    pdf: null,
  },
  {
    id: 1,
    title: "Week 1 — Workplace Ethics & Professional Development",
    status: "complete",
    summary:
      "Week 1 focused on workplace discipline, organization, and personal branding. We practiced the 5S methodology to improve workplace efficiency and began building our personal portfolio to showcase our technical journey.",
    reflection:
      "Applying the 5S methodology showed me how a well-organized workspace directly improves productivity and teamwork. Building my portfolio also made me realize the importance of documenting projects and continuously showcasing my learning and achievements.",
    learnings: [
      "Learned and applied the 5S methodology: Sort, Set in Order, Shine, Standardize, Sustain.",
      "Improved teamwork while organizing the workspace.",
      "Understood workplace ethics and professional responsibility.",
      "Started designing my personal portfolio.",
      "Added my skills, projects, achievements, and professional profiles to create a strong online portfolio.",
    ],
    hero: "/protosem/week-1-hero.jpg",
    gallery: ["/protosem/week-1-hero.jpg", "/protosem/week-1-1.jpg"],
    pdf: null,
  },
  ...Array.from({ length: 19 }, (_, i) => placeholder(i + 2)),
];

export function getWeek(id: number) {
  return protosemWeeks.find((w) => w.id === id);
}
