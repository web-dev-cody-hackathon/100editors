export interface Rule {
  name: string;
  desciption: string;
  validation: (text: string) => boolean;
  completed?: boolean;
}

// should enforce that the key is a string and the value is a Rule
interface RuleStore {
  [key: number]: Rule;
}

export const Rules: RuleStore = {
  1: {
    name: "Starting text",
    desciption: 'Must start with "Once upon a time"',
    validation: (text: string) =>
      text
        .toLowerCase()
        .slice(0, 20)
        .replace(/\n$/, "")
        .trim()
        .startsWith("once upon a time"),
  },
  2: {
    name: "Ending text",
    desciption: 'Must end with "The End"',
    // ignore the line break at the end of the text
    validation: (text: string) =>
      text
        .toLowerCase()
        .slice(-10)
        .replace(/\n$/, "")
        .trim()
        .endsWith("the end"),
  },
  3: {
    name: "Word count",
    desciption: "Must have at least 100 words",
    validation: (text: string) => text.toLowerCase().split(" ").length >= 100,
  },
  4: {
    name: "Comma count",
    desciption: "Must have at least 10 commas",
    validation: (text: string) => text.toLowerCase().split(",").length >= 10,
  },
  5: {
    name: "Sentence count",
    desciption: "Must have at least 10 sentences",
    validation: (text: string) => text.toLowerCase().split(".").length >= 10,
  },
  6: {
    name: "Paragraph count",
    desciption: "Must have at least 3 paragraphs",
    validation: (text: string) => text.toLowerCase().split("\n").length >= 3,
  },
  7: {
    name: "Question count",
    desciption: "Must have at least 3 questions",
    validation: (text: string) => text.toLowerCase().split("?").length >= 3,
  },
  8: {
    name: "Exclamation count",
    desciption: "Must have at least 3 exclamation marks",
    validation: (text: string) => text.toLowerCase().split("!").length >= 3,
  },
  9: {
    name: "Colon count",
    desciption: "Must have at least 3 colons",
    validation: (text: string) => text.toLowerCase().split(":").length >= 3,
  },
  10: {
    name: "Dog or cat",
    desciption: "Must contain the word dog or cat",
    validation: (text: string) =>
      text.toLowerCase().includes("dog") || text.toLowerCase().includes("cat"),
  },
  11: {
    name: "Phone number",
    desciption: "Must contain a 9 digit phone number",
    validation: (text: string) => {
      const phoneRegex = /\d{9}/;
      return phoneRegex.test(text);
    },
  },
  12: {
    name: "Email address",
    desciption: "Must contain a valid email address",
    validation: (text: string) => {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(text);
    },
  },
};
