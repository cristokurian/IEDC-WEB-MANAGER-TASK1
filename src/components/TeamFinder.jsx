import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Hammer,
  MessageCircle,
  Palette,
  RotateCcw,
  Search,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  TEAM_INTERESTS,
  TEAM_ROLES,
  TEAM_ROLE_PREFERENCES,
  TEAM_SKILLS,
} from '../data/quizData';
import { EVENT_CONFIG } from '../data/eventConfig';
import { calculateResult } from '../utils/quizScoring';

const ROLE_ICONS = {
  builder: Hammer,
  designer: Palette,
  strategist: Compass,
  researcher: Search,
  presenter: MessageCircle,
};

const INTRO_ROLES = [
  { label: 'The Builder', Icon: Hammer },
  { label: 'The Designer', Icon: Palette },
  { label: 'The Strategist', Icon: Compass },
  { label: 'The Communicator', Icon: MessageCircle },
];

const entranceVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const entranceItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function ChoiceFieldset({ legend, options, selected, onToggle, name }) {
  return (
    <fieldset className="text-left">
      <legend className="text-sm font-medium text-neutral-700">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          const id = `${name}-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          const isSelected = selected.includes(value);

          return (
            <label key={value} htmlFor={id} className="cursor-pointer">
              <input
                id={id}
                name={name}
                type="checkbox"
                value={value}
                checked={isSelected}
                onChange={() => onToggle(value)}
                className="peer sr-only"
              />
              <span className="choice-chip inline-flex min-h-10 items-center rounded-full border border-neutral-300 px-3 py-2 text-xs text-neutral-700 peer-checked:border-charcoal peer-checked:bg-charcoal peer-checked:text-offwhite peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function TeamFinder() {
  const [phase, setPhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState({ interests: [], skills: [], preferredRoles: [] });
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState(1);
  const radioGroupRef = useRef(null);
  const resultHeadingRef = useRef(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  const toggleProfileChoice = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: previous[field].includes(value)
        ? previous[field].filter((choice) => choice !== value)
        : [...previous[field], value],
    }));
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setDirection(1);
    setPhase('quiz');
  };

  const selectAnswer = (optionIndex) => {
    setAnswers((previous) => ({ ...previous, [currentQuestion]: optionIndex }));
  };

  const handleOptionKeyDown = (event, optionIndex) => {
    const optionCount = question.options.length;
    let nextIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (optionIndex + 1) % optionCount;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (optionIndex - 1 + optionCount) % optionCount;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = optionCount - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectAnswer(nextIndex);
    radioGroupRef.current?.querySelectorAll('[role="radio"]')[nextIndex]?.focus();
  };

  const goNext = () => {
    if (selectedAnswer === undefined) return;

    if (isLastQuestion) {
      setResult(calculateResult(answers, QUIZ_QUESTIONS));
      setPhase('result');
      return;
    }

    setDirection(1);
    setCurrentQuestion((previous) => previous + 1);
  };

  const goPrev = () => {
    if (currentQuestion === 0) {
      setPhase('intro');
      return;
    }

    setDirection(-1);
    setCurrentQuestion((previous) => previous - 1);
  };

  const restart = () => {
    setPhase('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setProfile({ interests: [], skills: [], preferredRoles: [] });
    setResult(null);
    setDirection(1);
  };

  return (
    <section
      id="team-finder"
      aria-label="Find your build role"
      className="border-t border-neutral-200 bg-neutral-100"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 'intro' && (
              <motion.div
                key="intro"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                variants={entranceVariants}
                className="text-center"
              >
                <motion.p
                  variants={entranceItemVariants}
                  className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-neutral-600"
                >
                  Find your build role
                </motion.p>
                <motion.h2
                  id="team-finder-intro-title"
                  variants={entranceItemVariants}
                  className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  WHAT&apos;S YOUR ROLE IN THE <span className="text-accent">NEXT BIG IDEA?</span>
                </motion.h2>
                <motion.p
                  variants={entranceItemVariants}
                  className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base"
                >
                  Every great startup needs different minds. Discover how you could contribute to
                  building something real.
                </motion.p>

                <motion.div
                  variants={entranceVariants}
                  role="list"
                  aria-label="Possible build roles"
                  className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {INTRO_ROLES.map(({ label, Icon }) => (
                    <motion.div
                      key={label}
                      variants={entranceItemVariants}
                      role="listitem"
                      className="interactive-surface group flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-2 py-4"
                    >
                      <Icon className="text-accent transition-transform duration-200 group-hover:scale-110" size={22} aria-hidden="true" />
                      <span className="text-xs font-medium text-neutral-700">{label}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.details
                  variants={entranceItemVariants}
                  className="interactive-surface mx-auto mt-6 max-w-xl rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left"
                >
                  <summary className="cursor-pointer text-sm font-medium text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    Add optional context to your reflection
                  </summary>
                  <div className="mt-5 space-y-5 border-t border-neutral-200 pt-5">
                    <p className="text-xs leading-relaxed text-neutral-600">
                      These choices do not affect your quiz result. They are only shown in your
                      summary.
                    </p>
                    <ChoiceFieldset
                      name="team-interest"
                      legend="Interest areas"
                      options={TEAM_INTERESTS}
                      selected={profile.interests}
                      onToggle={(value) => toggleProfileChoice('interests', value)}
                    />
                    <ChoiceFieldset
                      name="team-skill"
                      legend="Skill areas"
                      options={TEAM_SKILLS}
                      selected={profile.skills}
                      onToggle={(value) => toggleProfileChoice('skills', value)}
                    />
                    <ChoiceFieldset
                      name="team-preferred-role"
                      legend="Build roles you are curious about"
                      options={TEAM_ROLE_PREFERENCES}
                      selected={profile.preferredRoles}
                      onToggle={(value) => toggleProfileChoice('preferredRoles', value)}
                    />
                  </div>
                </motion.details>

                <motion.button
                  variants={entranceItemVariants}
                  type="button"
                  onClick={startQuiz}
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-charcoal px-8 py-3.5 text-sm font-medium text-offwhite transition-colors duration-200 hover:bg-neutral-700"
                >
                  <Sparkles size={16} aria-hidden="true" />
                  START THE DISCOVERY
                </motion.button>
                <motion.p variants={entranceItemVariants} className="mt-4 text-xs text-neutral-600">
                  5 questions · A quick reflection · No sign-up
                </motion.p>
                <motion.p
                  variants={entranceItemVariants}
                  className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-neutral-600"
                >
                  Your answers suggest a build role; they do not assign a team or match you with
                  other participants.
                </motion.p>
              </motion.div>
            )}

            {phase === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-neutral-200 bg-offwhite p-5 sm:p-8 lg:p-10"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700">
                    QUESTION {String(currentQuestion + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
                  </p>
                  <p className="text-xs font-medium text-neutral-600">{progress}% through</p>
                </div>
                <div
                  className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200"
                  role="progressbar"
                  aria-label="Quiz progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <motion.div
                    className="h-full origin-left rounded-full bg-accent"
                    initial={false}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
                <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                  Question {currentQuestion + 1} of {totalQuestions}: {question.question}
                </p>

                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={currentQuestion}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={(exitDirection) => ({
                      opacity: 0,
                      x: exitDirection * -24,
                      transition: { duration: 0.18 },
                    })}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                    className="pt-6"
                  >
                    <h3
                      id={`team-finder-question-${currentQuestion}`}
                      className="font-heading text-xl font-bold leading-snug sm:text-2xl"
                    >
                      {question.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      Choose the response that feels closest to your instinct. There are no wrong
                      answers.
                    </p>
                    <div
                      ref={radioGroupRef}
                      className="mt-6 space-y-3"
                      role="radiogroup"
                      aria-labelledby={`team-finder-question-${currentQuestion}`}
                    >
                      {question.options.map((option, index) => {
                        const Icon = ROLE_ICONS[option.role];
                        const role = TEAM_ROLES[option.role];
                        const isSelected = selectedAnswer === index;

                        return (
                          <motion.button
                            key={option.role}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={isSelected || (selectedAnswer === undefined && index === 0) ? 0 : -1}
                            onClick={() => selectAnswer(index)}
                            onKeyDown={(event) => handleOptionKeyDown(event, index)}
                            whileTap={{ scale: 0.995 }}
                            animate={isSelected ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                            transition={{ duration: 0.18 }}
                            className={`interactive-surface group flex min-h-16 w-full items-center gap-3 rounded-xl border p-3 text-left sm:gap-4 sm:p-4 ${
                              isSelected
                                ? 'is-selected'
                                : 'border-neutral-200 bg-white'
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                                isSelected ? 'bg-accent text-white' : 'bg-neutral-100 text-neutral-600'
                              }`}
                              aria-hidden="true"
                            >
                              <Icon
                                size={19}
                                className="transition-transform duration-200 group-hover:scale-110"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
                                {role.label}
                              </span>
                              <span className="mt-1 block text-sm leading-snug text-neutral-800 sm:text-base">
                                {option.text}
                              </span>
                            </span>
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-transparent transition-colors">
                              <AnimatePresence initial={false}>
                                {isSelected && (
                                  <motion.span
                                    key="selected-check"
                                    initial={{ opacity: 0, scale: 0.65 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.65 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white"
                                  >
                                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              <span className="sr-only">{isSelected ? 'Selected' : ''}</span>
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-7 flex items-center justify-between gap-3 border-t border-neutral-200 pt-5">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-charcoal"
                    aria-label={currentQuestion === 0 ? 'Back to introduction' : 'Previous question'}
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    <span className="hidden sm:inline">{currentQuestion === 0 ? 'Intro' : 'Previous'}</span>
                    <span className="sm:hidden">Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={selectedAnswer === undefined}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-charcoal px-6 py-2.5 text-sm font-medium text-offwhite transition-colors duration-200 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={isLastQuestion ? 'See your build role' : 'Continue to next question'}
                  >
                    {isLastQuestion ? 'See My Role' : 'Continue'}
                    {!isLastQuestion && <ArrowRight size={16} aria-hidden="true" />}
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-neutral-200 bg-offwhite p-5 text-center sm:p-8 lg:p-10"
              >
                {(() => {
                  const role = TEAM_ROLES[result.role];
                  const RoleIcon = ROLE_ICONS[result.role];
                  const complementaryRoles = role.complements.map((id) => TEAM_ROLES[id]);

                  return (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
                        Your builder identity is...
                      </p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.3, ease: 'easeOut' }}
                        className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-blue-900/10"
                        aria-hidden="true"
                      >
                        <RoleIcon size={30} strokeWidth={1.8} />
                      </motion.div>
                      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                        Your suggested build role is {role.label}.
                      </p>
                      <motion.h3
                        ref={resultHeadingRef}
                        tabIndex={-1}
                        onAnimationComplete={() => resultHeadingRef.current?.focus()}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 0.3 }}
                        className="mt-4 font-heading text-3xl font-bold sm:text-4xl"
                      >
                        {role.title}
                      </motion.h3>
                      <p className="mt-2 text-sm font-medium text-accent">{role.focus}</p>
                      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-600">
                        {role.description}
                      </p>

                      <div className="mx-auto mt-7 max-w-lg rounded-xl border border-neutral-200 bg-white p-5 text-left">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700">
                          Your strengths in a build team
                        </h4>
                        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {role.traits.map((trait) => (
                            <li key={trait} className="flex items-center gap-2 text-sm text-neutral-700">
                              <Check size={15} className="shrink-0 text-accent" aria-hidden="true" />
                              {trait}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mx-auto mt-6 max-w-lg border-t border-neutral-200 pt-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700">
                          Roles that complement yours
                        </h4>
                        <ul className="mt-3 flex flex-wrap justify-center gap-2">
                          {complementaryRoles.map((complementaryRole) => (
                            <li
                              key={complementaryRole.id}
                              className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700"
                            >
                              {complementaryRole.label}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                          Different strengths help a team understand a problem, shape an experience,
                          build a solution and communicate what it can do.
                        </p>
                      </div>

                      {Object.values(profile).some((values) => values.length > 0) && (
                        <div className="mx-auto mt-6 max-w-lg border-t border-neutral-200 pt-5 text-left">
                          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700">
                            Your optional snapshot
                          </h4>
                          {[
                            ['Interest areas', profile.interests],
                            ['Skill areas', profile.skills],
                            [
                              'Preferred roles',
                              profile.preferredRoles
                                .map((id) => TEAM_ROLES[id]?.label)
                                .filter(Boolean),
                            ],
                          ]
                            .filter(([, values]) => values.length > 0)
                            .map(([label, values]) => (
                              <p key={label} className="mt-2 text-xs leading-relaxed text-neutral-600">
                                <span className="font-medium text-neutral-700">{label}:</span>{' '}
                                {values.join(', ')}
                              </p>
                            ))}
                        </div>
                      )}

                      <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-neutral-600">
                        This is a self-guided recommendation—not a team assignment or participant
                        matching service.
                      </p>

                      <div className="mx-auto mt-8 max-w-sm space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-700">
                          Your answer pattern
                        </p>
                        {Object.entries(TEAM_ROLES).map(([key, roleInfo]) => (
                          <div key={key} className="flex items-center gap-3">
                            <span className="w-24 text-right text-xs text-neutral-600 sm:w-28">
                              {roleInfo.label}
                            </span>
                            <div
                              className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200"
                              role="progressbar"
                              aria-label={`${roleInfo.label} answer count`}
                              aria-valuemin={0}
                              aria-valuemax={totalQuestions}
                              aria-valuenow={result.scores[key]}
                            >
                              <motion.div
                                className={`h-full rounded-full ${
                                  key === result.role ? 'bg-accent' : 'bg-neutral-400'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(result.scores[key] / totalQuestions) * 100}%` }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                              />
                            </div>
                            <span className="w-8 text-left text-xs text-neutral-600">
                              {result.scores[key]}/{totalQuestions}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={restart}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-charcoal px-6 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-charcoal hover:text-offwhite"
                        >
                          <RotateCcw size={15} aria-hidden="true" />
                          DISCOVER AGAIN
                        </button>
                        <a
                          href={EVENT_CONFIG.host.website}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-2.5 text-sm font-medium text-offwhite transition-colors duration-200 hover:bg-neutral-700"
                        >
                          EXPLORE IEDC
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
