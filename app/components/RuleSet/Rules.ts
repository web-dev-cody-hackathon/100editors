import {
  animals,
  colorNames,
  digits,
  fairyTaleBeginnings,
  monthsNames,
} from "./ValidationLists";
import getMatches from "./getMatches";

export interface Rule {
  name: string;
  description: string;
  validation: (text: string) => boolean;
  completed?: boolean;
}

interface RuleStore extends Array<Rule> {}

export const Rules: RuleStore = [
  {
    name: "Starting text",
    description:
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
    description: 'Must end with "The End"',
    validation: (text: string) =>
      text
        .toLowerCase()
        .slice(-10)
        .replace(/\n$/, "")
        .trim()
        .endsWith("the end".toLowerCase()),
  },
  {
    name: "Continue the story-1",
    description: "There's not enough words here. Add some more",
    validation: (text: string) => {
      const firstSentence = (text: string) => {
        const firstSlice = text
          .toLowerCase()
          .slice(0, 100)
          .replace(/\n$/, "")
          .trim();
        //  match the first sentence with fairy tale beginning and grab that sentence
        const firstSentenceSlice = fairyTaleBeginnings.find((beginning) =>
          firstSlice.startsWith(beginning.toLowerCase().trim())
        );
        return firstSentenceSlice ? firstSentenceSlice : "";
      };

      const lastSentence = (text: string) => {
        const lastSlice = text
          .toLowerCase()
          .slice(-100)
          .replace(/\n$/, "")
          .trim();
        //  match the last sentence with 'the end' and grab that sentence
        const lastSentenceSlice = lastSlice.endsWith("the end")
          ? "the end"
          : "";
        return lastSentenceSlice;
      };

      const firstSentenceIndex = text.indexOf(firstSentence(text));
      const lastSentenceIndex = text.indexOf(lastSentence(text));

      const textBetweenFirstAndLastSentence = text.slice(
        firstSentenceIndex + firstSentence(text).length,
        lastSentenceIndex
      );

      const words = textBetweenFirstAndLastSentence.match(/[^ ,\-\n]+/g);

      return words ? words.length >= 10 : false;
    },
  },
  {
    name: "Sentence count",
    description: "Must have at least 3 sentences (ending with . or ! or ?)",
    validation: (text: string) => {
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
      return sentences ? sentences.length >= 3 : false;
    },
  },
  {
    name: "Word in sentence count",
    description: "Must have at least 4 words in each sentence",
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
    description: "Must have at least 3 animals",
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
    description: "Must have your lucky number",
    validation: (text: string) => {
      return getMatches(text, digits).length > 0;
    },
  },
  {
    name: "add your favourite colour",
    description: "Must have your favourite colour",
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
    description: "Must capitalize all Ts",
    validation: (text: string): boolean => {
      const includesCapitalT = text.includes("T");
      const includesLowercaseTs = !text.includes("t");

      return includesCapitalT && includesLowercaseTs;
    },
  },
  {
    name: "month names",
    description: "Must have a month name (January, February, etc)",
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
    description: "Must have today's day of the week in Toronto",
    validation: (text: string) => {
      // should match monday or mon
      const today = new Date();
      const day = today.toLocaleString("default", {
        weekday: "long",
        timeZone: "America/New_York",
      });
      const dayShort = today.toLocaleString("default", {
        weekday: "short",
        timeZone: "America/New_York",
      });

      return (
        text.toLowerCase().includes(day.toLowerCase()) ||
        text.toLowerCase().includes(dayShort.toLowerCase())
      );
    },
  },
  {
    name: "should contain at least 7 digits",
    description: "Must contain at least 7 digits",
    validation: (text: string) => {
      return getMatches(text, digits).length > 7;
    },
  },
  {
    name: "Sentences start with a capital letter",
    description: "All sentences must start with a capital letter (A-Z)",
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
    name: "Must have at least 10 lines",
    description: "Must have at least 10 lines",
    validation: (text: string) => {
      const lines = text.split("\n");
      return lines.length >= 10;
    },
  },
  {
    name: "Min 3 words per line",
    description: "Must have at least 3 words per line",
    validation: (text: string) => {
      const lines = text.split("\n").filter((line) => line !== "");
      return lines.every((line) => {
        const words = line.split(" ");
        return words ? words.length >= 3 : false;
      });
    },
  },
  {
    name: "Blank lines every 5",
    description: "Every 5th line must be blank",
    validation: (text: string) => {
      const lines = text.split("\n");
      const every5thLine = lines.filter((line, i) => (i + 1) % 5 === 0);
      return every5thLine.every((line) => line === "");
    },
  },
  {
    name: "Must have less than 10 'and's",
    description: "Must have less than 10 'and's",
    validation: (text: string) => {
      const ands = text.match(/and/gi);
      return ands ? ands.length < 10 : false;
    },
  },
];
