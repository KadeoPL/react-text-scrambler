import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useState, type ChangeEvent } from "react";
import { shuffleLetters } from "@/utils/shuffleLetters";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function FileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!selectedFile) return;

    if (selectedFile.type != "text/plain") {
      setStatus("error");
      return;
    }

    setStatus("uploading");

    try {
      const result = await shuffleLetters(selectedFile);
      if (!result) {
        throw new Error();
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <div className="w-full md:w-1/2 xl:w-1/4 flex flex-col gap-6">
      <Label htmlFor="file-input" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Upload Text File</span>
        <span className="text-muted-foreground text-sm">
          Only .txt files are allowed.
        </span>
      </Label>
      <Input
        id="file-input"
        type="file"
        accept=".txt"
        onChange={handleFileChange}
      />
      <Button
        onClick={handleFileUpload}
        size="lg"
        disabled={!selectedFile || status === "uploading"}
      >
        {status === "uploading" ? <Spinner /> : <Upload />} Upload
      </Button>
    </div>
  );
}
