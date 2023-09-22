import { Rule } from "./Rules";

interface ValidateTextProps {
  text: string;
  rules: Rule[];
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
}

export const validateText = (props: ValidateTextProps) => {
  const { text, rules, setFailedRules, setPassedRules, setIsCompleted, slug } =
    props;

  const failedRules: Rule[] = [];
  const passedRules: Rule[] = [];

  if (text.length === 0) {
    failedRules.push(rules[0]);
  } else {
    for (let i = 0; i < rules.length; i++) {
      const prevRule = rules[i - 1];
      if (prevRule && !prevRule.completed) {
        break;
      }

      const rule = rules[i];
      if (!rule.validation({ text, slug })) {
        rule.completed = false;
        failedRules.push(rule);
      } else {
        rule.completed = true;
        passedRules.push(rule);
      }
    }
  }

  if (passedRules.length === Object.keys(rules).length) {
    setIsCompleted(true);
  }

  setFailedRules(failedRules);
  setPassedRules(passedRules);
};
