import { SkillLevelType } from './skillScoringConfig';

export type RoadmapSuggestionsType = {
  [category: string]: {
    [level in SkillLevelType]: string[];
  };
};

export const roadmapSuggestions: RoadmapSuggestionsType = {
  programmingFundamentals: {
    None: [
      'Learn basic syntax of a programming language (e.g., JavaScript)',
      'Understand variables, loops, and conditionals',
    ],
    Beginner: [
      'Practice OOP concepts with small projects',
      'Understand functions and error handling',
    ],
    Intermediate: [
      'Solve real-world problems using data structures',
      'Explore time and space complexity',
    ],
    Pro: [
      'Contribute to open source or mentor others',
      'Learn system design basics',
    ],
  },
  frontendDev: {
    None: ['Learn HTML, CSS, and JavaScript basics'],
    Beginner: [
      'Build responsive pages using Flexbox and Grid',
      'Learn React basics',
    ],
    Intermediate: [
      'Use advanced React patterns and routing',
      'Explore component libraries',
    ],
    Pro: ['Build a complete SPA with Next.js', 'Learn SSR and optimization'],
  },
  backendDev: {
    None: ['Learn basics of backend using Node.js or Python'],
    Beginner: ['Follow a REST API tutorial and connect to a DB'],
    Intermediate: ['Build your own API and handle auth'],
    Pro: ['Learn advanced topics like sockets, caching, and security'],
  },
  databases: {
    None: ['Understand what databases are and why we use them'],
    Beginner: ['Build a simple CRUD app using a database'],
    Intermediate: ['Design normalized schemas and use joins/relations'],
    Pro: ['Optimize queries and learn indexing and transactions'],
  },
  git: {
    None: ['Learn Git basics: init, commit, push, pull'],
    Beginner: ['Push code to GitHub and explore repos'],
    Intermediate: ['Use branches, PRs, and handle merge conflicts'],
    Pro: ['Follow Git workflows like GitFlow in team projects'],
  },
  devops: {
    None: ['Understand what deployment is'],
    Beginner: ['Deploy a frontend app with Vercel or Netlify'],
    Intermediate: ['Deploy full-stack apps and connect databases'],
    Pro: ['Use Docker, CI/CD, and cloud platforms like AWS'],
  },
  softSkills: {
    None: ['Practice writing README files and documentation'],
    Beginner: ['Join group projects and work on communication'],
    Intermediate: ['Do mock interviews and explain your code'],
    Pro: ['Lead a project and mentor teammates'],
  },
};
