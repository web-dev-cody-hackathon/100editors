import { timeElapsed } from "../Timer/utils";
import { AllSlugs } from "./LeaderBoard";

export default function sortLeaderBoard(allSlugs: AllSlugs): AllSlugs {
  return allSlugs.sort((a, z) => {
    // both defined
    if (z.endTime !== undefined && a.endTime !== undefined) {
      // sort upwards
      return a.endTime - a.startTime - (z.endTime - z.startTime);
    }

    if (z.endTime === undefined && a.endTime === undefined) {
      // sort upwards
      return z.passedTests ?? 0 - (a.passedTests ?? 0);
    }

    // if z completed, a did not
    if (a.endTime === undefined && z.endTime !== undefined) {
      return 1;
    }
    // if a completed, z did not
    if (z.endTime === undefined && a.endTime !== undefined) {
      return -1;
    }

    // top
    // completion time
    //
    return 0;
  });
}
