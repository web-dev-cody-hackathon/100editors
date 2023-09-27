import { Rule } from "./Rules";

interface ValidateTextProps {
  text: string;
  rules: Rule[];
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setAttemptedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
}

export const validateText = (props: ValidateTextProps) => {
  const {
    text,
    rules,
    setFailedRules,
    setPassedRules,
    setIsCompleted,
    slug,
    setIsLoaded,
    setAttemptedRules,
  } = props;

  const failedRules: Rule[] = [];
  const passedRules: Rule[] = [];

  // attempted rules should validate every time the user types
  if (text.length === 0) {
    failedRules.push(rules[0]);
  } else {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const prevRule = rules[i - 1];

      if (prevRule && !prevRule.completed) {
        break;
      }

      rule.attempted = true;
      if (!rule.validation({ text, slug })) {
        rule.completed = false;
      } else {
        rule.completed = true;
      }

      // sort failing a the top, passing at the bottom
      setAttemptedRules((prevRules) => [...prevRules, rule]);
    }

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule.attempted) {
        if (!rule.validation({ text, slug })) {
          rule.isPassing = false;
          failedRules.push(rule);
        } else {
          rule.isPassing = true;
          passedRules.push(rule);
        }
      }
    }
  }

  if (passedRules.length === Object.keys(rules).length) {
    setIsCompleted(true);
  }

  // sort and filter out duplicates from the attempted rules
  setAttemptedRules((prevRules) =>
    [...prevRules]
      .filter(
        (rule, index, self) =>
          index === self.findIndex((r) => r.name === rule.name)
      )
      .sort((a, b) => {
        // sort based on passed or not. Failed rules should be at the top
        if (a.isPassing && !b.isPassing) {
          return 1;
        } else if (!a.isPassing && b.isPassing) {
          return -1;
        } else {
          return 0;
        }
      })
  );
  setFailedRules(failedRules);
  setPassedRules(passedRules);
  setIsLoaded(true);
};
