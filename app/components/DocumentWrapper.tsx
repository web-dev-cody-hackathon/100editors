import { useState } from "react";
import RuleSet from "./RuleSet/RuleSet";
import TextEditor from "./TextEditor";
import { Rule } from "./RuleSet/Rules";

import type { Dispatch, SetStateAction } from "react";

interface DocumentWrapperProps {
  slug: string;
  usersInRoom: string[];
  setUsersInRoom: Dispatch<SetStateAction<string[]>>;
}
export default function DocumentWrapper(props: DocumentWrapperProps) {
  const { slug, usersInRoom, setUsersInRoom } = props;
  const [passedRules, setPassedRules] = useState<Rule[]>([] as Rule[]);
  const [failedRules, setFailedRules] = useState<Rule[]>([] as Rule[]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
