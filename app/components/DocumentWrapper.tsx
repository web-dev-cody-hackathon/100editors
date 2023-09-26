import { useEffect, useState } from "react";
import RuleSet from "./RuleSet/RuleSet";
import TextEditor from "./TextEditor";
import { Rule } from "./RuleSet/Rules";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import * as Y from "yjs";

import type { Dispatch, SetStateAction } from "react";

interface DocumentWrapperProps {
  slug: string;
  slugId: Id<"slugs"> | undefined;
  setUsersInRoom: Dispatch<SetStateAction<string[]>>;
  textDelta: string;
  setTextDelta: Dispatch<SetStateAction<string>>;
}

export default function DocumentWrapper(props: DocumentWrapperProps) {
  const { slug, slugId, setUsersInRoom, textDelta, setTextDelta } = props;
  const [passedRules, setPassedRules] = useState<Rule[]>([]);
  const [failedRules, setFailedRules] = useState<Rule[]>([]);
  const [attemptedRules, setAttemptedRules] = useState<Rule[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [text, setText] = useState<Y.Text>();

  return (
    <div className="flex justify-center content-center flex-row gap-5">
      <TextEditor
        slug={slug}
        setPassedRules={setPassedRules}
        setFailedRules={setFailedRules}
        setIsCompleted={setIsCompleted}
        setUsersInRoom={setUsersInRoom}
        isCompleted={isCompleted}
        text={text}
        setText={setText}
        setTextDelta={setTextDelta}
        textDelta={textDelta}
        setIsLoaded={setIsLoaded}
        slugId={slugId}
        passedRules={passedRules}
        failedRules={failedRules}
        setAttemptedRules={setAttemptedRules}
        attemptedRules={attemptedRules}
      />
      <RuleSet
        passedRules={passedRules}
        failedRules={failedRules}
        attemptedRules={attemptedRules}
        isLoaded={isLoaded}
      />
    </div>
  );
}
