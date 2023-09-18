// create a function that takes in some text, and an object of rules Rule and returns an array of Rule names that the text fails or pass

import { Rule } from "./Rules";

// rules is an object of Rule

export const validateText = ({
  text,
  rules,
}: {
  text: string;
  rules: Record<string, Rule>;
}) => {
  // return both fauled and passed rules
  const failedRules: Rule[] = [];
  const passedRules: Rule[] = [];

  // loop through the rules object
  for (const ruleId in rules) {
    // get the rule
    const rule = rules[ruleId];
    // check if the rule validation fails
    if (!rule.validation(text)) {
      // push the rule name to the failedRules array
      failedRules.push(rule);
    } else {
      // push the rule name to the passedRules array
      passedRules.push(rule);
    }
  }

  // return both fauled and passed rules
  return { failedRules, passedRules };
};
