import { Id } from "@/convex/_generated/dataModel";
import LeaderBoardTimer from "../Timer/LeaderBoardTimer";

interface LeaderBoardProps {
  allSlugs:
    | {
        _id: Id<"slugs">;
        _creationTime: number;
        passedTests?: number | undefined;
        failedTests?: number | undefined;
        slug: string;
        startTime: number;
        endTime?: number | undefined;
      }[]
    | undefined;
}
export default function LeaderBoard(props: LeaderBoardProps) {
  const { allSlugs } = props;
  return (
    <div>
      <h2 className="pb-5 text-2xl text-left">Leaderboard</h2>
      <div className="border-b-orange-50">
        {allSlugs?.map((slug) => {
          return (
            <div key={slug._id} className="flex flex-row gap-3">
              <p className="grow">Room: {slug.slug}</p>
              <p>Passed: {slug.passedTests}</p>
              <p>Failed: {slug.failedTests}</p>
              <p>Time: {<LeaderBoardTimer start={slug.startTime} />}</p>
              {slug.endTime && (
                <p>Completed: {<LeaderBoardTimer start={slug.endTime} />}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
