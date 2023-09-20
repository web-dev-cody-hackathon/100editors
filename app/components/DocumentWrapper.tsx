import { useEffect, useState } from "react";
import RuleSet from "./RuleSet/RuleSet";
import TextEditor from "./TextEditor";
import { Rule } from "./RuleSet/Rules";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

import type { Dispatch, SetStateAction } from "react";

interface DocumentWrapperProps {
  slug: string;
  slugId: Id<"slugs"> | undefined;
  usersInRoom: string[];
  setUsersInRoom: Dispatch<SetStateAction<string[]>>;
}
export default function DocumentWrapper(props: DocumentWrapperProps) {
  const updateSlug = useMutation(api.slugs.updateSlug);
  const { slug, slugId, usersInRoom, setUsersInRoom } = props;
  const [passedRules, setPassedRules] = useState<Rule[]>([]);
  const [failedRules, setFailedRules] = useState<Rule[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (slugId) {
      updateSlug({
        id: slugId,
        passedTests: passedRules.length,
        failedTests: failedRules.length,
        endTime: isCompleted ? Date.now() : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedRules, failedRules]);

  return (
    <div className="flex justify-center content-center flex-row gap-5">
      <TextEditor
        slug={slug}
        setPassedRules={setPassedRules}
        setFailedRules={setFailedRules}
        setIsCompleted={setIsCompleted}
        setUsersInRoom={setUsersInRoom}
        usersInRoom={usersInRoom}
      />
      <RuleSet passedRules={passedRules} failedRules={failedRules} />
    </div>
  );
}
