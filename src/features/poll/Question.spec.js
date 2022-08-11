import {
  _getUsers,
  _getQuestions,
  _saveQuestion
} from "../../utils/_DATA";

const getApiData = async () => await Promise.all([_getUsers(), _getQuestions()]);


describe('_saveQuestion', () => {
  it('can be saved to the backend', async () => {
    const params = { optionOneText: 'Coke?', optionTwoText: 'Pepsi?', author: 'tylermcginnis' };
    const question = await _saveQuestion(params);
    const [users, questions] = await getApiData();

    // New Question ID is in the 'questions' array of the user object @ users[params.author]
    expect(users[params.author].questions).toContain(question.id);
    // Formatted Question object is in the questions object @ questions[question.id].
    expect(questions[question.id]).toMatchObject(question);
  });

  it('returns a formatted object', async () => {
    const params = { optionOneText: 'Tastes great?', optionTwoText: 'Less filling?', author: 'sarahedo' };
    const keys = ['id', 'optionOne', 'optionTwo', 'timestamp', 'author'];
    const optionKeys = ['text', 'votes'];

    const actual = await _saveQuestion(params);

    expect(keys.every((key) => Reflect.has(actual, key))).toBeTruthy();
    expect(actual.author).toEqual(params.author);
    expect(actual.timestamp).not.toBeNull();

    ['optionOne', 'optionTwo'].forEach((option) => {
      expect(optionKeys.every((key) => Reflect.has(actual[option], key))).toBeTruthy();
      expect(actual[option].text).toEqual(params[`${option}Text`]);
      expect(actual[option].votes).toEqual([]);
    });
  });

  it('throws an Error if any parameter object properties are missing', async () => {
    const p1 = { optionOneText: 'Half empty?', optionTwoText: 'Half full?', author: null };
    await expect(_saveQuestion(p1)).rejects.toEqual('the author field(s) are required.');

    const p2 = { optionOneText: 'Half empty?', optionTwoText: null, author: 'foo' };
    await expect(_saveQuestion(p2)).rejects.toEqual('the optionTwoText field(s) are required.');

    const p3 = { optionOneText: null, optionTwoText: 'Half full?', author: 'foo' };
    await expect(_saveQuestion(p3)).rejects.toEqual('the optionOneText field(s) are required.');

    const p4 = { optionOneText: null, optionTwoText: null, author: null };
    await expect(_saveQuestion(p4)).rejects.toEqual('the optionOneText/optionTwoText/author field(s) are required.');
  });
});
