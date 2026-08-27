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
    hero: "/protosem/week-2-hero.jpg",
    gallery: [
      "/protosem/week-2-hero.jpg",
      "/protosem/week-2-scratch.png",
      "/protosem/week-2-appinventor-1.png",
      "/protosem/week-2-appinventor-2.png",
    ],
    pdf: "/pdfs/protosem-week-2.pdf",
    detailedSummary: {
      title: "Week 2 – Beyond Coding: Innovation, Design Thinking & Rapid Prototyping",
      sections: [
        {
          heading: "Collaborative Learning & Frugal Mindset",
          content: [
            {
              type: "paragraph",
              text: "The week started with interactive sessions on LeanSpark and the Frugal Mindset, emphasizing how innovative solutions can emerge from resource constraints. Working together in teams for the 'Think Like a Coder' challenge, we honed our logical thinking, communication, and collaborative problem-solving skills.",
            },
            {
              type: "image",
              src: "/protosem/week-2-hero.jpg",
              alt: "Collaborative problem-solving classroom session",
              caption: "Collaborative problem-solving and teamwork session during Protosem Week 2",
            },
          ],
        },
        {
          heading: "Visual Programming with Scratch",
          content: [
            {
              type: "paragraph",
              text: "To explore computational thinking and core programming concepts without syntax friction, we developed interactive projects using Scratch. We designed custom game logic, dynamic scoring, life counters, and sprite interactions.",
            },
            {
              type: "image",
              src: "/protosem/week-2-scratch.png",
              alt: "Scratch Project - Interactive Game & Animated Story",
              caption: "Scratch visual programming project featuring custom sprites, scoring mechanics, and game loops",
            },
          ],
        },
        {
          heading: "Rapid Mobile App Prototyping with MIT App Inventor",
          content: [
            {
              type: "paragraph",
              text: "Applying our learnings to mobile applications, we used MIT App Inventor to prototype 'BloodConnect'—an application designed to connect blood donors with people in urgent need of blood.",
            },
            {
              type: "paragraph",
              text: "The prototype includes a Blood Donor Registration screen with GPS location sensor integration, phone number validation, and blood group selection, as well as a Request Blood interface to search for nearby donor matches.",
            },
            {
              type: "image-grid",
              images: [
                {
                  src: "/protosem/week-2-appinventor-1.png",
                  alt: "BloodConnect App - Donor Registration Screen",
                  caption: "MIT App Inventor - Donor Registration interface with GPS location sensor integration",
                },
                {
                  src: "/protosem/week-2-appinventor-2.png",
                  alt: "BloodConnect App - Request Blood Screen",
                  caption: "MIT App Inventor - Request Blood interface for searching matching blood donors",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    title: "Week 3 — Electronics Fundamentals & 3D Product Design",
    status: "complete",
    summary:
      "Week 3 of ProtoSem focused on two major areas: understanding the fundamentals of electronics and developing practical CAD modelling skills using Autodesk Fusion 360. The sessions connected engineering theory with practical design and prototyping.",
    reflection:
      "Week 3 was an important step in my ProtoSem journey because it combined electronics fundamentals with practical CAD design. I learned how electrical concepts such as voltage, current, and resistance form the foundation of electronic systems, while Fusion 360 gave me practical experience in designing and visualising physical components. The CAD exercises also taught me that a good 3D model begins with a well-defined and accurately dimensioned sketch.",
    learnings: [
      "Understood electrical current generation, transmission, voltage, resistance, and Ohm's Law (V = I × R).",
      "Studied key electronic components including resistors, capacitors, and diodes and their roles in circuits.",
      "Developed 2D dimensioned sketches in Autodesk Fusion 360 using geometric constraints and parametric modeling.",
      "Modeled complex mechanical components incorporating mounting holes, vertical brackets, and structural supports.",
      "Created 3D product models including a microphone, paper rocket, and water bottle from concept to final CAD visualization.",
    ],
    hero: "/protosem/week-3-hero.jpg",
    gallery: [
      "/protosem/week-3-hero.jpg",
      "/protosem/week-3-sketch.png",
      "/protosem/week-3-modelpart.png",
      "/protosem/week-3-microphone.png",
      "/protosem/week-3-rocket.png",
    ],
    pdf: "/pdfs/protosem-week-3.pdf",
    detailedSummary: {
      title: "Week 3 – Electronics Fundamentals & 3D Product Design",
      sections: [
        {
          heading: "1. Electronics Fundamentals & Basic Components",
          content: [
            {
              type: "paragraph",
              text: "The first part of the week focused on understanding the fundamentals of electricity and electronic circuits. I learned the basic concepts of how electrical current is generated and transmitted through conductors. An electrical circuit requires a source of electrical potential, a conducting path, and a load through which current can flow.",
            },
            {
              type: "paragraph",
              text: "We studied the relationship between Voltage (V), Current (I), and Resistance (R) defined by Ohm's Law: V = I × R. From this relationship (I = V / R), I understood that when voltage remains constant, increasing resistance decreases current, while decreasing resistance increases current.",
            },
            {
              type: "paragraph",
              text: "We also covered key electronic components: Resistors (to limit or control current flow), Capacitors (to temporarily store electrical energy, filter, and smooth circuits), and Diodes (semiconductors allowing unidirectional current flow).",
            },
            {
              type: "image",
              src: "/protosem/week-3-hero.jpg",
              alt: "Interactive discussion during ProtoSem Week 3",
              caption: "Participating in discussions and interactive learning sessions during ProtoSem Week 3",
            },
          ],
        },
        {
          heading: "2. Introduction to Autodesk Fusion 360 & Dimensioned Sketching",
          content: [
            {
              type: "paragraph",
              text: "The second major part of Week 3 involved Autodesk Fusion 360, focusing on practical skills in 2D sketching, dimensions, constraints, and 3D modeling. The workflow followed: Concept → 2D Sketch → Dimensions & Constraints → 3D Features → Final Model.",
            },
            {
              type: "paragraph",
              text: "A key exercise was creating a detailed dimensioned sketch containing multiple circles, profiles, hole sizes, linear/diameter/radius dimensions (such as Ø10, Ø14, Ø28, Ø38, Ø50.80, Ø76), and geometric constraints. This demonstrated that accurate CAD modeling starts with a properly defined 2D sketch.",
            },
            {
              type: "image",
              src: "/protosem/week-3-sketch.png",
              alt: "Fusion 360 - Dimensioned 2D Sketch",
              caption: "Autodesk Fusion 360 - Fully constrained and dimensioned 2D sketch (Ø10 to Ø178)",
            },
          ],
        },
        {
          heading: "3. Mechanical Component & Tool Design",
          content: [
            {
              type: "paragraph",
              text: "I worked on a complex mechanical component in Fusion 360 featuring a base plate, multiple mounting holes, cylindrical features, vertical brackets, and structural supports. This exercise improved my understanding of feature-based modeling, mechanical part design, hole placement, structural reinforcement, and custom decals.",
            },
            {
              type: "image",
              src: "/protosem/week-3-modelpart.png",
              alt: "Fusion 360 - Mechanical Tool Component Design",
              caption: "Autodesk Fusion 360 - 3D Mechanical part model with mounting holes and structural supports",
            },
          ],
        },
        {
          heading: "4. 3D Product Prototyping (Microphone, Rocket & Bottle)",
          content: [
            {
              type: "paragraph",
              text: "We also designed various 3D product models in Fusion 360:",
            },
            {
              type: "paragraph",
              text: "• Microphone Model: Combines a cylindrical main body, rounded lower section, circular detailing, top dome, and realistic material rendering.",
            },
            {
              type: "paragraph",
              text: "• Paper Rocket Model: Features a central rocket body with aerodynamic fins positioned around the main body.",
            },
            {
              type: "paragraph",
              text: "• Water Bottle Model: Explored real-world product modeling, cylindrical proportions, and smooth curved surfaces.",
            },
            {
              type: "image-grid",
              images: [
                {
                  src: "/protosem/week-3-microphone.png",
                  alt: "Fusion 360 - Microphone 3D Model",
                  caption: "Microphone 3D CAD model with custom material rendering",
                },
                {
                  src: "/protosem/week-3-rocket.png",
                  alt: "Fusion 360 - Paper Rocket Model",
                  caption: "Paper rocket 3D CAD model featuring body and aerodynamic fins",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 4,
    title: "Week 4 — A Week of Designing, Making and Choosing",
    status: "complete",
    summary:
      "Week 4 was a combination of technical learning, mechanical design, laser cutting, animation, and 3D printing, alongside an intense and chaotic Marketplace event where we selected visionaries and challenge statements for the rest of ProtoSem.",
    reflection:
      "Marketplace taught me that teamwork is not always about getting exactly what you want. Sometimes you have to adapt, communicate, compromise, and find another way forward. Decision-making becomes challenging when opinions and personal interests run high, but staying adaptable leads to great outcomes.",
    learnings: [
      "Continued mechanical design in Fusion 360, designing a water bottle and learning software debugging with peer mentorship.",
      "Learned laser cutting fundamentals, prepared SVG/vector files in RDWorks, and cut a Mayan inscription symbol in DFab Lab #2.",
      "Explored animation and mechanisms, using joints and motion constraints to recreate mechanical assembly interactions.",
      "Introduced to 3D printing workflows on the Bambu Lab printer using Bambu Studio to design a custom enclosure for the BMS HW-375 electrical component.",
      "Navigated the intense Marketplace event: participated in visionary leadership selection, peer nominations, and multi-round voting to form 18 visionaries.",
      "Negotiated challenge statement selection, compromised under high pressure without phone access, and successfully joined a financial-related problem statement team.",
    ],
    hero: "/protosem/week-4-hero.jpg",
    gallery: [
      "/protosem/week-4-hero.jpg",
      "/protosem/week-4-mentorship.jpg",
      "/protosem/week-4-lasercut.jpg",
      "/protosem/week-4-cad.jpg",
    ],
    pdf: "/pdfs/protosem-week-4.pdf",
    detailedSummary: {
      title: "Week 4 – A Week of Designing, Making and Choosing",
      sections: [
        {
          heading: "Mechanical Design & Peer Debugging",
          content: [
            {
              type: "paragraph",
              text: "We started the week by continuing our mechanical design sessions, where we were asked to design a water bottle. Initially, I faced a few difficulties while working on the design and had trouble understanding some of the tools and errors in the software.",
            },
            {
              type: "paragraph",
              text: "My friend Mitra patiently taught me how to use the software, which tools to use, why certain errors were occurring, and how to debug them. His guidance helped me understand the software much better. Once I became more comfortable with it, I was able to use what I had learned to help my friends and fellow teammates with their own designs. This was a great experience because teaching others also helped me strengthen my own understanding.",
            },
            {
              type: "image",
              src: "/protosem/week-4-mentorship.jpg",
              alt: "Peer Mentorship Session in Fusion 360",
              caption: "Peer mentorship in action: Learning Fusion 360 tools, error debugging, and mechanical design with Mitra",
            },
          ],
        },
        {
          heading: "Laser Cutting & Digital Fabrication (Mayan Inscription)",
          content: [
            {
              type: "paragraph",
              text: "On Tuesday, we were introduced to laser cutting. We received an overview of how laser cutting works, the different steps involved, and the software we would be using.",
            },
            {
              type: "paragraph",
              text: "We were then asked to choose a unique design, import it into RDWorks, and cut it using the laser cutting machine in DFab Lab #2. I chose a symbol that looked similar to a Mayan inscription because of its unusual shape and appearance. After setting it up in RDWorks and sending it to the machine, I was able to cut it successfully. Seeing the final result was satisfying because I could physically hold something that I had designed and prepared digitally.",
            },
            {
              type: "image",
              src: "/protosem/week-4-lasercut.jpg",
              alt: "Laser Cut Mayan Inscription Symbol",
              caption: "Finished laser-cut Mayan inscription symbol cut on acrylic in DFab Lab #2 using RDWorks",
            },
          ],
        },
        {
          heading: "Animation, Mechanisms & 3D Printing (BMS HW-375 Enclosure)",
          content: [
            {
              type: "paragraph",
              text: "On Wednesday, we were introduced to animation and mechanisms. We were asked to choose a mechanism tutorial and recreate it using joints and animations. This helped me understand how different components interact with each other and how motion can be represented digitally. It was interesting to see how something that looks simple from the outside can involve several different joints and movements when recreated in design software.",
            },
            {
              type: "paragraph",
              text: "On Thursday, we explored 3D printing. We were given an overview of how 3D printing works, the different types of 3D printers, and their various applications. We were also introduced to the Bambu Lab 3D printer and learned how to use Bambu Studio to prepare models for printing. For the activity, we had to choose a sensor or electrical component and design an enclosure for it. I chose the BMS HW-375 as my component and designed an enclosure around it. This activity helped me understand the importance of considering physical dimensions and practical requirements when designing component housings.",
            },
            {
              type: "image",
              src: "/protosem/week-4-cad.jpg",
              alt: "Mechanical CAD Modeling & Prototyping Lab Session",
              caption: "Working on 2D sketches, CAD models, and component enclosures during lab sessions",
            },
          ],
        },
        {
          heading: "Marketplace: Visionaries Selection & Challenge Statement Allocation",
          content: [
            {
              type: "paragraph",
              text: "Then came Friday, which was by far the most eventful day of the week: Marketplace.",
            },
            {
              type: "paragraph",
              text: "At first, I thought Marketplace was going to be a fun activity lasting throughout the day. However, it turned out to be the crucial event where we chose our visionaries and challenge statements, determining the teams and problems we would work on for the rest of ProtoSem.",
            },
            {
              type: "paragraph",
              text: "The first part was selecting visionaries. 26 students interested in becoming visionaries stepped forward. We explained our leadership vision, nominated peers based on capability, and identified areas of readiness. Through three intense rounds of voting and debate, 8 candidates were eliminated, leaving the final group of 18 visionaries.",
            },
            {
              type: "paragraph",
              text: "Then came the second, chaotic part: choosing from 15 challenge statements. We surrendered our phones and relied strictly on physical notes. As visionaries competed for identical statements, debates grew intense. At one point, I was given only a couple of minutes to convince others or forfeit my statement. Eventually, I joined another team led by a friend, working on a financial-related problem statement.",
            },
            {
              type: "image",
              src: "/protosem/week-4-hero.jpg",
              alt: "Collaborative Lab Workspace and Marketplace Session",
              caption: "Collaborative lab workspace during ProtoSem Week 4 Marketplace and team sessions",
            },
            {
              type: "paragraph",
              text: "Although Marketplace was chaotic, stressful, and intense, I enjoyed the experience. It taught me that teamwork is about adapting, communicating, and compromising. I am happy with the outcome and excited to tackle our financial challenge statement with a fantastic team in the coming weeks of ProtoSem!",
            },
          ],
        },
      ],
    },
  },
  ...Array.from({ length: 16 }, (_, i) => placeholder(i + 5)),
];

export function getWeek(id: number) {
  return protosemWeeks.find((w) => w.id === id);
}

