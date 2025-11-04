export async function shuffleLetters(file: File) {
  const text = await file.text();
  const arrayOfStrings = text.split("\n");

  const arrayOfShuffleStrings = arrayOfStrings.map((line) => {
    const wordsArray = line.split(" ");
    wordsArray.map((word) => {
      if (word.length > 3) {
        const prefix = word.substring(0, 1);
        const sufix =
          word.substring(word.length - 1) === ","
            ? word.substring(word.length - 2)
            : word.substring(word.length - 1);
        const content = word.substring(1, word.length - 1);

        console.log(prefix + " " + content + " " + sufix);
      }
    });
  });

  return { text, status: true };
}
