export type SkillLevelType = 'None' | 'Beginner' | 'Intermediate' | 'Pro';

export const skillCategory = {
  programmingFundamentals: 'Programming Fundamentals',
  frontendDev: 'Frontend Development',
  backendDev: 'Backend Development',
  databases: 'Database Skills',
  git: 'Git and Version Control',
  devops: 'DevOps',
  softSkills: 'Soft Skills',
};

export const skillScoringConfig = {
  programmingFundamentals: {
    qIds: ['prog-1', 'prog-2', 'prog-3'],
    scoring: {
      'prog-1': (answer: string[]) => {
        if (answer.includes('None')) return 0;
        const count = answer.length;
        if (count === 1) return 1;
        if (count <= 3) return 2;
        return 3;
      },
      'prog-2': (answer: string) => {
        const map = {
          'I don’t know what that is': 0,
          'Learned in theory': 1,
          'Applied in small projects': 2,
          'Built complete apps using OOP': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
      'prog-3': (answer: string) => {
        const map = {
          Never: 0,
          'In class or tutorials': 1,
          'Occasionally on my own': 2,
          Regularly: 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 2) return 'None';
      if (score <= 4) return 'Beginner';
      if (score <= 7) return 'Intermediate';
      return 'Pro';
    },
  },

  frontendDev: {
    qIds: ['front-1', 'front-2'],
    scoring: {
      'front-1': (answer: string[]) => {
        if (answer.includes('None')) return 0;
        const count = answer.length;
        if (count === 1) return 1;
        if (count <= 4) return 2;
        return 3;
      },
      'front-2': (answer: string) => {
        const map = {
          No: 0,
          'Tried but not confident': 1,
          'Yes, using media queries or a framework': 2,
          'Yes, confidently using mobile-first design': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 1) return 'None';
      if (score <= 3) return 'Beginner';
      if (score <= 5) return 'Intermediate';
      return 'Pro';
    },
  },

  backendDev: {
    qIds: ['back-1', 'back-2'],
    scoring: {
      'back-1': (answer: string[]) => {
        if (answer.includes('I haven’t done backend development')) return 0;
        const count = answer.length;
        if (count === 1) return 1;
        if (count <= 3) return 2;
        return 3;
      },
      'back-2': (answer: string) => {
        const map = {
          No: 0,
          'Followed a tutorial': 1,
          'Yes, but not fully understood': 2,
          'Yes, created & documented APIs': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 1) return 'None';
      if (score <= 3) return 'Beginner';
      if (score <= 5) return 'Intermediate';
      return 'Pro';
    },
  },

  databases: {
    qIds: ['db-1', 'db-2'],
    scoring: {
      'db-1': (answer: string) => {
        const map = {
          'I’ve never used one': 0,
          'I’ve only followed tutorials': 1,
          'I’ve built simple CRUD apps': 2,
          'I’ve designed schemas with relationships': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
      'db-2': (answer: string[]) => {
        if (answer.includes('None')) return 0;
        const count = answer.length;
        if (count === 1) return 1;
        if (count <= 3) return 2;
        return 3;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 1) return 'None';
      if (score <= 3) return 'Beginner';
      if (score <= 5) return 'Intermediate';
      return 'Pro';
    },
  },

  git: {
    qIds: ['git-1', 'git-2'],
    scoring: {
      'git-1': (answer: string): number => {
        const map = {
          No: 0,
          'Yes, for personal use': 1,
          'Yes, and pushed to GitHub': 2,
          'Yes, worked with a team (branches, PRs, merge conflicts)': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
      'git-2': (answer: string) => {
        const map = {
          No: 0,
          'A few test files': 1,
          'One or two small projects': 2,
          'Several complete, organized projects': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 1) return 'None';
      if (score <= 3) return 'Beginner';
      if (score <= 5) return 'Intermediate';
      return 'Pro';
    },
  },

  devops: {
    qIds: ['devops-1', 'devops-2'],
    scoring: {
      'devops-1': (answer: string) => {
        const map = {
          No: 0,
          'Once or twice with help': 1,
          'Yes, via Netlify, Firebase, Vercel': 2,
          'Yes, full-stack apps (incl. backend + DB)': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
      'devops-2': (answer: string[]) => {
        if (answer.includes('None')) return 0;
        const count = answer.length;
        if (count === 1) return 1;
        if (count <= 3) return 2;
        return 3;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 1) return 'None';
      if (score <= 3) return 'Beginner';
      if (score <= 5) return 'Intermediate';
      return 'Pro';
    },
  },

  softSkills: {
    qIds: ['soft-1', 'soft-2'],
    scoring: {
      'soft-1': (answer: string) => {
        const map = {
          No: 0,
          'Yes, but not coding together': 1,
          'Yes, coding together with Git': 2,
          'Yes, including task planning, communication, and Git': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
      'soft-2': (answer: string) => {
        const map = {
          'Not confident': 0,
          'Somewhat confident': 1,
          'Confident when I’ve prepared': 2,
          'Very confident – I’ve done mocks or real interviews': 3,
        } as const;
        return map[answer as keyof typeof map] ?? 0;
      },
    },
    toLevel: (score: number): SkillLevelType => {
      if (score <= 1) return 'None';
      if (score <= 3) return 'Beginner';
      if (score <= 5) return 'Intermediate';
      return 'Pro';
    },
  },
};
