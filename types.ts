
export interface Project {
  id: string;
  title: string;
  category: string;
  techStack: string[];
  description: string;
  achievements: string[];
  impact: string;
  tags: string[];
}

// Added LearningLog interface for tracking study sessions
export interface LearningLog {
  id: string;
  date: string;
  category: string;
  duration: number;
  notes: string;
  topics: string[];
  rating: number;
}

// Added Goal interface for learning objectives
export interface Goal {
  id: string;
  title: string;
  progress: number;
  category: string;
  deadline: string;
}

// Added AppData interface for the overall state of the tracker
export interface AppData {
  logs: LearningLog[];
  goals: Goal[];
  streak: {
    current: number;
    longest: number;
    lastCheckIn: string | null;
    totalDays: number;
  };
}

export const CATEGORIES = [
  "SQL & Database",
  "Python & Machine Learning",
  "Data Visualization",
  "Design Thinking & UX",
  "Language Learning",
  "FinTech Knowledge"
];