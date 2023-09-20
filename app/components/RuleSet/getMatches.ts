import { digits } from "./ValidationLists";

const arrayToRegex = (stringsToMatch: string[]): RegExp => {
  // Escape any special characters in the input strings and join them with the "|" (OR) operator.
  const escapedStrings = stringsToMatch.map((str) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const joinedRegex = escapedStrings.join("|");

  // Create and return the regular expression.
  return new RegExp(`(${joinedRegex})`, "g");
};

const getMatches = (haystack: string, needles: string[]): string[] => {
  const matches = haystack.match(arrayToRegex(needles));

  if (matches === null) {
    return [];
  }

  return matches;
};

export default getMatches;
