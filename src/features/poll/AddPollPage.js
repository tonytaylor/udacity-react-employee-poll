import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {addAndSaveQuestion} from "./pollSlice";


const AddPollPage = ({ authedUser, dispatch }) => {


  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const navigate = useNavigate();

  const onChange = (stateMutator) => (event) => stateMutator(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('current authenticated user:', authedUser);
    dispatch(addAndSaveQuestion(optionOne, optionTwo, authedUser.value));
    navigate('/');
  };

  return (
    <div>
      <h2 className={"pt-4 text-2xl"}>Create New Poll</h2>
      <div className={"pt-4"}>
        <form onSubmit={onSubmit}>
          <div>
            <label className={"block pt-4"} htmlFor={"poll-option-1"}>First Option</label>
            <input
              className={"border border-slate-700 mt-3 w-96"}
              name={"poll-option-1"}
              type={"text"}
              value={optionOne}
              onChange={onChange(setOptionOne)}
              placeholder={"Option One."} />
          </div>
          <div className={"pb-6"}>
            <label className={"block pt-4"} htmlFor={"poll-option-2"}>Second Option</label>
            <input
              className={"border border-slate-700 mt-3 w-96"}
              name={"poll-option-2"}
              type={"text"}
              value={optionTwo}
              onChange={onChange(setOptionTwo)}
              placeholder={"Option Two."} />
          </div>
          <button className={"bg-zinc-500 pl-4 text-white h-8 w-96"} type={"submit"}>click</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};

export default connect(mapStateToProps)(AddPollPage);