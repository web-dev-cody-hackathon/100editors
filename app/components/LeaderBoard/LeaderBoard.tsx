import { Id } from "@/convex/_generated/dataModel";

import classes from './LeaderBoard.module.css'

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
    <div className={classes.container}>
      <h2 className={classes.title}>Leaderboard</h2>
      <div className={classes.entries}>
      <div className={classes.tableHeader}>
              <p>Room:</p>
              <p>Passed: </p>
              <p>Failed: </p>
              <p>Time:</p>
              <p>Time:</p>
            </div> 
        {allSlugs?.map((slug) => {
          return (
            <div key={slug._id} className={classes.entry}>
              <p>{slug.slug}</p>
              <p>{slug.passedTests}</p>
              <p>{slug.failedTests}</p>
              <p>x seconds</p>
              <p>x seconds</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
