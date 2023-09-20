import { Id } from "@/convex/_generated/dataModel";
import LeaderBoardTimer from "../Timer/LeaderBoardTimer";
import { timeElapsed } from "../Timer/utils";

import classes from "./LeaderBoard.module.css";
import sortLeaderBoard from "./sortLeaderBoard";

export interface AllSlugs
  extends Array<{
    _id: Id<"slugs">;
    _creationTime: number;
    passedTests?: number | undefined;
    failedTests?: number | undefined;
    slug: string;
    startTime: number;
    endTime?: number | undefined;
  }> {}

export interface LeaderBoardProps {
  allSlugs: AllSlugs | undefined;
}

export default function LeaderBoard(props: LeaderBoardProps) {
  const { allSlugs } = props;
  const sortedAllSlugs = sortLeaderBoard(allSlugs ?? []);
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Leaderboard</h2>
      <div className={classes.entries}>
        <div className={classes.tableHeader}>
          <p>Room</p>
          <p>Passed Tests </p>
          <p>Time Elapsed</p>
          <p>Completed</p>
        </div>
        <div>
          {sortedAllSlugs?.map((slug) => {
            return (
              <div key={slug._id} className={classes.entry}>
                <p>{slug.slug}</p>
                <p>
                  {/* convert to percent */}
                  {/* {`${
                    Math.round(
                      ((slug.passedTests ?? 0) /
                        ((slug.passedTests ?? 0) + (slug.failedTests ?? 0))) *
                        100
                    ) || 0
                  }%`} */}

                  {`${slug.passedTests || 0} / ${
                    (slug.passedTests ?? 0 + slug.failedTests! ?? 0) || 0
                  }`}
                </p>

                <p>
                  {slug.endTime ? (
                    timeElapsed({
                      start: slug.startTime || Date.now(),
                      end: slug.endTime || Date.now(),
                    })
                  ) : (
                    <LeaderBoardTimer start={slug.startTime} />
                  )}
                </p>
                {slug.endTime && (
                  <p>
                    {timeElapsed({
                      start: slug.startTime,
                      end: slug.endTime,
                    })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
