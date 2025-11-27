import { LightningBoltIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button";
import Content from "./components/Content";
import { useRef, useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const pdfSafeFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
  "Tahoma",
];

const themes = [
  {
    title: "Dark",
    value: {
      backgroundColor: "black",
      color: "white",
    },
  },
  {
    title: "Light",
    value: {
      backgroundColor: "white",
      color: "black",
    },
  },
];

export default function App() {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedSettings, setGeneratedSettings] = useState({
    fontFamily: "Georgia",
    theme: {
      title: "Light",
      value: {
        backgroundColor: "white",
        color: "black",
      },
    },
  });

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
    fetch("https://masako-numerous-loretta.ngrok-free.dev/save-as-pdf", {
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
      <div className="flex justify-between pt-5 pb-10">
        <div className="flex gap-5">
          <NativeSelect
            onChange={(evt) => {
              const fontFamily = evt.target.value;
              setGeneratedSettings((prev) => {
                return { ...prev, fontFamily };
              });
            }}
            defaultValue="Georgia"
          >
            {pdfSafeFonts.map((font) => {
              return (
                <NativeSelectOption value={font} key={font}>
                  {font}
                </NativeSelectOption>
              );
            })}
          </NativeSelect>
          <NativeSelect
            onChange={(evt) => {
              // const theme = themes.find(
              //   (element) => element.title === evt.target.value
              // );

              alert("Soon 🔜");

              // setGeneratedSettings((prev) => {
              //   return {
              //     ...prev,
              //     theme,
              //   };
              // });
            }}
            defaultValue="Light"
          >
            {themes.map((theme) => {
              return (
                <NativeSelectOption value={theme.title} key={theme.title}>
                  {theme.title}
                </NativeSelectOption>
              );
            })}
          </NativeSelect>
        </div>

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
      <div className="border rounded-md p-5 shadow-sm w-[794px] mx-auto">
        <Content
          generatedSettings={generatedSettings}
          contentRef={contentRef}
        />
      </div>
    </div>
  );
}
