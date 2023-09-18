// create a function that takes in some text, and an object of rules Rule and returns an array of Rule names that the text fails or pass

import { Rule } from "./Rules";

interface ValidateTextProps {
  text: string;
  rules: Record<number, Rule>;
  setFailedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setPassedRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const validateText = (props: ValidateTextProps) => {
  const { text, rules, setFailedRules, setPassedRules, setIsCompleted } = props;
  // return both fauled and passed rules
  const failedRules: Rule[] = [];
  const passedRules: Rule[] = [];

  /* add a completed flag to each rule
  
    * if there is no text, then return the 1st rule into the failedRules array
   *
   *  if there is text, then go to the next rule and check if the text passes or fails
   *  if it fails, then push the rule into the failedRules array
   *  if it passes, then push the rule into the passedRules array
   *  then go to the next rule and repeat the process, but only if the previous rule passed
   *  if the text passes all the rules, then switch the isCompleted to true
   */
  console.log("validateText", { text });
  if (text.length === 0) {
    failedRules.push(rules[1]);
  } else {
    for (let i = 1; i <= Object.keys(rules).length; i++) {
      const prevRule = rules[i - 1];
      if (prevRule && !prevRule.completed) {
        break;
      }
      const rule = rules[i];

      console.log(`${rule.name} rule is passing`, rule.validation(text));
      if (!rule.validation(text)) {
        rule.completed = false;
        failedRules.push(rule);
      } else {
        rule.completed = true;
        passedRules.push(rule);
      }
    }

    if (passedRules.length === Object.keys(rules).length) {
      setIsCompleted(true);
    }
  }

  setFailedRules(failedRules);
  setPassedRules(passedRules);
};
