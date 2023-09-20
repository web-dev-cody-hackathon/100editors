import Timer from "./Timer";

export default function LeaderBoardTimer(props: { start: number }) {
  const { start } = props;

  return (
    <span className="countdown">
      <Timer start={start} />
    </span>
  );
}
