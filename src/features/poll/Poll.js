
import './Poll.css';

const formatDate = (ts) => {
  const d = new Date(ts);
  const militaryHours = d.getHours();

  const meridian = (militaryHours > 12) ? 'PM' : 'AM';
  const amPmHours = (militaryHours > 12)
    ? (militaryHours - 12) : (militaryHours > 1)
      ? militaryHours
      : 12;

  const minutes = (d.getMinutes() < 10)
    ? d.getMinutes().toString().padStart(2, '0')
    : d.getMinutes();
  return `${amPmHours}:${minutes} ${meridian} ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const Poll = ({ poll: { author, timestamp }}) => {
  return (
    <div className={"poll border border-slate-700 w-64 h-32"}>
      <div className={"pt-4"}>
        <h4 className={"poll__heading pb-4"}>
          {author}
          <small className={"heading__small"}>{formatDate(timestamp)}</small>
        </h4>
        <button className={"poll_button bg-zinc-500 text-white w-32"}>Show</button>
      </div>
    </div>
  );
};

export default Poll;