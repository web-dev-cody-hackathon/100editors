import {
  animals,
  colorNames,
  digitStringToNumber,
  digits,
  digitsNumerals,
  fairyTaleBeginnings,
  monthsNames,
  replaceNumeralsWithText,
  wordsWithX,
  wordsWithJ,
  wordsWithZ,
} from "./ValidationLists";
import getMatches from "./getMatches";

export interface Rule {
  name: string;
  description: string;
  // make slug optional for rules that don't need it
  validation: ({ text, slug }: { text: string; slug?: string }) => boolean;
  completed?: boolean;
  isPassing?: boolean;
  attempted?: boolean;
}

interface RuleStore extends Array<Rule> {}

export const Rules: RuleStore = [
  {
    name: "Starting text",
    description:
      'Must start with a fairy tale beginning like "Once upon a time", "In a land far far away" or "Long ago in a kingdom far far away"',
    validation: ({ text }) => {
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
    validation: ({ text }) =>
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
    validation: ({ text }) => {
      // clean up the text by removing line break and extra spaces
      const cleanedText = text.replace(/\n/g, " ").replace(/\s+/g, " ");
      const words = cleanedText.split(" ");

      const wordCount = words.length;
      const isPassing = wordCount >= 20;

      return isPassing;
    },
  },
  {
    name: "Sentence count",
    description: "Must have at least 3 sentences (ending with . or ! or ?)",
    validation: ({ text }) => {
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
      return sentences ? sentences.length >= 3 : false;
    },
  },
  {
    name: "Word in sentence count",
    description: "Must have at least 4 words in each sentence",
    validation: ({ text }) => {
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
    name: "Include a word with a letter - 3",
    description:
      "Add 1 english word with the letter 'Z' in it. Hint: See console :)",
    validation: ({ text }) => {
      // use the wordsWithZ array
      const words = text.match(/[^ ,\-\n]+/g);

      const matchingWords = words?.filter((word) =>
        wordsWithZ.includes(word.toLowerCase())
      );
      const isPassing = matchingWords ? matchingWords.length >= 1 : false;
      if (!isPassing) {
        // if there are no matching words, log "none", otherwise log the matching words
        console.log(`Words that count: ${matchingWords?.toString() || "none"}`);
      }
      return isPassing;
    },
  },
  {
    name: "Must contain the room code",
    description: "Must contain the room code",
    validation: ({ text, slug }) => {
      return (
        getMatches(text, [slug!, replaceNumeralsWithText(slug!)]).length > 0
      );
    },
  },
  {
    name: "Animal count",
    description: "Must have at least 3 animals",
    validation: ({ text }) => {
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
    validation: ({ text }) => {
      return getMatches(text, digits).length > 0;
    },
  },
  {
    name: "add your favourite colour",
    description: "Must have your favourite colour",
    validation: ({ text }) => {
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
    validation: ({ text }): boolean => {
      const includesCapitalT = text.includes("T");
      const includesLowercaseTs = !text.includes("t");

      const occurrences = getMatches(text, ["t"]);

      return occurrences.length === 0
        ? true
        : includesCapitalT && includesLowercaseTs;
    },
  },
  {
    name: "Blank lines every 5",
    description: "Every 5th line must be blank",
    validation: ({ text }) => {
      const lines = text.split("\n");
      const every5thLine = lines.filter((line, i) => (i + 1) % 5 === 0);
      return every5thLine.every((line) => line === "");
    },
  },
  {
    name: "month names",
    description: "Must have a month name (January, February, etc)",
    validation: ({ text }) => {
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
    name: "Include a word with a letter - 2",
    description:
      "Add 2 english words with the letter 'J' in it. Hint: See console :)",
    validation: ({ text }) => {
      // use the wordsWithY array
      const words = text.match(/[^ ,\-\n]+/g);
      const matchingWords = words?.filter((word) =>
        wordsWithJ.includes(word.toLowerCase())
      );
      const isPassing = matchingWords ? matchingWords.length >= 2 : false;
      if (!isPassing) {
        // if there are no matching words, log "none", otherwise log the matching words
        console.log(`Words that count: ${matchingWords?.toString() || "none"}`);
      }
      return isPassing;
    },
  },
  {
    name: "Today's day of the week",
    description: "Must have today's day of the week in Toronto",
    validation: ({ text }) => {
      // should match monday or mon
      const today = new Date();
      const day = today.toLocaleString("en-US", {
        weekday: "long",
        timeZone: "America/New_York",
      });
      const dayShort = today.toLocaleString("en-US", {
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
    name: "Capitalize a random letter - 3",
    description: `Must capitalize all ${new Date()
      .toLocaleDateString("en-US", {
        month: "long",
        timeZone: "America/New_York",
      })[2]
      .toUpperCase()}'s`,
    validation: ({ text }) => {
      // get the current month and return the 1st letter of the month
      const char = new Date().toLocaleDateString("en-US", {
        month: "long",
        timeZone: "America/New_York",
      })[2];
      const includesCapitalChar = text.includes(char.toUpperCase());
      const includesLowercaseChar = !text.includes(char.toLowerCase());

      const occurrences = getMatches(text, [char]);

      return occurrences.length === 0
        ? true
        : includesCapitalChar && includesLowercaseChar;
    },
  },
  {
    name: "digits should add up to 42",
    description: "Digits should add up to 42 (check the console for the sum)",
    validation: ({ text }) => {
      const sum = getMatches(text, digits)
        .map(digitStringToNumber)
        .reduce((acc, val) => acc + val, 0);
      const isPassing = sum === 42;
      if (!isPassing) {
        console.log("Sum of digits:", sum);
      }
      return isPassing;
    },
  },
  {
    name: "Include a word with a letter - 1",
    description:
      "Add 3 english words with the letter 'X' in it. Hint: See console :)",
    validation: ({ text }) => {
      const words = text.match(/[^ ,\-\n]+/g);
      const matchingWords = words?.filter((word) =>
        wordsWithX.includes(word.toLowerCase())
      );
      const isPassing = matchingWords ? matchingWords.length >= 3 : false;
      if (!isPassing) {
        // if there are no matching words, log "none", otherwise log the matching words
        console.log(`Words that count: ${matchingWords?.toString() || "none"}`);
      }
      return isPassing;
    },
  },
  {
    name: "Sentences start with a capital letter",
    description: "All sentences must start with a capital letter (A-Z)",
    validation: ({ text }) => {
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
    validation: ({ text }) => {
      const lines = text.split("\n");
      return lines.length >= 10;
    },
  },
  {
    name: "Must spell out digits",
    description:
      "We hear it's trendy to spell out each digit. Replace each numeral with it's longer counterpart",
    validation: ({ text }) => {
      return getMatches(text, digitsNumerals).length === 0;
    },
  },
  {
    name: "Min 3 words per line",
    description: "Must have at least 3 words per line",
    validation: ({ text }) => {
      const lines = text.split("\n").filter((line) => line !== "");
      return lines.every((line) => {
        const words = line.split(" ");
        return words ? words.length >= 3 : false;
      });
    },
  },
  {
    name: "Capitalize a random letter - 1",
    description: `Must capitalize all ${new Date()
      .toLocaleDateString("en-US", {
        month: "long",
        timeZone: "America/New_York",
      })[0]
      .toUpperCase()}'s`,
    validation: ({ text }) => {
      // get the current month and return the 1st letter of the month
      const char = new Date().toLocaleDateString("en-US", {
        month: "long",
        timeZone: "America/New_York",
      })[0];

      const includesCapitalChar = text.includes(char.toUpperCase());
      const includesLowercaseChar = !text.includes(char.toLowerCase());

      // get an array of all the occurrences of the char in the text
      const occurrences = getMatches(text, [char]);

      // if there are no occurrences, return true, otherwise check if the capital and lowercase are included
      return occurrences.length === 0
        ? true
        : includesCapitalChar && includesLowercaseChar;
    },
  },
  {
    name: "Capitalize a random letter - 2",
    description: `Must capitalize all ${new Date()
      .toLocaleDateString("en-US", {
        month: "long",
        timeZone: "America/New_York",
      })[1]
      .toUpperCase()}'s`,
    validation: ({ text }) => {
      // get the current month and return the 1st letter of the month
      const char = new Date().toLocaleDateString("en-US", {
        month: "long",
        timeZone: "America/New_York",
      })[1];
      const includesCapitalChar = text.includes(char.toUpperCase());
      const includesLowercaseChar = !text.includes(char.toLowerCase());

      const occurrences = getMatches(text, [char]);

      return occurrences.length === 0
        ? true
        : includesCapitalChar && includesLowercaseChar;
    },
  },
  {
    name: "Add emojis",
    description:
      "The story looks a little sad. Add some emojis. Hint: https://emojipedia.org/random",
    validation: ({ text }) => {
      // get an array of all the emojis in the text separated by commas, not just the first match
      const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

      const emojis = text.match(emojiRegex);

      const isPassing = emojis ? emojis.length >= 3 : false;
      if (!isPassing) {
        console.log(
          `Emojis found: ${emojis?.toString() || "none"}`,
          `${
            emojis && emojis.length <= 3
              ? `Add ${3 - emojis.length} more ${
                  emojis.length === 2 ? "emoji" : "emojis"
                }`
              : "|| Hint: https://emojipedia.org/random"
          }`
        );
      }
      return isPassing;
    },
  },
];
