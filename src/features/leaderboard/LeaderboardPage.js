import { connect } from "react-redux";

import Entry from "./Entry";

const LeaderboardPage = ({ users }) => {


  // TODO: Questions answered doesn't seem to update when
  //       users answer poll questions. Look into it shortly.
  const leaders = ((u) => {
    const output = Object.entries(u).map(([, val]) => {
      return {
        name: val.name,
        handle: val.id,
        avatar: val.avatarURL,
        qsAsked: val.questions.length,
        qsAnswered: Object.entries(val.answers).length
      };
    });
    return output;
  })(users);

  const sorted = (entries) => {
    return entries.sort((a, b) => (b.qsAnswered + b.qsAsked) - (a.qsAnswered + a.qsAsked));
  };

  return (
    <div className={"flex flex-col w-9/12 m-auto mt-2 pt-4 border border-slate-700"}>
      <h2 className={"text-2xl font-bold"}>Leaderboard</h2>
      <div>
        {(leaders.length > 0) && sorted(leaders).map((x, i) => <Entry key={i} entry={x} />)}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  users: Object.fromEntries(Object.entries(users).filter(([key]) => key !== 'status')),
  authedUser
});


export default connect(mapStateToProps)(LeaderboardPage);