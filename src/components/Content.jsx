import { Pencil1Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
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
      <div ref={contentRef}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          {/* Page 1  */}
          <div
            style={{
              padding: "25px",
              pageBreakAfter: "always",
              breakAfter: "page",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            }}
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
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
            ></div>
            {/* HERO  */}
            <div
              style={{
                display: "grid",
                height: "236px",
                gridTemplateColumns: "1fr 177px",
                columnGap: "20px",
                marginTop: "30px",
                marginBottom: "60px",
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
                {contentData.hero.content.map(
                  ({ text, label, id, deletable }) => {
                    return (
                      <div
                        key={id}
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {editMode && deletable && (
                          <TrashIcon
                            onClick={() => {
                              function handleDelete(id) {
                                setContentData((prev) => {
                                  const copy = structuredClone(prev);
                                  const content = copy.hero.content.filter(
                                    (el) => {
                                      if (el.id === id) return false;
                                      else return true;
                                    }
                                  );
                                  copy.hero.content = content;
                                  return copy;
                                });
                              }

                              const check = confirm(
                                "Möchten Sie es wirklich löschen?"
                              );

                              if (check) {
                                handleDelete(id);
                              }
                            }}
                            onMouseOver={(evt) => {
                              evt.currentTarget.style.color = "red";
                            }}
                            onMouseLeave={(evt) => {
                              evt.currentTarget.style.color = "rgba(0,0,0,0.4)";
                            }}
                            style={{
                              color: "rgba(0,0,0,0.4)",
                              position: "absolute",
                              left: "0px",
                              transform: "translateX(-150%)",
                              cursor: "pointer",
                            }}
                            role="button"
                          />
                        )}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            alignItems: "start",
                            width: "100%",
                          }}
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
                                  const content = copy.hero.content.map(
                                    (el) => {
                                      if (text === el.text) {
                                        return {
                                          ...el,
                                          text: evt.target.value,
                                        };
                                      } else {
                                        return el;
                                      }
                                    }
                                  );
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
                      </div>
                    );
                  }
                )}
                {contentData.hero.content.length < 7 && editMode && (
                  <div
                    onClick={() => {
                      const label = prompt(
                        "Geben Sie den Abschnittsnamen ein",
                        "..."
                      );

                      if (label === null) return false;
                      else {
                        setContentData((prev) => {
                          const copy = structuredClone(prev);
                          const content = [
                            ...copy.hero.content,
                            {
                              text: "...",
                              id: window.crypto.randomUUID(),
                              label: label + ":",
                              deletable: true,
                            },
                          ];
                          copy.hero.content = content;
                          return copy;
                        });
                      }
                    }}
                    onMouseOver={(evt) => {
                      evt.currentTarget.style.borderColor = "rgba(0,0,255,0.4)";
                      evt.currentTarget.children[0].style.color =
                        "rgba(0,0,255,0.4)";
                    }}
                    onMouseLeave={(evt) => {
                      evt.currentTarget.style.borderColor = "rgba(0,0,0,0.4)";
                      evt.currentTarget.children[0].style.color =
                        "rgba(0,0,0,0.4)";
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2px",
                      boxSizing: "border-box",
                      border: "1px dashed rgba(0,0,0, 0.4)",
                      width: "100%",
                      cursor: "pointer",
                      bottom: "-30px",
                    }}
                    role="button"
                  >
                    <PlusIcon
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
                  width: "100%",
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

            {/* MAIN  */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {contentData.main.map(({ title, deletable, id }) => {
                return (
                  <div key={id}>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {editMode && deletable && (
                        <TrashIcon
                          onClick={() => {
                            function handleDelete(id) {
                              setContentData((prev) => {
                                const copy = structuredClone(prev);
                                const main = copy.main.filter((el) => {
                                  if (el.id === id) return false;
                                  else return true;
                                });
                                copy.main = main;
                                return copy;
                              });
                            }

                            const check = confirm(
                              "Möchten Sie es wirklich löschen?"
                            );

                            if (check) {
                              handleDelete(id);
                            }
                          }}
                          onMouseOver={(evt) => {
                            evt.currentTarget.style.color = "red";
                          }}
                          onMouseLeave={(evt) => {
                            evt.currentTarget.style.color = "rgba(0,0,0,0.4)";
                          }}
                          style={{
                            color: "rgba(0,0,0,0.4)",
                            position: "absolute",
                            left: "0px",
                            transform: "translateX(-150%)",
                            cursor: "pointer",
                          }}
                          role="button"
                        />
                      )}
                      <h2
                        style={{
                          fontFamily: generatedSettings.fontFamily,
                          lineHeight: "1.2",
                          fontWeight: "500",
                          fontSize: "21px",
                          margin: "0px",
                          marginBottom: "7.5px",
                        }}
                      >
                        {title}
                      </h2>
                    </div>
                    <div
                      style={{
                        height: "0.5px",
                        backgroundColor: "rgba(0,0,0,0.2)",
                      }}
                    ></div>
                  </div>
                );
              })}

              {editMode && (
                <div
                  onClick={() => {
                    const title = prompt(
                      "Geben Sie den Abschnittsnamen ein",
                      "..."
                    );

                    if (title === null) return false;
                    else {
                      setContentData((prev) => {
                        const copy = structuredClone(prev);
                        const main = [
                          ...copy.main,
                          {
                            title,
                            id: window.crypto.randomUUID(),
                            deletable: true,
                          },
                        ];
                        copy.main = main;
                        return copy;
                      });
                    }
                  }}
                  onMouseOver={(evt) => {
                    evt.currentTarget.style.borderColor = "rgba(0,0,255,0.4)";
                    evt.currentTarget.children[0].style.color =
                      "rgba(0,0,255,0.4)";
                  }}
                  onMouseLeave={(evt) => {
                    evt.currentTarget.style.borderColor = "rgba(0,0,0,0.4)";
                    evt.currentTarget.children[0].style.color =
                      "rgba(0,0,0,0.4)";
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "2px dashed rgba(0,0,0, 0.4)",
                    padding: "4px",
                  }}
                >
                  <PlusIcon
                    width="20px"
                    height="20px"
                    style={{
                      color: "rgba(0,0,0, 0.4)",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Others page */}
          {contentData.nextPages.map(({ title, id }) => {
            return (
              <div
                style={{
                  display: "flex",
                  position: "relative",
                }}
                key={id}
              >
                {editMode && (
                  <TrashIcon
                    onClick={() => {
                      function handleDelete(id) {
                        setContentData((prev) => {
                          const copy = structuredClone(prev);
                          const nextPages = copy.nextPages.filter((el) => {
                            if (el.id === id) return false;
                            else return true;
                          });
                          copy.nextPages = nextPages;
                          return copy;
                        });
                      }

                      const check = confirm("Möchten Sie die Seite löschen?");

                      if (check) {
                        handleDelete(id);
                      }
                    }}
                    onMouseOver={(evt) => {
                      evt.currentTarget.style.color = "red";
                    }}
                    onMouseLeave={(evt) => {
                      evt.currentTarget.style.color = "rgba(0,0,0,0.4)";
                    }}
                    style={{
                      color: "rgba(0,0,0,0.4)",
                      position: "absolute",
                      left: "0px",
                      top: "10px",
                      transform: "translateX(-150%)",
                      cursor: "pointer",
                    }}
                    width="40px"
                    height="40px"
                    role="button"
                  />
                )}
                <div
                  style={{
                    padding: "25px",
                    marginTop: "10px",
                    width: "100%",
                    pageBreakAfter: "always",
                    breakAfter: "page",
                    boxShadow:
                      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: generatedSettings.fontFamily,
                      lineHeight: "1.2",
                    }}
                  >
                    {title}
                  </h2>
                </div>
              </div>
            );
          })}

          {editMode && (
            <div
              onClick={() => {
                setContentData((prev) => {
                  const copy = structuredClone(prev);
                  const nextPages = [
                    ...copy.nextPages,
                    {
                      title: "Next page",
                      id: window.crypto.randomUUID(),
                      deletable: false,
                    },
                  ];
                  copy.nextPages = nextPages;
                  return copy;
                });
              }}
              onMouseOver={(evt) => {
                evt.currentTarget.style.borderColor = "rgba(0,0,255,0.4)";
                evt.currentTarget.children[0].style.color = "rgba(0,0,255,0.4)";
              }}
              onMouseLeave={(evt) => {
                evt.currentTarget.style.borderColor = "rgba(0,0,0,0.4)";
                evt.currentTarget.children[0].style.color = "rgba(0,0,0,0.4)";
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                boxSizing: "border-box",
                border: "3px dashed rgba(0,0,0, 0.4)",
                width: "100%",
                cursor: "pointer",
              }}
              role="button"
            >
              <PlusIcon
                width="24px"
                height="24px"
                style={{
                  color: "rgba(0,0,0, 0.4)",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </IgnoreTailwind>
  );
}
