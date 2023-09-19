import { useEffect, useState } from "react";
import RuleSet from "./RuleSet/RuleSet";
import TextEditor from "./TextEditor";
import { Rule } from "./RuleSet/Rules";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface DocumentWrapperProps {
  slug: string;
  slugId: Id<"slugs"> | undefined;
}
export default function DocumentWrapper(props: DocumentWrapperProps) {
  const mutateDbRules = useMutation(api.slugs.updateSlug);
  const { slug, slugId } = props;
  
  const [passedRules, setPassedRules] = useState<Rule[]>([] as Rule[]);
  const [failedRules, setFailedRules] = useState<Rule[]>([] as Rule[]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // useEffect(() => {
  //   mutateDbRules({
  //     id: slug,
  //     passedTests: passedRules.length,
  //     failedTests: failedRules.length,
  //   });
  // }, [setFailedRules, setPassedRules]);

  return (
    <div className="flex justify-center content-center flex-row gap-5">
      <TextEditor
        slug={slug}
        setPassedRules={setPassedRules}
        setFailedRules={setFailedRules}
        setIsCompleted={setIsCompleted}
        passedRules={passedRules}
        failedRules={failedRules}
        slugId={slugId}
      />
      <RuleSet passedRules={passedRules} failedRules={failedRules} />
    </div>
  );
}
