
const RegistrationForm = () => {
  return (
    <div className={"registration-form pt-7"}>
      <h2 className={"text-2xl"}>Register</h2>
      <form className={"pt-7"}>
        <div>
          <label className={"block"} htmlFor={"userHandle"}>Add your User Avatar (alphanums only please)</label>
          <input className={"block w-96 mx-auto border-2 border-slate-700"} type={"text"} name={"userHandle"} />
        </div>
        <div className={"pt-7"}>
          <button className={"w-96 bg-zinc-500 text-white"}>Register</button>
        </div>

      </form>
    </div>
  );
};

export default RegistrationForm;