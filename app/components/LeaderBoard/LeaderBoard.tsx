import { Id } from "@/convex/_generated/dataModel";

interface LeaderBoardProps {
  allSlugs:
    | {
        _id: Id<"slugs">;
        _creationTime: number;
        passedTests?: number | undefined;
        failedTests?: number | undefined;
        slug: string;
      }[]
    | undefined;
}
export default function LeaderBoard(props: LeaderBoardProps) {
  const { allSlugs } = props;
  return (
    <div>
      <h2>Leaderboard</h2>

      {allSlugs?.map((slug) => {
        return (
          <div key={slug._id} className="flex flex-row gap-5">
            <p>Room: {slug.slug}</p>
            <p>Passed: {slug.passedTests}</p>
            <p>Failed: {slug.failedTests}</p>
            <p>Time: x seconds</p>
          </div>
        );
      })}
    </div>
  );
}
