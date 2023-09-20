import Timer from "./Timer";

export default function RoomTimer(props: { start: number }) {
  const { start } = props;

  return (
    <span className="text-3xl">
      Time Elapsed:{" "}
      <span className="countdown font-mono">
        <Timer start={start} />
      </span>
    </span>
  );
}
