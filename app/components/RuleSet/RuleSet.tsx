import { ReactElement } from "react";
import { Rule } from "./Rules";
import { BsFillEmojiAngryFill, BsFillEmojiHeartEyesFill } from "react-icons/bs";

interface RuleSetProps {
  passedRules: Rule[];
  failedRules: Rule[];
  isLoaded: boolean;
}

export default function RuleSet(props: RuleSetProps) {
  const { passedRules, failedRules, isLoaded } = props;

  return (
    <div className="flex flex-col items-center align-items h-[76vh] ">
      <h3>
        Rules (Passed: {passedRules.length} of{" "}
        {passedRules.length + failedRules.length})
      </h3>
      <div className="min-w-[20vw] p-6 min-h-[60vh] max-w-[20vw] overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <CardList
          rules={failedRules}
          SvgIcon={<BsFillEmojiAngryFill className="text-red-500 h-7 w-7" />}
        />
        <CardList
          rules={passedRules}
          SvgIcon={
            <BsFillEmojiHeartEyesFill className="text-green-500 h-7 w-7" />
          }
        />
      </div>
    </div>
  );
}

type CardProps = {
  text: string;
  SvgIcon: ReactElement;
};
function Card({ text, SvgIcon }: CardProps) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
      {SvgIcon}
      <p className="mt-3 font-normal text-gray-500 dark:text-gray-400">
        {text}
      </p>
    </div>
  );
}

type CardListProps = {
  rules: Rule[];
  SvgIcon: ReactElement;
};
function CardList({ rules, SvgIcon }: CardListProps) {
  return (
    <ul>
      {rules.map((rule) => {
        return (
          <li key={rule.description} className="flex flex-row py-2">
            <Card text={rule.description} SvgIcon={SvgIcon} />
          </li>
        );
      })}
    </ul>
  );
}
