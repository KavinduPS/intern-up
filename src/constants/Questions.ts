const programmingFundamentals = [
  {
    id: 'prog-1',
    question: '1. Which programming languages have you used?',
    type: 'multi',
    options: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C#', 'None'],
  },
  {
    id: 'prog-2',
    question: '2. How familiar are you with OOP?',
    type: 'single',
    options: [
      'I don’t know what that is',
      'Learned in theory',
      'Applied in small projects',
      'Built complete apps using OOP',
    ],
  },
  {
    id: 'prog-3',
    question:
      '3. Have you solved problems using data structures and algorithms (e.g., arrays, maps, stacks)?',
    type: 'single',
    options: [
      'Never',
      'In class or tutorials',
      'Occasioanly on my own',
      'Regularly',
    ],
  },
];

export { programmingFundamentals };
