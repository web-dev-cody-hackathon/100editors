export interface Rule {
  name: string;
  desciption: string;
  validation: (text: string) => boolean;
}

export const Rules = {
  1: {
    name: "Starting text",
    desciption: 'Must start with "Once upon a time"',
    validation: (text: string) =>
      text.toLowerCase().startsWith("once upon a time"),
  },
  2: {
    name: "Ending text",
    desciption: 'Must end with "The End"',
    validation: (text: string) => text.toLowerCase().endsWith("the end"),
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
};
