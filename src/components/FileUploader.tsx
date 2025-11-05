import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useState, type ChangeEvent } from "react";
import { shuffleLetters } from "@/utils/shuffleLetters";
import { toast } from "sonner";

type UploadStatus = "idle" | "uploading";

interface FileUploaderProps {
  onTextProcessed: (shuffledText: string) => void;
}

export default function FileUploader({ onTextProcessed }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      e.target.value = "";
    }
  }

  async function handleFileUpload() {
    if (!selectedFile) return;
    if (status === "uploading") return;

    if (selectedFile.size === 0) {
      toast.error("The file is empty.");
      return;
    }

    const isTxtExtension = selectedFile.name.endsWith(".txt");
    const isTextFile = selectedFile.type === "text/plain";

    if (!isTxtExtension || !isTextFile) {
      toast.error("Unsupported file type. Only .txt files are accepted.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the limit (max 10MB).");
      return;
    }

    setStatus("uploading");

    try {
      const result = await shuffleLetters(selectedFile);

      onTextProcessed(result);

      toast.success("File successfully uploaded");
      setStatus("idle");
    } catch (error) {
      toast.error("Failed to upload file");
      setStatus("idle");
      console.error(error);
    }
  }

  return (
    <div className="w-full md:w-1/2 xl:w-1/4 flex flex-col gap-6">
      <Label htmlFor="file-input" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Upload Text File</span>
        <span className="text-muted-foreground text-sm">
          Only text files (.txt) are allowed. Maximum file size: 10 MB.
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
      {selectedFile && (
        <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
      )}
    </div>
  );
}
