/**
 * Parses out answer voting lists for a given question object. Flattens to
 * a single list containing votes gathered before filtering any duplicate
 * entries.
 *
 *  TODO: Refactor to operate without performing the filtering (uniquify).
 * @param question
 * @returns {FlatArray<([string]|[]|string[]|[string]|[string]|*)[], 1>[]}
 */
export const getVotes = (question) => {
  const answerFields = ['optionOne', 'optionTwo'];
  const uniquify = (val, idx, all) => all.indexOf(val) === idx;
  return answerFields.map((answerField) => question[answerField].votes)
    .flat(1)
    .filter(uniquify);
};