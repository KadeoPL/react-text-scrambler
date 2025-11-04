import { useState } from "react";
import FileUploader from "./components/FileUploader";
import Result from "./components/Result";
import { Toaster } from "sonner";

function App() {
  const [outputText, setOutputText] = useState<string>("");
  return (
    <>
      {" "}
      <main className="w-svw h-svh px-10 lg:px-52 flex flex-col md:flex-row-reverse gap-10 items-center justify-center">
        <Result text={outputText} />
        <FileUploader onTextProcessed={setOutputText} />
      </main>
      <Toaster />
    </>
  );
}

export default App;
