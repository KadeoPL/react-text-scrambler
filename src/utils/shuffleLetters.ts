export async function shuffleLetters(file: File) {
  const text = await file.text();
  console.log(text);
  return true;
}
