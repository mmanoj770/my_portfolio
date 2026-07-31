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
      "Kickoff week: understanding the Protosem program structure, setting goals, and mapping the 20-week arc ahead.",
    reflection:
      "Week 0 was about calibration more than output — getting clear on what a good week of applied AI work actually looks like before the pace picks up.",
    learnings: [
      "Set up a weekly documentation rhythm",
      "Scoped a realistic 20-week roadmap",
      "Aligned tools and environment for the program",
    ],
    hero: "/protosem/week-0-hero.jpg",
    gallery: ["/protosem/week-0-1.jpg", "/protosem/week-0-2.jpg"],
    pdf: null,
  },
  ...Array.from({ length: 20 }, (_, i) => placeholder(i + 1)),
];

export function getWeek(id: number) {
  return protosemWeeks.find((w) => w.id === id);
}
