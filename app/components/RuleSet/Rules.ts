import {
  animals,
  colorNames,
  fairyTaleBeginnings,
  monthsNames,
} from "./ValidationLists";

export interface Rule {
  name: string;
  desciption: string;
  validation: (text: string) => boolean;
  completed?: boolean;
}

// Rules is an array of objects that are rules
interface RuleStore extends Array<Rule> {}

export const Rules: RuleStore = [
  {
    name: "Starting text",
    desciption:
      'Must start with a fairy tale beginning like "Once upon a time", "In a land far far away" or "Long ago in a kingdom far far away"',
    validation: (text: string) => {
      const firstSentence = (text: string) =>
        text.toLowerCase().slice(0, 100).replace(/\n$/, "").trim();

      return fairyTaleBeginnings.some((beginning) =>
        firstSentence(text).startsWith(beginning.toLowerCase().trim())
      );
    },
  },
  {
    name: "Ending text",
    desciption: 'Must end with "The End"',
    // ignore the line break at the end of the text
    validation: (text: string) =>
      text
        .toLowerCase()
        .slice(-10)
        .replace(/\n$/, "")
        .trim()
        .endsWith("the end".toLowerCase()),
  },
  {
    name: "Sentence count",
    desciption: "Must have at least 3 sentences (ending with . or ! or ?)",
    validation: (text: string) => {
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
      return sentences ? sentences.length >= 3 : false;
    },
  },
  {
    name: "Word in sentence count",
    desciption:
      "Must have at least 4 words in each sentence (separated by spaces, commas or dashes)",
    validation: (text: string) => {
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
      if (sentences) {
        return sentences.every((sentence) => {
          const words = sentence.match(/[^ ,\-]+/g);
          return words ? words.length >= 4 : false;
        });
      }
      return false;
    },
  },
  {
    name: "Animal count",
    desciption: "Must have at least 3 animals",
    validation: (text: string) => {
      const cleanedText = text
        .toLowerCase()
        .replace(/[^a-z ]/g, "")
        .replace(/\s+/g, " ");

      return (
        animals.filter((animal) => cleanedText.includes(animal.toLowerCase()))
          .length >= 3
      );
    },
  },
  {
    name: "add your lucky number",
    desciption: "Must have your lucky number",
    validation: (text: string) => {
      return /\d/.test(text);
    },
  },
  {
    name: "add your favourite colour",
    desciption: "Must have your favourite colour",
    validation: (text: string) => {
      const cleanedText = text
        .toLowerCase()
        .replace(/[^a-z ]/g, "")
        .replace(/\s+/g, " ");

      return (
        colorNames.filter((color) => cleanedText.includes(color.toLowerCase()))
          .length >= 1
      );
    },
  },
  {
    name: "Capitalize Ts",
    desciption: "Must capitalize all Ts",
    validation: (text: string): boolean => {
      // should not contain capital T but should contain lowercase t for every occurance of t

      const includesCapitalT = text.includes("T");
      const includesLowercaseTs = !text.includes("t");

      return includesCapitalT && includesLowercaseTs;
    },
  },
  {
    name: "month names",
    desciption: "Must have a month name (January, February, etc)",
    validation: (text: string) => {
      const cleanedText = text
        .toLowerCase()
        .replace(/[^a-z ]/g, "")
        .replace(/\s+/g, " ");

      return (
        monthsNames.filter((month) => cleanedText.includes(month.toLowerCase()))
          .length >= 1
      );
    },
  },
  {
    name: "Today's day of the week",
    desciption: "Must have today's day of the week (Monday, Tuesday, etc)",
    validation: (text: string) => {
      // should match monday or mon
      const today = new Date();
      const day = today.toLocaleString("default", { weekday: "long" });
      const dayShort = today.toLocaleString("default", { weekday: "short" });

      return (
        text.toLowerCase().includes(day.toLowerCase()) ||
        text.toLowerCase().includes(dayShort.toLowerCase())
      );
    },
  },
  {
    name: "Some sentences should start with 'the'",
    desciption: "Must have atleast 3 sentences that start with 'the'",
    validation: (text: string) => {
      // split sentences based on . ! ? \n
      const theSentences = text
        .split(/\.|\!|\?|\n/)
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.toLowerCase().startsWith("the "));

      // only keep sentences that start with the

      return theSentences.length >= 3;
    },
  },
  {
    name: "Sentences start with a capital letter",
    desciption: "All sentences must start with a capital letter (A-Z)",
    validation: (text: string) => {
      const sentences = text
        .split(/\.|\!|\?|\n/)
        .filter((sentence) => sentence.trim() !== "")
        .map((sentence) => sentence.trim());
      if (sentences) {
        return sentences.every((sentence) => {
          const firstLetter = sentence.trim()[0];
          return firstLetter === firstLetter.toUpperCase();
        });
      }
      return false;
    },
  },
  {
    name: "Must have 10 lines",
    desciption: "Must have 10 lines",
    validation: (text: string) => {
      const lines = text.split("\n");
      return lines.length >= 10;
    },
  },
  {
    name: "Blank lines every 5",
    desciption: "Must have blank lines on every 5th line",
    validation: (text: string) => {
      // after every 5th line there should be 2 or more line breaks
      const lines = text.split("\n");
      const every5thLine = lines.filter((line, i) => (i + 1) % 5 === 0);
      return every5thLine.every((line) => line === "");
    },
  },
];
