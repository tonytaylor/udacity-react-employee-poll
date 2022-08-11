import {useLocation, useNavigate, useParams} from "react-router-dom";
import { connect } from "react-redux";
import {useEffect} from "react";
import { saveAnswerToRemote } from "./pollSlice";

import {getVotes} from "../../utils/helpers";


const withRouter = (Component) => (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  return (<Component {...props} router={{ location, navigate, params }} />);
};

const PollPage = ({ authedUser, pollAuthor, question, dispatch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const noop = () => {};
    (question) ? noop() : navigate('/not-found');
  }, [question, navigate]);

  const onClick = (event) => {
    event.preventDefault();
    const answer = event.target.value;
    // TODO: Must have been half asleep for this one! lmao :D
    const { value } = authedUser;
    dispatch(saveAnswerToRemote({authedUser: value, questionId: question.id, answer}));
  };

  const highlightWhenAnswered = (question, answer, authedUser) => {
    const userHasAnswered = question[answer].votes
      && question[answer].votes.length > 0
      && question[answer].votes.indexOf(authedUser.value) >= 0;

    return (userHasAnswered) ? 'border-2 border-blue-600' : '';
  };

  const getVotesFor = (question, answer) => question[answer].votes.length;

  // TODO: Needs work. Too conditional. Replace with react-redux-loading-bar
  return (
    <div>
      <h2 className={"pt-4 text-2xl"}>Poll</h2>
      <div>
        <h3 className={"pt-3"}>Poll by: <span className={"font-bold"}>{question && question.author}</span></h3>
        {
          pollAuthor
          && question
          && <img className={"w-96 h-96 mx-auto"} alt={"User avatar (large)"} src={pollAuthor.avatarURL} />
        }
        <h3 className={"text-xl font-bold"}>Would You Rather</h3>
        <div className={"flex flex-row justify-evenly"}>
          <div className={question && highlightWhenAnswered(question, 'optionOne', authedUser)}>
            <h4 className={"question font-bold pb-3"}>{question && question.optionOne.text}</h4>
            <button onClick={onClick} value={"optionOne"} className={"bg-zinc-500 text-white w-96"}>click</button>
            <h4 className={"pt-3"}># of users who voted: { question && getVotesFor(question, 'optionOne') }</h4>
            <h4>
              % of users who voted:
              {question
                && ( getVotesFor(question, 'optionOne') / getVotes(question).length )
              }
            </h4>
          </div>
          <div className={question && highlightWhenAnswered(question, 'optionTwo', authedUser)}>
            <h4 className={"question font-bold pb-3"}>{question && question.optionTwo.text}</h4>
            <button onClick={onClick} value={"optionTwo"} className={"bg-zinc-500 text-white w-96"}>click</button>
            <h4 className={"pt-3"}># of users who voted: { question && getVotesFor(question, 'optionOne') }</h4>
            <h4>
              % of users who voted:
              {question
                && ( getVotesFor(question, 'optionTwo') / getVotes(question).length )
              }
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, { router }) => {
  const questionId = router.params.id;
  const question = questions && questions[questionId];
  return { question: questions[questionId], authedUser, pollAuthor: users[question && question.author] };
};

export default withRouter(connect(mapStateToProps)(PollPage));