export default function Result({ text }: { text: string }) {
  return (
    <div
      className="
        border-2 border-accent 
        w-full 
        max-h-[60vh] 
        rounded-lg 
        p-5 
        whitespace-pre-wrap 
        wrap-break-words 
        overflow-y-auto 
        overflow-x-hidden
      "
    >
      {text ? (
        text
      ) : (
        <span className="text-muted-foreground">No file uploaded yet</span>
      )}
    </div>
  );
}
