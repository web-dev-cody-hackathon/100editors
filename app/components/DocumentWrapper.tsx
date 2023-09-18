import RuleSet from "./RuleSet/RuleSet";
import TextEditor from "./TextEditor";

// Text editor takes a 3/4th of the page and the ruleset takes 1/4th vertically

export default function DocumentWrapper() {
  return (
    <div className="flex justify-center content-center flex-row">
      <TextEditor className="w-3/4 h-screen" />
      <RuleSet className="w-1/4" />
    </div>
  );
}
