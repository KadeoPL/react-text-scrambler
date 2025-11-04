import { useState } from "react";
import FileUploader from "./components/FileUploader";
import Result from "./components/Result";

function App() {
  const [outputText, setOutputText] = useState("");
  return (
    <main className="w-svw h-svh px-10 lg:px-52 flex flex-col md:flex-row-reverse gap-10 items-center justify-center">
      <Result text={outputText} />
      <FileUploader onTextProcessed={setOutputText} />
    </main>
  );
}

export default App;
