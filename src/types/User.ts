export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  year: string;
  assessmentResults?: {
    stress: boolean;
    anxiety: boolean;
    depression: boolean;
    sleepIssues: boolean;
    score: number;
  };
}