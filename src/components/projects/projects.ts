export interface Project {
  id: string;
  number: string;
  name: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'dwello',
    number: '01',
    name: 'Dwello',
    title: 'Dwello — Stay Reservation Platform',
    shortDescription:
      'An Airbnb-inspired full-stack property rental platform for discovering and managing properties.',
    description:
      'An Airbnb-inspired full-stack property rental platform that allows users to discover, view, and manage property listings. The application includes user authentication, property listing management, image handling, and booking-related functionality, with a responsive web interface connected to a Node.js and MongoDB backend.',
    technologies: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'EJS'],
    githubUrl: 'https://github.com/HarshadaBodkhe/Dwello-Project',
    liveUrl: 'https://dwelloo.onrender.com',
    liveUrlLabel: 'Live Demo',
    image: '/projects/dwello.png',
  },
  {
    id: 'classlens',
    number: '02',
    name: 'ClassLens',
    title: 'ClassLens — Intelligent Attendance System',
    shortDescription:
      'An intelligent attendance system using facial and voice recognition to automate student attendance.',
    description:
      'An intelligent attendance management system designed to automate student attendance using facial and voice recognition. ClassLens provides student enrollment, subject management, attendance tracking, QR-based workflows, and a centralized interface for managing attendance data.',
    technologies: ['Python', 'Streamlit', 'OpenCV', 'Supabase'],
    githubUrl: 'https://github.com/HarshadaBodkhe/classlens',
    liveUrl: 'https://cl-landing-page.vercel.app/',
    liveUrlLabel: 'ClassLens',
    image: '/projects/classlens.png',
  },
  {
    id: 'sliceit',
    number: '03',
    name: 'SliceIt',
    title: 'SliceIt — Pizza Delivery System',
    shortDescription:
      'A full-stack pizza delivery platform with ordering, cart management, and online payment integration.',
    description:
      'A full-stack pizza delivery platform that allows users to browse pizzas, manage their cart, place orders, and complete online payments. The system also includes backend APIs and administrative functionality for managing products and orders, with Razorpay integrated for payment processing.',
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Redux Toolkit',
      'Razorpay',
    ],
    githubUrl: 'https://github.com/HarshadaBodkhe/OIBSIP_WebDevelopment_Level3_Task',
    image: '/projects/sliceit.png',
  },
  {
    id: 'ai-research-assistant',
    number: '04',
    name: 'AI Research Assistant',
    title: 'AI Research Assistant — Agentic RAG System',
    shortDescription:
      'An AI-powered RAG assistant for retrieving knowledge and generating context-aware research responses.',
    description:
      'An AI-powered research assistant that uses Retrieval-Augmented Generation to retrieve relevant information from a knowledge base and generate context-aware responses. The system combines document retrieval, embeddings, vector search, and an LLM-based response pipeline to make research and information discovery more efficient.',
    technologies: ['Python', 'LangChain', 'Agentic RAG'],
    githubUrl: 'https://github.com/HarshadaBodkhe/Agentic-RAG-Assistant',
    image: '/projects/ai-research-assistant.png',
  },
  {
    id: 'harshada-portfolio',
    number: '05',
    name: 'Harshada Portfolio',
    title: 'Harshada Portfolio — Personal Portfolio',
    shortDescription:
      'An interactive personal portfolio designed to showcase AI, full-stack development, engineering projects, and technical work through recruiter and engineer-focused experiences.',
    description:
      'An interactive personal portfolio designed to showcase AI, full-stack development, engineering projects, and technical work through recruiter and engineer-focused experiences.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'JavaScript'],
    githubUrl: 'https://github.com/HarshadaBodkhe/harshada-portfolio',
    image: '/projects/harshada-portfolio.png',
  },
];
