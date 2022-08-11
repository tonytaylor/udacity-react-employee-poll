import {Link, useNavigate} from 'react-router-dom';

import { connect } from "react-redux";
import {useEffect, useState} from "react";

import Poll from "../poll/Poll";

import {getVotes} from "../../utils/helpers";

const DashboardPage = ({ authedUser, questions }) => {

  const navigate = useNavigate();
  const [showAnsweredQs, setShowAnsweredQs] = useState(false);

  const sortByTimestamp = ([, a_v], [, b_v]) => b_v.timestamp - a_v.timestamp;

  const filterAnswered = (done) => ([k, v]) => {
    let filtered = getVotes(v).filter((vote) => vote === authedUser.value);
    return (done) ? filtered.length > 0 : filtered.length === 0;
  };


  // TODO: I'm sure there's a better way to do this.
  //       At the least, migrate this to a helper script.
  //       UPDATE: Can't do that, as React will yell at you about using hooks
  //               outside of component functions. Pack into a HOC perhaps?
  useEffect(() => {
    const noop = () => {};
    (!authedUser.value) ? navigate('/login') : noop();
  }, [authedUser, navigate]);

  return (
    <div className={"flex flex-col w-9/12 m-auto pt-8"}>
      <h2 className={"text-2xl"}>Dashboard</h2>
      <div className={"pt-4"}>
        <div className={"unanswered-polls"}>
          <h3 className={"pb-4"}>New Questions</h3>
          <ul className={"flex flex-wrap flex-row"}>
            {Object.entries(questions)
              .filter(filterAnswered(false))
              .sort(sortByTimestamp).map(([id, question]) => {
                return (
                  <Link key={id} to={`/question/${id}`}>
                    <Poll key={id} poll={question} />
                  </Link>
                );
            })}
          </ul>
          <div className={"pt-2"}>
            <label className={"inline-block px-4"} htmlFor={"enable-done"}>Show answered questions?</label>
            <input
              data-testid={"toggler"}
              name={"enable-done"}
              type={"checkbox"}
              checked={showAnsweredQs} onChange={() => setShowAnsweredQs(!showAnsweredQs)} />
          </div>
        </div>
        <div data-testid={"toggled"} className={"answered-polls"} style={{display: (showAnsweredQs) ? 'block' : 'none'}}>
          <h3 className={"py-4"}>Done</h3>
          <ul className={"flex flex-wrap flex-row"}>
            {Object.entries(questions)
              .filter(filterAnswered(true))
                .sort(sortByTimestamp).map(([id, question]) => {
                return (
                  <Link key={id} to={`/question/${id}`}>
                    <Poll key={id} poll={question} />
                  </Link>
                );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => ({
  authedUser,
  questions: Object.fromEntries(Object.entries(questions).filter(([key]) => key !== 'status'))
});

export default connect(mapStateToProps)(DashboardPage);