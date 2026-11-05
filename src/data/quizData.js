/**
 * Team Finder role recommendations and optional participant profile choices.
 * The quiz suggests a role; it does not match participants with other people.
 */

export const TEAM_ROLES = {
  builder: {
    id: 'builder',
    title: 'THE BUILDER',
    label: 'Builder',
    emoji: '🔧',
    focus: 'Development, prototyping and implementation',
    description: 'You like turning a concept into something people can try. You can help the team build an early version, test how it works and make practical improvements.',
    traits: ['Hands-on problem-solving', 'Rapid prototyping', 'Technical exploration', 'Iterative building'],
    complements: ['designer', 'researcher', 'presenter'],
  },
  designer: {
    id: 'designer',
    title: 'THE DESIGNER',
    label: 'Designer',
    emoji: '🎨',
    focus: 'User experience, visual thinking and creative problem-solving',
    description: 'You pay attention to how a solution feels and works for people. You can help make an idea clearer, easier to use and more thoughtful.',
    traits: ['Visual thinking', 'User empathy', 'Creative exploration', 'Attention to detail'],
    complements: ['builder', 'strategist', 'presenter'],
  },
  strategist: {
    id: 'strategist',
    title: 'THE STRATEGIST',
    label: 'Strategist',
    emoji: '🧭',
    focus: 'Business thinking, direction and decision-making',
    description: 'You enjoy connecting the problem, the people affected and the proposed solution. You can help a team stay focused and make deliberate choices.',
    traits: ['Big-picture thinking', 'Prioritisation', 'Business reasoning', 'Team alignment'],
    complements: ['builder', 'designer', 'researcher'],
  },
  researcher: {
    id: 'researcher',
    title: 'THE RESEARCHER',
    label: 'Researcher',
    emoji: '🔎',
    focus: 'Problem discovery, evidence and validation',
    description: 'You want to understand a challenge before settling on an answer. You can help the team ask better questions, check assumptions and learn from feedback.',
    traits: ['Curiosity', 'Evidence gathering', 'Critical thinking', 'Assumption testing'],
    complements: ['builder', 'designer', 'presenter'],
  },
  presenter: {
    id: 'presenter',
    title: 'THE PRESENTER',
    label: 'Presenter',
    emoji: '🎤',
    focus: 'Communication, storytelling and pitching',
    description: 'You enjoy making ideas understandable to others. You can help the team explain the problem, the approach and what the prototype or feedback revealed.',
    traits: ['Clear communication', 'Storytelling', 'Audience awareness', 'Confident presenting'],
    complements: ['builder', 'designer', 'researcher'],
  },
};

export const TEAM_INTERESTS = [
  'Artificial Intelligence',
  'Healthcare',
  'Sustainability',
  'FinTech',
  'Education',
  'Social Innovation',
];

export const TEAM_SKILLS = ['Development', 'Design', 'Business', 'Research'];

export const TEAM_ROLE_PREFERENCES = Object.values(TEAM_ROLES).map(({ id, label }) => ({
  value: id,
  label,
}));

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'A problem lands in front of your team. What do you do first?',
    options: [
      { text: 'Make a rough version and see what works.', role: 'builder' },
      { text: 'Map how someone might use a solution.', role: 'designer' },
      { text: 'Set a direction and choose what to tackle first.', role: 'strategist' },
      { text: 'Find out who the problem affects and why.', role: 'researcher' },
      { text: 'Start a conversation and bring people into the problem.', role: 'presenter' },
    ],
  },
  {
    id: 2,
    question: 'Which part of an idea sprint would you lean into?',
    options: [
      { text: 'Building a prototype and learning by trying it.', role: 'builder' },
      { text: 'Shaping an experience people can understand and use.', role: 'designer' },
      { text: 'Planning a focused approach and making trade-offs.', role: 'strategist' },
      { text: 'Gathering evidence about what people need.', role: 'researcher' },
      { text: 'Making the idea clear and telling its story.', role: 'presenter' },
    ],
  },
  {
    id: 3,
    question: 'How do you learn whether an idea is worth pursuing?',
    options: [
      { text: 'Build something small and learn by trying it.', role: 'builder' },
      { text: 'Show a concept and see how people respond.', role: 'designer' },
      { text: 'Compare approaches against the goal and constraints.', role: 'strategist' },
      { text: 'Ask questions, check assumptions and learn from feedback.', role: 'researcher' },
      { text: 'Pitch the idea and listen to the questions it raises.', role: 'presenter' },
    ],
  },
  {
    id: 4,
    question: 'In a build team, what do you tend to own?',
    options: [
      { text: 'I get a first version made and help it improve.', role: 'builder' },
      { text: 'I make the experience clearer and more considered.', role: 'designer' },
      { text: 'I help the team decide what matters and what comes next.', role: 'strategist' },
      { text: 'I dig into the problem and bring useful findings back.', role: 'researcher' },
      { text: 'I connect people and communicate our shared direction.', role: 'presenter' },
    ],
  },
  {
    id: 5,
    question: 'At the end of 24 hours, what would you want to show?',
    options: [
      { text: 'A prototype that shows a solution in action.', role: 'builder' },
      { text: 'A concept that feels useful and easy to understand.', role: 'designer' },
      { text: 'A focused plan built around the problem.', role: 'strategist' },
      { text: 'A clearer picture of what needs testing next.', role: 'researcher' },
      { text: 'A clear pitch that helps others understand the idea.', role: 'presenter' },
    ],
  },
];
