import { Id } from "@/convex/_generated/dataModel";
import Timer from "./Timer";

interface TimerLoadingProps {
  getSlug:
    | {
        startTime: number | null | undefined;
        _id: Id<"slugs">;
        _creationTime: number;
        passedTests?: number | undefined;
        failedTests?: number | undefined;
        slug: string;
      }
    | null
    | undefined;
}

export default function TimerLoading(props: TimerLoadingProps) {
  const { getSlug } = props;

  return (
    <>
      {getSlug ? (
        <Timer start={getSlug._creationTime} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
