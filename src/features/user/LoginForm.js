import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../auth/authSlice';

const LoginForm = ({ users }) => {
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { login } = useAuth();

    const onSubmit = (event) => {
        event.preventDefault();
        login(currentUser).then(() => {
            navigate(state?.path || '/');
        });
    };

    const onChange = (mutator) => (event) => {
        event.preventDefault();
        mutator(event.target.value);
    };
    return (
        <div className={"user-form"}>
            <form onSubmit={onSubmit}>
                <div className={"pt-7"}>
                    <label className={"block"} htmlFor={"users"}>Choose your avatar:</label>
                    <select
                      defaultValue={"none"}
                      onChange={onChange(setCurrentUser)}
                      className={"w-96 border-2 border-slate-700"}
                    >
                        <option className={"text-center"} value={"none"} disabled>=== Choose an user ===</option>
                        {Object.keys(users).map((userId, index) => {
                            return (<option className={"text-center"} key={index} value={userId}>{userId}</option>);
                        })}
                    </select>
                </div>
                <div className={"pt-7"}>
                    <button className={"bg-zinc-500 text-white w-96"} type={"submit"}>Login</button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({ users, authedUser }) => {
    const filteredEntries = Object.entries(users).filter(([key]) => key !== 'status');
    return { users: Object.fromEntries(filteredEntries), authedUser };
};

export default connect(mapStateToProps)(LoginForm);