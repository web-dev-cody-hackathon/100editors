import { Id } from "@/convex/_generated/dataModel";

interface LeaderBoardProps {
  allSlugs: {
    _id: Id<"slugs">;
    _creationTime: number;
    passedTests?: number | undefined;
    failedTests?: number | undefined;
    slug: string;
  }[] | undefined
}
export default function LeaderBoard(props: LeaderBoardProps) {
  const { allSlugs } = props;
  return (
    <div>
      {allSlugs?.map((slug) => {
        return <div key={slug._id}>{slug.slug}</div>;
      })}
    </div>
  );
}
