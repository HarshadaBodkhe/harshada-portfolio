export interface TechItem {
  name: string;
  slug?: string;
  customColor?: string;
  category?: string;
}

export interface TechCategory {
  title: string;
  skills: TechItem[];
}

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    title: 'LANGUAGES',
    skills: [
      { name: 'Java', slug: 'java', customColor: 'ED8B00', category: 'Languages' },
      { name: 'Python', slug: 'python', customColor: '3776AB', category: 'Languages' },
      { name: 'JavaScript', slug: 'javascript', customColor: 'F7DF1E', category: 'Languages' },
      { name: 'SQL', slug: 'mysql', customColor: '4479A1', category: 'Languages' },
    ],
  },
  {
    title: 'FRONTEND',
    skills: [
      { name: 'HTML', slug: 'html5', customColor: 'E34F26', category: 'Frontend' },
      { name: 'CSS', slug: 'css3', customColor: '1572B6', category: 'Frontend' },
      { name: 'JavaScript', slug: 'javascript', customColor: 'F7DF1E', category: 'Frontend' },
      { name: 'React', slug: 'react', customColor: '61DAFB', category: 'Frontend' },
    ],
  },
  {
    title: 'BACKEND',
    skills: [
      { name: 'Java', slug: 'java', customColor: 'ED8B00', category: 'Backend' },
      { name: 'Spring Boot', slug: 'springboot', customColor: '6DB33F', category: 'Backend' },
      { name: 'Node.js', slug: 'nodedotjs', customColor: '5FA04E', category: 'Backend' },
      { name: 'Express.js', slug: 'express', customColor: 'E8EEF5', category: 'Backend' },
      { name: 'REST APIs', slug: 'fastapi', customColor: '009688', category: 'Backend' },
    ],
  },
  {
    title: 'AI / MACHINE LEARNING',
    skills: [
      { name: 'Python', slug: 'python', customColor: '3776AB', category: 'AI / ML' },
      { name: 'Scikit-learn', slug: 'scikitlearn', customColor: 'F7931E', category: 'AI / ML' },
      { name: 'OpenCV', slug: 'opencv', customColor: '5C3EE8', category: 'AI / ML' },
      { name: 'LangChain', slug: 'langchain', customColor: '1C3C3C', category: 'AI / ML' },
      { name: 'RAG', slug: 'openai', customColor: '6DB8F5', category: 'AI / ML' },
      { name: 'Google Gemini API', slug: 'googlegemini', customColor: '8E75B2', category: 'AI / ML' },
    ],
  },
  {
    title: 'DATABASES',
    skills: [
      { name: 'MySQL', slug: 'mysql', customColor: '4479A1', category: 'Databases' },
      { name: 'PostgreSQL', slug: 'postgresql', customColor: '4169E1', category: 'Databases' },
      { name: 'MongoDB', slug: 'mongodb', customColor: '47A248', category: 'Databases' },
      { name: 'Supabase', slug: 'supabase', customColor: '3ECF8E', category: 'Databases' },
    ],
  },
  {
    title: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Git', slug: 'git', customColor: 'F05032', category: 'Tools' },
      { name: 'GitHub', slug: 'github', customColor: 'E8EEF5', category: 'Tools' },
      { name: 'VS Code', slug: 'visualstudiocode', customColor: '007ACC', category: 'Tools' },
      { name: 'Streamlit', slug: 'streamlit', customColor: 'FF4B4B', category: 'Tools' },
      { name: 'Render', slug: 'render', customColor: '46E3B7', category: 'Tools' },
      { name: 'Vercel', slug: 'vercel', customColor: 'E8EEF5', category: 'Tools' },
    ],
  },
];
