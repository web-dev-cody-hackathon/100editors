import Timer from "./Timer";

export default function TimerLoading(props: { getSlug: any }) {
  const { getSlug } = props;
  if (!getSlug || !getSlug?.startTime) return <div>Loading...</div>;

  return (
    <>
      {getSlug?.startTime && <Timer start={getSlug?.startTime || Date.now()} />}
    </>
  );
}
