export interface SocialLinkConfig {
  id: string;
  name: string;
  url: string;
  ariaLabel: string;
  isExternal: boolean;
}

export const CONTACT_CONFIG = {
  heading: "LET'S CONNECT",
  eyebrow: "GET IN TOUCH",
  description:
    "Interested in what I build?\nLet's connect and talk about software engineering, AI, and ideas worth building.",
  copyright: `© ${new Date().getFullYear()} Harshada Bodkhe`,
  // Easily updated with actual phone number later (e.g. "+91XXXXXXXXXX")
  phoneNumber: '',
  emailAddress: 'harshada.bodkhe@example.com',
  githubUrl: 'https://github.com/HarshadaBodkhe',
  linkedinUrl: 'https://linkedin.com/in/harshadabodkhe',
};
