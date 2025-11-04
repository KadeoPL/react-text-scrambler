export default function Result({ text }: { text: string }) {
  return (
    <div className="border-2 border-accent w-full min-h-1/2 rounded-lg p-5">
      {text}
    </div>
  );
}
