import { toast } from "sonner";

export async function shuffleLetters(file: File) {
  const text = await file.text();

  if (/�/.test(text)) {
    toast.error("The file is not properly encoded in UTF-8.");
    throw new Error("Invalid UTF-8 encoding");
  }

  const arrayLinesOfText = text.split("\n");

  const arrayOfShuffleWords = arrayLinesOfText.map((line) => {
    const wordsArray = line.split(/(\s+)/);

    const processedWordsArray = wordsArray.map((word) => {
      const match = word.match(/^(\W*)([\p{L}\d]+)(\W*)$/u);

      if (!match) return word;

      const [_, prefix, content, suffix] = match;

      if (content.length <= 3) return word;

      const firstLetter = content[0];
      const lastLetter = content[content.length - 1];
      const middle = content.substring(1, content.length - 1);

      const shuffleMiddle = mixLetters(middle);
      return prefix + firstLetter + shuffleMiddle + lastLetter + suffix;
    });

    return processedWordsArray.join("");
  });

  function mixLetters(letters: string) {
    const lettersForMix = letters.split("");

    for (let i = lettersForMix.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lettersForMix[i], lettersForMix[j]] = [
        lettersForMix[j],
        lettersForMix[i],
      ];
    }

    return lettersForMix.join("");
  }

  const finalShuffledText = arrayOfShuffleWords.join("\n");

  return finalShuffledText;
}
