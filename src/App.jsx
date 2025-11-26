import { LightningBoltIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button";
import Content from "./components/ui/Content";
import { useRef, useState } from "react";

export default function App() {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function download(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClick() {
    const name = prompt("Enter file name (without .pdf): ", "resume");

    setLoading(true);
    fetch("https://html-to-pdf-backend-mhe9.onrender.com/save-as-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: contentRef?.current.innerHTML,
      }),
    })
      .then((res) => {
        return res.blob();
      })
      .then((res) => {
        download(res, (name.trim() || "resume") + ".pdf");
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="container mx-auto px-5">
      <div className="flex justify-end py-5">
        <Button onClick={handleClick} disabled={loading} variant="outline">
          {loading ? (
            <>
              <UpdateIcon className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <LightningBoltIcon />
              Generate
            </>
          )}
        </Button>
      </div>
      <Content contentRef={contentRef} />
    </div>
  );
}
