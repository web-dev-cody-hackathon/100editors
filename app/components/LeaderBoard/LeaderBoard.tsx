import { Id } from "@/convex/_generated/dataModel";

import classes from './Leaderboard.module.css';

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
  if(!allSlugs) return;
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Leaderboard</h2>
      <div className={classes.entries}>
        {allSlugs?.map((slug) => {
          return (
            <div key={slug._id} className={classes.entry}>
              <p className="grow">Room: {slug.slug}</p>
              <p>Passed: {slug.passedTests}</p>
              <p>Failed: {slug.failedTests}</p>
              <p>Time: x seconds</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
