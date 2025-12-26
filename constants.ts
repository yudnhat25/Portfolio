
import { Project, AppData } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'HR Attrition Prediction System',
    category: 'Machine Learning | Data Science',
    techStack: ['Python', 'Orange', 'Data Analysis'],
    description: 'Developed a machine learning model to predict employee turnover risk by analyzing HR datasets and identifying key behavioral and organizational factors.',
    achievements: [
      'Performed feature engineering and data cleaning',
      'Identified risk groups for targeted retention strategies',
      'Translated model outputs into actionable HR insights',
      'Enabled data-driven workforce management decisions'
    ],
    impact: 'Improved understanding of attrition patterns to support proactive HR interventions',
    tags: ['#MachineLearning', '#PredictiveAnalytics', '#HR', '#Python']
  },
  {
    id: 'p2',
    title: 'Student Management Application',
    category: 'Full-Stack Development | Database Design',
    techStack: ['JavaFX', 'SQL Server', 'Java'],
    description: 'Built a comprehensive student management system with CRUD operations, role-based access control, and automated data handling capabilities.',
    achievements: [
      'Designed normalized database with 5 relational tables',
      'Implemented automated seeding for 100+ student records',
      'Created Admin and User dashboards with search & filter',
      'Built Excel export functionality for reporting'
    ],
    impact: 'Reduced manual data-handling effort by 60% and improved data consistency',
    tags: ['#JavaFX', '#DatabaseDesign', '#CRUD', '#Dashboard']
  },
  {
    id: 'p3',
    title: 'Soft Skills Development Solution',
    category: 'Design Thinking | UX Research',
    techStack: ['Survey Tools', 'Figma', 'User Research'],
    description: 'Conducted comprehensive user research with 107 students to identify barriers in soft-skill development and designed a VR-based training solution.',
    achievements: [
      'Analyzed 107 survey responses and interview transcripts',
      'Performed user segmentation based on psychological traits',
      'Synthesized findings into actionable design insights',
      'Proposed innovative VR-based training methodology'
    ],
    impact: 'Identified key frustration points and guided feature development for educational solution',
    tags: ['#DesignThinking', '#UserResearch', '#VRTraining', '#UX']
  }
];

export const SKILLS = {
  technical: [
    { name: 'SQL Server', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Microsoft Excel (Advanced)', level: 90 },
    { name: 'Power BI', level: 75 },
    { name: 'JavaFX', level: 70 },
    { name: 'Orange (Data Mining)', level: 65 },
    { name: 'Figma', level: 70 }
  ],
  analysis: [
    { name: 'Data Modeling', level: 85 },
    { name: 'UML Diagrams', level: 80 },
    { name: 'Flowchart Design', level: 80 },
    { name: 'Feature Engineering', level: 75 },
    { name: 'Data Visualization', level: 85 },
    { name: 'Statistical Analysis', level: 75 }
  ],
  soft: [
    { name: 'Problem Solving', level: 90 },
    { name: 'Time Management', level: 85 },
    { name: 'Team Collaboration', level: 88 },
    { name: 'Fast Learning', level: 92 },
    { name: 'Analysis & Critical Thinking', level: 90 }
  ]
};

export const TIMELINE = [
  {
    year: '2023 - 2027',
    institution: 'University of Economics Ho Chi Minh City (UEH)',
    role: 'Major: Fintech',
    details: 'GPA: 3.52/4.00. Focus on Data Analysis, ML, and Financial Technology.'
  },
  {
    year: '2020 - 2023',
    institution: 'Le Khiet High School for the Gifted',
    role: 'Major: IT',
    details: 'Foundation in technology, algorithms, and analytical thinking.'
  }
];

// Added motivational quotes for the tracker
export const MOTIVATIONAL_QUOTES = [
  "The only way to learn a new programming language is by writing programs in it.",
  "Data is the new oil, and analysis is the engine.",
  "Learning never exhausts the mind.",
  "Consistency beats intensity.",
  "Small steps every day lead to big results."
];

// Added default initial data for the tracker application state
export const INITIAL_DATA: AppData = {
  logs: [],
  goals: [
    { id: 'g1', title: 'Complete SQL Mastery', progress: 40, category: 'SQL & Database', deadline: '2024-12-20' },
    { id: 'g2', title: 'ML Model Deployment', progress: 15, category: 'Python & Machine Learning', deadline: '2025-01-15' }
  ],
  streak: {
    current: 0,
    longest: 0,
    lastCheckIn: null,
    totalDays: 0
  }
};