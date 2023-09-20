import { useEffect, useState } from "react";
import { createTimeStamp } from "./utils";

type TimerProps = {
  /** milliseconds since since midnight, January 1, 1970 (UTC)*/
  start: number;
};

export default function Timer({ start }: TimerProps) {
  const [time, setTime] = useState(createTimeStamp(start, Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      const timeStamp = createTimeStamp(start, Date.now());

      setTime(timeStamp);
    }, 1000);

    return () => clearTimeout(id);
  }, [start]);

  return (
    <span className="text-3xl">
      Time Elapsed: <span className="countdown font-mono">{time}</span>
    </span>
  );
}
