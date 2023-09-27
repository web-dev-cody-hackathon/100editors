import { CSSProperties, ReactElement } from "react";
import { Rule } from "./Rules";
import { BsFillEmojiAngryFill, BsFillEmojiHeartEyesFill } from "react-icons/bs";
import PacmanLoader from "react-spinners/PacmanLoader";

interface RuleSetProps {
  passedRules: Rule[];
  failedRules: Rule[];
  isLoaded: boolean;
  attemptedRules: Rule[];
}

const spinnerStyle: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function RuleSet(props: RuleSetProps) {
  const { passedRules, failedRules, isLoaded, attemptedRules } = props;

  return (
    <div className="flex flex-col items-center align-items h-[76vh] ">
      <h3>
        Rules (Passed: {passedRules.length} of{" "}
        {passedRules.length + failedRules.length})
      </h3>
      <div className="h-[10px] mt-1">
        <PacmanLoader
          color={"#36d7b7"}
          loading={!isLoaded}
          cssOverride={spinnerStyle}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div className="min-w-[20vw] p-6 min-h-[60vh] max-w-[20vw] overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <CardList attemptedRules={attemptedRules} />
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
      {/* word wrap */}
      <p className="mt-3 font-normal text-gray-500 dark:text-gray-400 break-words">
        {text}
      </p>
    </div>
  );
}

type CardListProps = {
  attemptedRules: Rule[];
};
function CardList({ attemptedRules }: CardListProps) {
  return (
    <ul>
      {attemptedRules.map((rule) => {
        return (
          <li key={rule.description} className="flex flex-row py-2">
            <Card
              text={rule.description}
              SvgIcon={
                rule.isPassing ? (
                  <BsFillEmojiHeartEyesFill className="text-green-500 h-7 w-7" />
                ) : (
                  <BsFillEmojiAngryFill className="text-red-500 h-7 w-7" />
                )
              }
            />
          </li>
        );
      })}
    </ul>
  );
}
