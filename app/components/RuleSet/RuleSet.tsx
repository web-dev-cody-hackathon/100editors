import { Rule } from "./Rules";
import { BsFillEmojiAngryFill, BsFillEmojiHeartEyesFill } from "react-icons/bs";

interface RuleSetProps {
  passedRules: Rule[];
  failedRules: Rule[];
}

export default function RuleSet(props: RuleSetProps) {
  const { passedRules, failedRules } = props;

 

  return (
    <div className="flex flex-col items-center align-items">
      <h3>
        Rules (Passed: {passedRules.length} of{" "}
        {passedRules.length + failedRules.length})
      </h3>
      <div className="border-2 border-gray-300 rounded-md min-w-[20vw] p-6 min-h-[60vh] max-w-[20vw]">
        {failedRules.map((rule) => {
          return (
            <div key={rule.desciption} className="flex flex-row py-2">
              <BsFillEmojiAngryFill className="text-red-500" size={"20px"} />
              <p className="text-red-500 text-sm pl-2">{rule.desciption}</p>
            </div>
          );
        })}

        {passedRules.map((rule) => {
          return (
            <div key={rule.desciption} className="flex flex-row py-2">
              <BsFillEmojiHeartEyesFill
                className="text-green-500"
                size={"20px"}
              />
              <p className="text-green-500 text-sm	pl-2">{rule.desciption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
