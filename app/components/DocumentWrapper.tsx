import { useState } from "react";
import RuleSet from "./RuleSet/RuleSet";
import TextEditor from "./TextEditor";
import { Rule } from "./RuleSet/Rules";

export default function DocumentWrapper() {
  const [passedRules, setPassedRules] = useState<Rule[]>([] as Rule[]);
  const [failedRules, setFailedRules] = useState<Rule[]>([] as Rule[]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  return (
    <div className="flex justify-center content-center flex-row gap-5">
      <TextEditor
        setPassedRules={setPassedRules}
        setFailedRules={setFailedRules}
        setIsCompleted={setIsCompleted}
      />
      <RuleSet passedRules={passedRules} failedRules={failedRules}/>
    </div>
  );
}
