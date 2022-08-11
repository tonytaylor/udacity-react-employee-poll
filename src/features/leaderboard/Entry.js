

const Entry = ({ entry }) => {
  return (
    <ul className={"flex flex-col"}>
      <li className={"flex flex-row"}>
        <div>
          <img className={"inline-block w-32 h-32"} alt={"User Avatar"} src={`${entry.avatar}`} />
          <h3 className={"inline-block"}>
            {entry.name}
            <small className={"block"}>{entry.handle}</small>
          </h3>
        </div>
        <div className={"w-32 h-32 align-middle"}>{entry.qsAsked}</div>
        <div className={"w-32 h-32 align-middle"}>{entry.qsAnswered}</div>
      </li>
    </ul>
  );
};

export default Entry;