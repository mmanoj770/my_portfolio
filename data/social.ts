export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "kaggle" | "leetcode" | "mail";
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/mmanoj770", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/manoj-m-kct", icon: "linkedin" },
  { label: "Kaggle", href: "https://www.kaggle.com/mmanoj7708", icon: "kaggle" },
  { label: "LeetCode", href: "https://leetcode.com/u/mmanoj7708/", icon: "leetcode" },
  { label: "Email", href: "mailto:mmanoj7708@gmail.com", icon: "mail" },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Protosem", href: "/protosem" },
  { label: "IoT Session", href: "/iot" },
  { label: "About", href: "/about" },
];
