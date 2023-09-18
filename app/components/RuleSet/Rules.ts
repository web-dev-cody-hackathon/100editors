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
      const fairyTaleBeginnings = [
        "once upon a time",
        "once upon a time in a land far away",
        "in a land far far away",
        "in a kingdom far far away",
        "long ago in a land far far away",
        "Long ago in a kingdom far far away",
        "Once upon a time in a land far away",
        "Once upon a time in a land far far away",
        "Once upon a time in a kingdom far away",
        "Once upon a time in a kingdom far far away",
      ];

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
      const animals = [
        "Dog",
        "Doggy",
        "Pup",
        "Puppy",
        "Canine",
        "Cat",
        "Kitty",
        "Kitten",
        "Fish",
        "Fishy",
        "Bird",
        "Birb",
        "Mouse",
        "Mice",
        "Rat",
        "Ratty",
        "Rabbit",
        "Bunny",
        "Hamster",
        "Guinea Pig",
        "Snake",
        "Serpent",
        "Turtle",
        "Tortoise",
        "Lizard",
        "Frog",
        "Amphibian",
      ];

      const cleanedText = text
        .toLowerCase()
        .replace(/[^a-z ]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return (
        cleanedText.split(" ").filter((word) => animals.includes(word))
          .length >= 3
      );
    },
  },
];
