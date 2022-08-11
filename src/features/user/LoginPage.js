import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const LoginPage = () => {
  return (
    <div>
      <h2 className={"pt-7 text-2xl"}>Login</h2>
      <LoginForm />
      <hr className={"mt-7 border-1 border-slate-700"} />
      <RegistrationForm />
    </div>
  )
};

export default LoginPage;