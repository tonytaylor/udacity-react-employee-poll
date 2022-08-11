import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from "../../utils/_DATA";

const getApiData = async () => await Promise.all([_getUsers(), _getQuestions()]);

describe('_saveQuestionAnswer', () => {
  it('can be saved to the backend', async () => {
    const params = {
      authedUser: 'sarahedo',
      qid: 'xj352vofupe1dqz9emx13r',
      answer: 'optionOne'
    };
    await _saveQuestionAnswer(params);

    const [users, questions] = await getApiData();

    // Question ID is found in list of questions user answered
    expect(users[params.authedUser].answers[params.qid]).toBeTruthy();
    // Value assigned to Question ID is the user's selected answer
    expect(users[params.authedUser].answers[params.qid]).toEqual(params.answer);
    // User ID is found in the question's list of users that voted.
    expect(questions[params.qid][params.answer].votes).toContain(params.authedUser)
  });
  it('returns true upon successful completion', async () => {
    const q1 = { authedUser: 'sarahedo', qid: 'loxhs1bqm25b708cmbf3g', answer: 'optionOne' };
    await expect(_saveQuestionAnswer(q1)).resolves.toEqual(true);
  });
  it('throws an Error if any parameter object properties are missing', async () => {
    const p1 = { authedUser: 'johndoe', qid: 'ball-of-chars', answer: null };
    await expect(_saveQuestionAnswer(p1)).rejects.toEqual('the answer field(s) are required.');

    const p2 = { authedUser: null, qid: 'ball-of-chars', answer: 'optionTwo' };
    await expect(_saveQuestionAnswer(p2)).rejects.toEqual('the authedUser field(s) are required.');

    const p3 = { authedUser: 'johndoe', qid: null, answer: 'optionTwo' };
    await expect(_saveQuestionAnswer(p3)).rejects.toEqual('the qid field(s) are required.');

  });
})