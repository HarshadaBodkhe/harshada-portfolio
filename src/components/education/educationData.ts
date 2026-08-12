export interface BEEducationDetails {
  degree: string;
  institute: string;
  location: string;
  duration: string;
  cgpa: string;
  description: string;
  logoPath: string;
  universityAffiliation: {
    name: string;
    label: string;
    logoPath: string;
  };
}

export interface SecondaryEducationEntry {
  id: string;
  title: string;
  institution?: string;
  qualification: string;
  board: string;
  divisionalBoard: string;
  passingYear: string;
  resultScore: string;
  resultStatus: string;
  logoPath: string;
}

export const BE_EDUCATION_DATA: BEEducationDetails = {
  degree: 'B.E. Artificial Intelligence & Data Science',
  institute: 'Dr. D. Y. Patil Institute of Engineering, Management & Research',
  location: 'Pune, Maharashtra',
  duration: '2023 — 2027',
  cgpa: '9.21',
  description:
    'Currently pursuing a Bachelor of Engineering in Artificial Intelligence & Data Science, developing a strong foundation in software engineering, artificial intelligence, data-driven systems, and practical application development through academic and personal projects.',
  logoPath: '/education/dypiemr-logo.png',
  universityAffiliation: {
    label: 'Affiliated to',
    name: 'Savitribai Phule Pune University',
    logoPath: '/education/sppu-logo.png',
  },
};

export const SECONDARY_EDUCATION_DATA: SecondaryEducationEntry[] = [
  {
    id: 'hsc',
    title: '12th / Higher Secondary',
    institution: "Saint Paul's Junior College, Akot",
    qualification: 'Higher Secondary Certificate (Science Stream)',
    board: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    divisionalBoard: 'Amravati Divisional Board',
    passingYear: 'February 2023',
    resultScore: '79.67% (478 / 600)',
    resultStatus: 'PASS',
    logoPath: '/education/class12-junior-college-logo.png',
  },
  {
    id: 'ssc',
    title: '10th / Secondary',
    institution: 'Shri Bhausaheb Pote Vidyalay, Akot',
    qualification: 'Secondary School Certificate (SSC)',
    board: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    divisionalBoard: 'Amravati Divisional Board',
    passingYear: '2021',
    resultScore: '97.80% (489 / 500)',
    resultStatus: 'PASS',
    logoPath: '/education/class10-board-logo.png',
  },
];
