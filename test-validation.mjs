/**
 * Tests the validation and quiz-scoring modules used by the application.
 *
 * Run with: node test-validation.mjs
 */

import assert from 'node:assert/strict';
import test from 'node:test';
import { EVENT_CONFIG, formatEventDate } from './src/data/eventConfig.js';
import { SCHEDULE_DATA } from './src/data/scheduleData.js';
import {
  QUIZ_QUESTIONS,
  TEAM_INTERESTS,
  TEAM_ROLES,
  TEAM_ROLE_PREFERENCES,
  TEAM_SKILLS,
} from './src/data/quizData.js';
import { calculateResult } from './src/utils/quizScoring.js';
import {
  REGISTRATION_FIELDS,
  validateForm,
  validators,
} from './src/utils/validation.js';

const validForm = {
  fullName: 'Alex Example',
  email: 'alex@example.com',
  phone: '9876543210',
  college: 'Example College',
  department: 'Engineering',
  year: '1st Year',
  teamName: '',
  ideaDescription: '',
};

test('configured event duration is exactly 24 hours', () => {
  const durationMs = Date.parse(EVENT_CONFIG.endDate) - Date.parse(EVENT_CONFIG.startDate);

  assert.equal(durationMs, 24 * 60 * 60 * 1000);
  assert.equal(EVENT_CONFIG.durationHours, 24);
});

test('Day 2 closing ends at the configured event end time', () => {
  const dayTwo = SCHEDULE_DATA[1];
  const finalEvent = dayTwo.events.at(-1);
  const overnightSession = SCHEDULE_DATA[0].events.at(-1);

  assert.equal(dayTwo.date, formatEventDate(EVENT_CONFIG.endDate));
  assert.deepEqual(
    dayTwo.events.map((event) => event.title),
    ['Prototype Finalization', 'Final Presentations', 'Jury Evaluation', 'Results & Closing Ceremony']
  );
  assert.equal(dayTwo.events[0].time, overnightSession.endTime);
  assert.deepEqual(
    dayTwo.events.slice(1).map((event, index) => event.time === dayTwo.events[index].endTime),
    [true, true, true]
  );
  assert.equal(finalEvent.title, 'Results & Closing Ceremony');
  assert.equal(finalEvent.endTime, EVENT_CONFIG.displayTime.replace(' IST', ''));
});

test('team finder exposes the requested interests, skills, and preferred roles', () => {
  assert.deepEqual(TEAM_INTERESTS, [
    'Artificial Intelligence',
    'Healthcare',
    'Sustainability',
    'FinTech',
    'Education',
    'Social Innovation',
  ]);
  assert.deepEqual(TEAM_SKILLS, ['Development', 'Design', 'Business', 'Research']);
  assert.deepEqual(
    TEAM_ROLE_PREFERENCES.map(({ label }) => label),
    ['Builder', 'Designer', 'Strategist', 'Researcher', 'Presenter']
  );
});

test('each recommended role describes strengths and complementary roles', () => {
  assert.deepEqual(Object.keys(TEAM_ROLES), [
    'builder',
    'designer',
    'strategist',
    'researcher',
    'presenter',
  ]);

  for (const role of Object.values(TEAM_ROLES)) {
    assert.ok(role.description.length > 0);
    assert.ok(role.traits.length > 0);
    assert.ok(role.complements.length > 0);
    assert.ok(role.complements.every((complement) => complement !== role.id));
  }
});

test('team finder keeps every role available in each of its five questions', () => {
  const roleIds = Object.keys(TEAM_ROLES).sort();

  assert.equal(QUIZ_QUESTIONS.length, 5);
  for (const [index, question] of QUIZ_QUESTIONS.entries()) {
    assert.equal(question.options.length, roleIds.length, `Question ${index + 1} has one option per role`);
    assert.deepEqual(
      question.options.map(({ role }) => role).sort(),
      roleIds,
      `Question ${index + 1} offers each existing role exactly once`
    );
  }
});

function answersForRoles(roles) {
  return Object.fromEntries(
    roles.map((role, questionIndex) => {
      const optionIndex = QUIZ_QUESTIONS[questionIndex].options.findIndex(
        (option) => option.role === role
      );
      assert.notEqual(optionIndex, -1, `Question ${questionIndex + 1} has role ${role}`);
      return [questionIndex, optionIndex];
    })
  );
}

test('application registration field definitions cover all form values', () => {
  assert.deepEqual(
    REGISTRATION_FIELDS.map((field) => field.name),
    ['fullName', 'email', 'phone', 'college', 'department', 'year', 'teamName', 'ideaDescription']
  );
});

test('year of study offers and accepts only the first four years', () => {
  const yearField = REGISTRATION_FIELDS.find((field) => field.name === 'year');
  const availableYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  assert.deepEqual(yearField.options, availableYears);
  for (const year of availableYears) {
    assert.equal(validateForm({ ...validForm, year }).isValid, true, `${year} is accepted`);
  }
  assert.equal(validateForm({ ...validForm, year: '5th Year' }).errors.year,
    'Choose a valid year of study.');
});

test('valid required registration values and blank optional values pass', () => {
  assert.deepEqual(validateForm(validForm), { errors: {}, isValid: true });
});

test('valid values in optional registration fields pass', () => {
  assert.equal(
    validateForm({
      ...validForm,
      teamName: 'Idea Makers',
      ideaDescription: 'A practical solution to a local problem.',
    }).isValid,
    true
  );
});

test('missing and whitespace-only required fields produce field-specific errors', () => {
  const { errors, isValid } = validateForm({
    ...validForm,
    fullName: ' ',
    email: '',
    phone: '  ',
    college: '',
    department: '',
    year: '',
  });

  assert.equal(isValid, false);
  assert.deepEqual(Object.keys(errors).sort(), [
    'college',
    'department',
    'email',
    'fullName',
    'phone',
    'year',
  ]);
  assert.equal(errors.fullName, 'Add your name.');
  assert.equal(errors.year, 'Add year of study.');
});

test('email validator accepts ordinary, plus-tagged, and whitespace-padded addresses', () => {
  assert.equal(validators.email('user@example.com'), null);
  assert.equal(validators.email('test.user+tag@domain.co.in'), null);
  assert.equal(validators.email(' user@example.com '), null);
});

test('email validator rejects missing parts, invalid domains, and empty values', () => {
  for (const value of ['', '   ', 'invalid', 'user@', '@domain.com', 'user@example.c']) {
    assert.notEqual(validators.email(value), null, `Rejects ${JSON.stringify(value)}`);
  }
});

test('phone validator accepts Indian numbers with supported prefixes and separators', () => {
  for (const value of [
    '9876543210',
    '+919876543210',
    '+91 98765 43210',
    '+91-98765-43210',
    '09876543210',
    '6123456789',
  ]) {
    assert.equal(validators.phone(value), null, `Accepts ${value}`);
  }
});

test('phone validator rejects invalid prefixes, lengths, and empty values', () => {
  for (const value of ['', '   ', '1234567890', '5234567890', '98765', '98765432101', '+1 9876543210']) {
    assert.notEqual(validators.phone(value), null, `Rejects ${JSON.stringify(value)}`);
  }
});

test('required and length validators handle boundary values', () => {
  assert.equal(validators.required(' value ', 'Name'), null);
  assert.equal(validators.required('  ', 'Name'), 'Add name.');
  assert.equal(validators.minLength('ab', 2, 'Name'), null);
  assert.equal(validators.minLength('a', 2, 'Name'), 'Name must be at least 2 characters.');
  assert.equal(validators.maxLength('abc', 3, 'Name'), null);
  assert.equal(validators.maxLength('abcd', 3, 'Name'), 'Name must be no more than 3 characters.');
});

test('registration length limits accept boundaries and reject overlong values', () => {
  assert.equal(validateForm({ ...validForm, fullName: 'A'.repeat(100) }).isValid, true);
  assert.equal(validateForm({ ...validForm, fullName: 'A'.repeat(101) }).errors.fullName,
    'Your name must be no more than 100 characters.');
  assert.equal(validateForm({ ...validForm, teamName: 'T'.repeat(50) }).isValid, true);
  assert.equal(validateForm({ ...validForm, teamName: 'T'.repeat(51) }).errors.teamName,
    'Team name must be no more than 50 characters.');
  assert.equal(validateForm({ ...validForm, ideaDescription: 'I'.repeat(500) }).isValid, true);
  assert.equal(validateForm({ ...validForm, ideaDescription: 'I'.repeat(501) }).errors.ideaDescription,
    'Idea description must be no more than 500 characters.');
});

test('quiz scoring awards all five answers to each actual quiz role', () => {
  for (const role of Object.keys(TEAM_ROLES)) {
    const result = calculateResult(
      answersForRoles(Array(QUIZ_QUESTIONS.length).fill(role)),
      QUIZ_QUESTIONS
    );

    assert.equal(result.role, role);
    assert.equal(result.scores[role], QUIZ_QUESTIONS.length);
    assert.equal(result.maxScore, QUIZ_QUESTIONS.length);
    assert.equal(result.isTie, false);
  }
});

test('quiz scoring uses the application tie-break priority', () => {
  const tieCases = [
    { roles: ['builder', 'designer', 'strategist', 'researcher', 'presenter'], winner: 'builder' },
    { roles: ['designer', 'designer', 'strategist', 'strategist', 'presenter'], winner: 'designer' },
    { roles: ['strategist', 'strategist', 'researcher', 'researcher', 'presenter'], winner: 'strategist' },
    { roles: ['researcher', 'researcher', 'presenter', 'presenter', 'builder'], winner: 'researcher' },
  ];

  for (const { roles, winner } of tieCases) {
    const result = calculateResult(answersForRoles(roles), QUIZ_QUESTIONS);
    assert.equal(result.role, winner);
    assert.equal(result.isTie, true);
  }
});

test('quiz scoring handles a clear mixed-answer winner', () => {
  const result = calculateResult(
    answersForRoles(['builder', 'strategist', 'strategist', 'strategist', 'builder']),
    QUIZ_QUESTIONS
  );

  assert.equal(result.role, 'strategist');
  assert.equal(result.scores.strategist, 3);
  assert.equal(result.scores.builder, 2);
  assert.equal(result.isTie, false);
});

test('quiz scoring ignores unanswered and out-of-range option indices', () => {
  const result = calculateResult(
    { 0: QUIZ_QUESTIONS[0].options.findIndex((option) => option.role === 'designer'), 1: null, 2: 99 },
    QUIZ_QUESTIONS
  );

  assert.equal(result.role, 'designer');
  assert.equal(result.scores.designer, 1);
  assert.equal(result.maxScore, 1);
});

test('quiz scoring ignores options assigned to unsupported roles', () => {
  const result = calculateResult(
    { 0: 0 },
    [{ options: [{ role: 'unsupported-role' }] }]
  );

  assert.equal(result.role, 'builder');
  assert.equal(result.maxScore, 0);
  assert.equal(result.isTie, true);
});

test('quiz scoring treats an empty answer set as a five-way tie by current priority', () => {
  const result = calculateResult({}, QUIZ_QUESTIONS);

  assert.equal(result.role, 'builder');
  assert.deepEqual(result.scores, {
    builder: 0,
    designer: 0,
    strategist: 0,
    researcher: 0,
    presenter: 0,
  });
  assert.equal(result.maxScore, 0);
  assert.equal(result.isTie, true);
});
