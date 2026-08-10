export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "image-grid"; images: { src: string; alt?: string; caption?: string }[] };

export type DetailedSection = {
  heading?: string;
  paragraphs?: string[];
  content?: ContentBlock[];
};

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
  detailedSummary?: {
    title?: string;
    sections: DetailedSection[];
  };
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
  pdf: `/pdfs/protosem-week-${id}.pdf`,
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
    pdf: "/pdfs/protosem-week-0.pdf",
  },
  {
    id: 1,
    title: "Week 1 — Understanding 5S and Building My Professional Portfolio",
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
    pdf: "/pdfs/protosem-week-1.pdf",
    detailedSummary: {
      title: "Week 1 – Understanding 5S and Building My Professional Portfolio",
      sections: [
        {
          content: [
            {
              type: "paragraph",
              text: "Week 1 of the Protosem program was focused on understanding professionalism, organization, discipline, and personal presentation. The first part of the week introduced me to the 5S methodology, a Japanese workplace organization system used to create an efficient, organized, and productive working environment. The five principles of 5S are Sort (Seiri), Set in Order (Seiton), Shine (Seiso), Standardize (Seiketsu), and Sustain (Shitsuke).",
            },
            {
              type: "paragraph",
              text: "Through Sort, I learned to identify unnecessary things and remove them so that only what is required remains. Set in Order taught me to arrange everything in a proper and easily accessible place. Shine focused on maintaining cleanliness and keeping the workspace in a condition that supports productive work. Standardize taught me the importance of creating consistent methods and following common practices. Finally, Sustain showed me that the real value of 5S comes from continuously following these practices rather than doing them only once.",
            },
            {
              type: "paragraph",
              text: "We applied these concepts practically by organizing our workspace as a team. We identified unnecessary materials, arranged the required items properly, cleaned the workspace, and maintained a systematic arrangement. From this activity, I understood that 5S is not simply about cleaning a workplace. It is about creating a habit of being organized, responsible, disciplined, and consistent. I also learned that an organized environment reduces confusion and helps a team work more efficiently.",
            },
            {
              type: "paragraph",
              text: "After the 5S activities, I moved towards building my personal professional portfolio. This was one of the most important activities for me during Week 1 because it required me to look at my own skills, projects, experiences, and future goals from a professional perspective.",
            },
            {
              type: "paragraph",
              text: "I started by planning the overall structure of my portfolio and deciding what information I wanted to present. I created different sections such as Home, Projects, Skills, Experience, Protosem, About, and Contact. Instead of putting all the information on one page, I organized it into different sections so that visitors could easily understand my background and explore my work.",
            },
            {
              type: "paragraph",
              text: "The Home section was designed to provide a quick introduction about me. I added my name, my field of study, and a short description explaining that I am an Artificial Intelligence and Data Science student interested in building practical AI systems. I also added buttons for my Resume and Contact, making the important information easily accessible.",
            },
            {
              type: "image",
              src: "/protosem/portfolio-home.png",
              alt: "Personal Portfolio - Home Hero Section",
              caption: "Personal Portfolio - Home section showcasing introductory profile and navigation",
            },
            {
              type: "paragraph",
              text: "Next, I worked on the About section, where I created a more detailed introduction about myself. I explained my interest in AI engineering and the areas I am currently exploring, including Machine Learning, Deep Learning, Data Engineering, Large Language Models, and Full Stack AI applications. I also added my photograph and a section explaining my background and philosophy. This helped me understand how to introduce myself professionally instead of simply providing personal information.",
            },
            {
              type: "paragraph",
              text: "I then organized my Projects section. I added the projects I have worked on and categorized them based on their domain, such as Machine Learning, Regression, AI Agents, Computer Vision, and End-to-End AI. Some of the projects I included were Dengue Predictive Model, Train Journey Time Prediction, Discovery Agent, Deep Learning Project, and Full Stack AI Project. While organizing these projects, I realized that a project portfolio is not just a collection of project names. Each project represents a problem I tried to solve, the technologies I learned, and the practical experience I gained.",
            },
            {
              type: "paragraph",
              text: "After that, I created the Skills section to organize my technical knowledge. Instead of displaying all my skills as one long list, I grouped them into categories such as Programming Languages, Libraries, Frameworks, AI & ML, and Databases. This made my technical profile easier to understand and also helped me identify the areas where I need to improve.",
            },
            {
              type: "paragraph",
              text: "I also created an Experience section to document my professional and learning experiences. I structured it as a timeline so that my experiences could be viewed chronologically. This included my MySQL internship, virtual internship, and current AI engineering experience. Creating this section helped me understand the importance of documenting experiences and presenting them clearly rather than simply mentioning them on a resume.",
            },
            {
              type: "image",
              src: "/protosem/portfolio-experience.png",
              alt: "Personal Portfolio - Experience Section Timeline",
              caption: "Personal Portfolio - Experience section timeline",
            },
            {
              type: "paragraph",
              text: "Another important part of my portfolio was the Protosem section. Since Protosem is a long-term learning journey, I created a 20-week log where each week can be documented separately. I added Week 0, Week 1, and Week 2 as published weeks, while the upcoming weeks are kept ready for future documentation. This gave me a structured way to record my learning journey throughout the program.",
            },
            {
              type: "paragraph",
              text: "I also worked on the Contact section so that the portfolio could function as a professional platform rather than just a static webpage. I included links to platforms such as GitHub, LinkedIn, Kaggle, LeetCode, and Email. This helped me understand that a professional portfolio should connect different parts of my digital presence in one place.",
            },
            {
              type: "paragraph",
              text: "Finally, I worked on the overall design and presentation of the portfolio. I focused on maintaining a consistent dark theme, clear navigation, readable typography, structured sections, and a simple professional appearance. I wanted the website to communicate my profile without making it unnecessarily complicated. The goal was to make it easy for someone viewing the portfolio to understand who I am, what I have built, what skills I have, what experience I have, and how they can contact me.",
            },
          ],
        },
        {
          heading: "What I Learned From the Process",
          content: [
            {
              type: "paragraph",
              text: "From my perspective, the biggest learning from Week 1 was that professionalism is built through organization and consistency. The 5S methodology taught me how to organize my physical working environment, while building the portfolio taught me how to organize and present my professional identity.",
            },
            {
              type: "paragraph",
              text: "I also learned that a portfolio is not just a website. It is a record of my growth. While adding my projects, skills, experiences, and Protosem activities, I was able to look back at what I had learned and identify what I still need to improve.",
            },
            {
              type: "paragraph",
              text: "The combination of 5S and portfolio building gave me a clear understanding of how organization can be applied in different areas. 5S helped me organize my workspace, while the portfolio helped me organize my skills, experiences, achievements, and learning journey. Both activities taught me that small, consistent improvements can gradually create a professional mindset.",
            },
            {
              type: "image",
              src: "/protosem/portfolio-about.png",
              alt: "Personal Portfolio - About Section",
              caption: "Personal Portfolio - About section documenting professional philosophy and profile",
            },
            {
              type: "paragraph",
              text: "Overall, Week 1 helped me take my first steps towards presenting myself not only as a student, but as someone who is actively building skills, projects, experience, and a professional identity.",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: "Week 2 — Beyond Coding: Innovation, Design Thinking & Rapid Prototyping",
    status: "complete",
    summary:
      "Week 2 broadened my understanding of software development by showing that creating impactful technology goes beyond writing code. Through sessions on LeanSpark, the Frugal Mindset, Design Thinking, visual programming, mobile app development, and collaborative problem-solving, I explored how innovation, creativity, and user-centered thinking are essential to building meaningful software solutions.",
    reflection:
      "This week changed my perspective on software engineering. I realized that developing software is not only about technical skills but also about understanding users, thinking creatively, collaborating effectively, and solving real-world problems. Every activity reinforced that innovation and design are just as important as coding in creating impactful products.",
    learnings: [
      "Learned the principles of LeanSpark and the Frugal Mindset, understanding how innovation can emerge from limited resources.",
      "Participated in the Think Like a Coder Challenge, strengthening logical thinking, teamwork, and collaborative problem-solving.",
      "Created a 2-minute animated story using Scratch, exploring computational thinking through visual programming.",
      "Prototyped a functional Blood Donor mobile application using MIT App Inventor, gaining experience in rapid mobile app development.",
      "Explored Applied Design Thinking, learning how empathy, ideation, prototyping, and testing contribute to user-centered software development.",
    ],
    hero: "",
    gallery: [],
    pdf: "/pdfs/protosem-week-2.pdf",
  },
  ...Array.from({ length: 18 }, (_, i) => placeholder(i + 3)),
];

export function getWeek(id: number) {
  return protosemWeeks.find((w) => w.id === id);
}
