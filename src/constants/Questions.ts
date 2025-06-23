const programmingFundamentals = [
  {
    id: 'prog-1',
    question: '1. Which programming languages have you used?',
    type: 'multi',
    options: [
      { id: 1, answer: 'JavaScript' },
      { id: 2, answer: 'TypeScript' },
      { id: 3, answer: 'Java' },
      { id: 4, answer: 'Python' },
      { id: 5, answer: 'C#' },
      { id: 6, answer: 'None' },
    ],
  },
  {
    id: 'prog-2',
    question: '2. How familiar are you with OOP?',
    type: 'single',
    options: [
      { id: 1, answer: 'I don’t know what that is' },
      { id: 2, answer: 'Learned in theory' },
      { id: 3, answer: 'Applied in small projects' },
      { id: 4, answer: 'Built complete apps using OOP' },
    ],
  },
  {
    id: 'prog-3',
    question:
      '3. Have you solved problems using data structures and algorithms (e.g., arrays, maps, stacks)?',
    type: 'single',
    options: [
      { id: 1, answer: 'Never' },
      { id: 2, answer: 'In class or tutorials' },
      { id: 3, answer: 'Occasioanly on my own' },
      { id: 4, answer: 'Regularly' },
    ],
  },
];

const frontendDevelopment = [
  {
    id: 'front-1',
    question: '4. Which frontend tools have you used in a project?',
    type: 'multi',
    options: [
      { id: 1, answer: 'HTML & CSS' },
      { id: 2, answer: 'JavaScript' },
      { id: 3, answer: 'React' },
      { id: 4, answer: 'Angular' },
      { id: 5, answer: 'Next.js' },
      { id: 6, answer: 'TailwindCSS' },
      { id: 7, answer: 'None' },
    ],
  },
  {
    id: 'front-2',
    question: '5. Have you built responsive UIs (mobile/tablet/desktop)?',
    type: 'single',
    options: [
      { id: 1, answer: 'No' },
      { id: 2, answer: 'Tried but not confident' },
      { id: 3, answer: 'Yes, using media queries or a framework' },
      { id: 4, answer: 'Yes, confidently using mobile-first design' },
    ],
  },
];

const backendDevelopment = [
  {
    id: 'back-1',
    question: '6. Which backend technologies have you used?',
    type: 'multi',
    options: [
      { id: 1, answer: 'Node.js' },
      { id: 2, answer: 'NestJS' },
      { id: 3, answer: 'Django' },
      { id: 4, answer: 'ASP.NET / .NET Core' },
      { id: 5, answer: 'Spring Boot' },
      { id: 6, answer: 'I haven’t done backend development' },
    ],
  },
  {
    id: 'back-2',
    question: '7. Have you built or connected to a REST API?',
    type: 'single',
    options: [
      { id: 1, answer: 'No' },
      { id: 2, answer: 'Followed a tutorial' },
      { id: 3, answer: 'Yes, but not fully understood' },
      { id: 4, answer: 'Yes, created & documented APIs' },
    ],
  },
];

const databaseSkills = [
  {
    id: 'db-1',
    question: '8. What’s your level of experience with databases?',
    type: 'single',
    options: [
      { id: 1, answer: 'I’ve never used one' },
      { id: 2, answer: 'I’ve only followed tutorials' },
      { id: 3, answer: 'I’ve built simple CRUD apps' },
      { id: 4, answer: 'I’ve designed schemas with relationships' },
    ],
  },
  {
    id: 'db-2',
    question: '9. Which databases/tools have you used?',
    type: 'multi',
    options: [
      { id: 1, answer: 'PostgreSQL' },
      { id: 2, answer: 'MySQL' },
      { id: 3, answer: 'MongoDB' },
      { id: 4, answer: 'Firebase Firestore' },
      { id: 5, answer: 'ORMs like JPA / TypeORM / Prisma' },
      { id: 6, answer: 'None' },
    ],
  },
];

const gitAndVersionControl = [
  {
    id: 'git-1',
    question: '10. Have you used Git for version control?',
    type: 'single',
    options: [
      { id: 1, answer: 'No' },
      { id: 2, answer: 'Yes, for personal use' },
      { id: 3, answer: 'Yes, and pushed to GitHub' },
      {
        id: 4,
        answer: 'Yes, worked with a team (branches, PRs, merge conflicts)',
      },
    ],
  },
  {
    id: 'git-2',
    question: '11. Do you have any public code on GitHub or GitLab?',
    type: 'single',
    options: [
      { id: 1, answer: 'No' },
      { id: 2, answer: 'A few test files' },
      { id: 3, answer: 'One or two small projects' },
      { id: 4, answer: 'Several complete, organized projects' },
    ],
  },
];

const devOps = [
  {
    id: 'devops-1',
    question: '12. Have you deployed any web applications?',
    type: 'single',
    options: [
      { id: 1, answer: 'No' },
      { id: 2, answer: 'Once or twice with help' },
      { id: 3, answer: 'Yes, via Netlify, Firebase, Vercel' },
      { id: 4, answer: 'Yes, full-stack apps (incl. backend + DB)' },
    ],
  },
  {
    id: 'devops-2',
    question: '13. Which platforms have you used?',
    type: 'multi',
    options: [
      { id: 1, answer: 'Firebase Hosting' },
      { id: 2, answer: 'Netlify' },
      { id: 3, answer: 'Vercel' },
      { id: 4, answer: 'AWS / Azure / GCP' },
      { id: 5, answer: 'Docker' },
      { id: 6, answer: 'None' },
    ],
  },
];

const softSkills = [
  {
    id: 'soft-1',
    question: '14. Have you worked in a team (project, internship, uni group)?',
    type: 'single',
    options: [
      { id: 1, answer: 'No' },
      { id: 2, answer: 'Yes, but not coding together' },
      { id: 3, answer: 'Yes, coding together with Git' },
      { id: 4, answer: 'Yes, including task planning, communication, and Git' },
    ],
  },
  {
    id: 'soft-2',
    question: '15. How confident are you explaining your code in interviews?',
    type: 'single',
    options: [
      { id: 1, answer: 'Not confident' },
      { id: 2, answer: 'Somewhat confident' },
      { id: 3, answer: 'Confident when I’ve prepared' },
      { id: 4, answer: 'Very confident – I’ve done mocks or real interviews' },
    ],
  },
];

export {
  programmingFundamentals,
  frontendDevelopment,
  backendDevelopment,
  databaseSkills,
  devOps,
  gitAndVersionControl,
  softSkills,
};
