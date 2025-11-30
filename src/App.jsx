import { LightningBoltIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button";
import Content from "./components/Content";
import { useEffect, useRef, useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { imgSrc } from "./constants";

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
      backgroundColor: "black !important",
      color: "white !important",
    },
  },
  {
    title: "Light",
    value: {
      backgroundColor: "white !important",
      color: "black !important",
    },
  },
];

const initialContentData = {
  header: {
    title: "Max Mustermann",
  },
  hero: {
    content: [
      {
        label: "Vollständiger Name:",
        text: "Max Mustermann",
        id: window.crypto.randomUUID(),
      },
      {
        label: "Geburtsdatum:",
        text: "tag.monat.jahr",
        id: window.crypto.randomUUID(),
      },
      {
        label: "Anschrift:",
        text: "Straße, Stadt, PLZ",
        id: window.crypto.randomUUID(),
      },
      {
        label: "Telefonnummer:",
        text: "+49 30 1234567",
        id: window.crypto.randomUUID(),
      },
      {
        label: "E-Mail-Adresse:",
        text: "max@gmail.com",
        id: window.crypto.randomUUID(),
      },
    ],
    img: imgSrc,
  },
  main: {},
};

export default function App() {
  const [contentData, setContentData] = useState(
    JSON.parse(localStorage.getItem("content")) || initialContentData
  );

  const contentRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
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

  function handleImage(file) {
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result;
      setContentData((prev) => {
        const copy = structuredClone(prev);
        copy.hero.img = base64String;
        return copy;
      });
    };

    reader.readAsDataURL(file);
  }

  function generate() {
    if (editMode) return false;

    const name = prompt("Enter file name (without .pdf): ", "resume");

    // https://masako-numerous-loretta.ngrok-free.dev
    // http://localhost:3000

    setLoading(true);
    fetch("https://masako-numerous-loretta.ngrok-free.dev/save-as-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: contentRef?.current.outerHTML,
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

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(contentData));
  }, [JSON.stringify(contentData)]);

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

          {/* <NativeSelect
            onChange={(evt) => {
              const theme = themes.find(
                (element) => element.title === evt.target.value
              );

              setGeneratedSettings((prev) => {
                return {
                  ...prev,
                  theme,
                };
              });
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
          </NativeSelect> */}
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center space-x-2">
            <Switch
              defaultChecked={editMode}
              onCheckedChange={() => {
                setEditMode(!editMode);
              }}
              id="edit-mode"
            />
            <Label htmlFor="edit-mode">Bearbeitungsmodus</Label>
          </div>

          <Button
            onClick={generate}
            disabled={loading || editMode}
            variant="outline"
          >
            {loading ? (
              <>
                <UpdateIcon className="animate-spin" />
                Wird generiert...
              </>
            ) : (
              <>
                <LightningBoltIcon />
                Generieren
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="w-[796px] border mx-auto">
        <Content
          contentData={contentData}
          setContentData={setContentData}
          generatedSettings={generatedSettings}
          editMode={editMode}
          handleImage={handleImage}
          contentRef={contentRef}
        />
      </div>
    </div>
  );
}
