/**
 * Quiz scoring algorithm for the Team Finder.
 * 
 * Scoring is deterministic and transparent:
 * - Each answer contributes 1 point to the associated role.
 * - The role with the highest total score is the result.
 * - In case of a tie, roles are prioritized in this order:
 *   builder > designer > strategist > researcher > presenter.
 */

const ROLE_PRIORITY = ['builder', 'designer', 'strategist', 'researcher', 'presenter'];

export function calculateResult(answers, questions) {
  const scores = Object.fromEntries(ROLE_PRIORITY.map((role) => [role, 0]));

  // Tally scores
  questions.forEach((question, index) => {
    const selectedIndex = answers[index];
    if (selectedIndex !== undefined && selectedIndex !== null) {
      const selectedOption = question.options[selectedIndex];
      if (selectedOption && Object.hasOwn(scores, selectedOption.role)) {
        scores[selectedOption.role] += 1;
      }
    }
  });

  // Find the maximum score
  const maxScore = Math.max(...Object.values(scores));

  // Get all roles with the maximum score
  const topRoles = ROLE_PRIORITY.filter((role) => scores[role] === maxScore);

  // Return the first by priority order (handles ties)
  return {
    role: topRoles[0],
    scores,
    maxScore,
    isTie: topRoles.length > 1,
  };
}
