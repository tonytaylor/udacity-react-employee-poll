import {Link, useNavigate} from 'react-router-dom';
import { connect } from "react-redux";
import { FiHome, FiList, FiPlusSquare } from "react-icons/fi";

import { useAuth } from "../auth/authSlice";

const Nav = ({authedUser, users, dispatch}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const onClick = (event) => {
    event.preventDefault();
    logout().then(() => {
      navigate('/login');
    });
  };

  const userStatus = () => {
    return (authedUser.value !== null)
      ? `Logged in as: ${authedUser.value}`
      : 'Not logged in';
  };

  return (
    <nav className={`flex flex-row border-b-2 border-slate-700`}>
      <ol className={"basis-1/4 flex content-center flex-row place-content-around"}>
        <li className={"my-auto"}>
          <FiHome className={"mx-auto"} />
          <Link className={"align-middle min-h-full"} to={'/'}>Home</Link>
        </li>
        <li className={"my-auto"}>
          <FiList className={"mx-auto"} />
          <Link className={"align-middle"} to={'/leaderboard'}>Leaderboard</Link>
        </li>
        <li className={"my-auto"}>
          <FiPlusSquare className={"mx-auto"} />
          <Link className={"align-middle"} to={'/add'}>New</Link>
        </li>
      </ol>
      <h1 className={"my-auto basis-1/2 text-3xl"}>Go Poll Yourselves!</h1>
      <div className={"basis-1/4"}>
        <div className={"user-avatar"}>
          {
            authedUser.value && <img className={"w-16 h-16 mx-auto"} alt={'User avatar'} src={users[authedUser.value].avatarURL} />
          }
          <span className={"font-bold"}>{userStatus()}</span>
        </div>
        <div className={"pb-4"}>
          <button
            className={"bg-zinc-500 pl-4 text-white w-80"}
            disabled={authedUser.value === null}
            onClick={onClick}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return { authedUser, users };
};

export default connect(mapStateToProps)(Nav);