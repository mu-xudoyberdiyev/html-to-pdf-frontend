import { Pencil1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import IgnoreTailwind from "./IgnoreTailwind";

export default function Content({
  contentData,
  setContentData,
  contentRef,
  generatedSettings,
  handleImage,
  editMode,
}) {
  return (
    <IgnoreTailwind>
      <div
        style={{
          padding: "30px",
        }}
        ref={contentRef}
      >
        {editMode === false && (
          <h1
            style={{
              fontFamily: generatedSettings.fontFamily,
              lineHeight: "1.2",
              fontSize: "28px",
              margin: "0px",
              marginBottom: "15px",
            }}
            tabIndex={1}
          >
            {contentData.header.title}
          </h1>
        )}
        {editMode && (
          <input
            onChange={(evt) => {
              setContentData((prev) => {
                const copy = structuredClone(prev);
                copy.header.title = evt.target.value;
                return copy;
              });
            }}
            style={{
              padding: "0px",
              fontFamily: generatedSettings.fontFamily,
              fontWeight: "700",
              fontSize: "28px",
              width: "100%",
              marginBottom: "15px",
            }}
            defaultValue={contentData.header.title}
            autoFocus={editMode}
            type="text"
          />
        )}
        <hr
          style={{
            margin: "0px",
          }}
        />
        {/* HERO  */}
        <div
          style={{
            display: "grid",
            columnGap: "20px",
            height: "236px",
            gridTemplateColumns: "4fr 1fr",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            {contentData.hero.content.map(({ text, label, id }) => {
              return (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    alignItems: "start",
                    width: "100%",
                  }}
                  key={id}
                >
                  <strong
                    style={{
                      fontFamily: generatedSettings.fontFamily,
                      fontSize: "14px",
                      lineHeight: "1.2",
                    }}
                  >
                    {label}
                  </strong>
                  {editMode === false && (
                    <p
                      style={{
                        margin: "0px",
                        fontFamily: generatedSettings.fontFamily,
                        fontSize: "14px",
                        lineHeight: "1.2",
                      }}
                    >
                      {text}
                    </p>
                  )}
                  {editMode && (
                    <input
                      onChange={(evt) => {
                        setContentData((prev) => {
                          const copy = structuredClone(prev);
                          const content = copy.hero.content.map((el) => {
                            if (text === el.text) {
                              return { ...el, text: evt.target.value };
                            } else {
                              return el;
                            }
                          });
                          copy.hero.content = content;
                          return copy;
                        });
                      }}
                      style={{
                        padding: "0px",
                        fontFamily: generatedSettings.fontFamily,
                        fontSize: "14px",
                        lineHeight: "1.2",
                      }}
                      defaultValue={text}
                      type="text"
                    />
                  )}
                </div>
              );
            })}
            {contentData.hero.content.length < 7 && editMode && (
              <div
                onClick={() => {
                  setContentData((prev) => {
                    const copy = structuredClone(prev);
                    const label =
                      prompt("Geben Sie den Abschnittsnamen ein", "...") + ":";
                    const content = [
                      ...copy.hero.content,
                      { text: "...", id: window.crypto.randomUUID(), label },
                    ];
                    copy.hero.content = content;
                    return copy;
                  });
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "4px",
                  boxSizing: "border-box",
                  border: "1px solid rgba(0,0,0, 0.2)",
                  width: "100%",
                  cursor: "pointer",
                  bottom: "-30px",
                }}
                role="button"
              >
                <PlusCircledIcon
                  style={{
                    color: "rgba(0,0,0, 0.4)",
                  }}
                />
              </div>
            )}
          </div>

          <div
            style={{
              position: "relative",
              width: "177px",
              height: "100%",
            }}
          >
            {editMode && (
              <label
                onClick={() => {}}
                htmlFor="file"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  inset: "0",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  cursor: "pointer",
                }}
              >
                <input
                  onChange={(evt) => {
                    const file = evt.target.files[0];
                    if (file) handleImage(file);
                  }}
                  style={{
                    display: "none",
                  }}
                  id="file"
                  accept="image/*"
                  type="file"
                />
                <Pencil1Icon
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "white",
                  }}
                />
              </label>
            )}
            <img
              style={{
                display: "flex",
                objectPosition: "center",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                aspectRatio: "3 / 4",
              }}
              src={contentData.hero.img}
            />
          </div>
        </div>
      </div>
    </IgnoreTailwind>
  );
}
