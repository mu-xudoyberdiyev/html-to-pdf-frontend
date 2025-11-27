import { Pencil1Icon } from "@radix-ui/react-icons";
import IgnoreTailwind from "./IgnoreTailwind";

export default function Content({
  contentRef,
  generatedSettings,
  handleImage,
  editMode,
  img,
}) {
  return (
    <IgnoreTailwind>
      <div
        style={{
          padding: "20px 20px 20px 20px",
        }}
        ref={contentRef}
      >
        <h1
          style={{
            fontFamily: generatedSettings.fontFamily,
            border: `1px solid ${editMode ? "black" : "transparent"}`,
          }}
          contentEditable={editMode}
        >
          Mirzo Ulugbek
        </h1>
        <hr />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                alignItems: "center",
                width: "100%",
              }}
            >
              <strong
                style={{
                  fontFamily: generatedSettings.fontFamily,
                }}
              >
                Name:
              </strong>
              <p
                style={{
                  margin: "0px",
                  fontFamily: generatedSettings.fontFamily,
                  border: `1px solid ${editMode ? "black" : "transparent"}`,
                }}
                contentEditable={editMode}
              >
                Mirzo Ulugbek
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                alignItems: "center",
                width: "100%",
              }}
            >
              <strong
                style={{
                  fontFamily: generatedSettings.fontFamily,
                }}
              >
                Address:
              </strong>
              <p
                style={{
                  margin: "0px",
                  fontFamily: generatedSettings.fontFamily,
                  border: `1px solid ${editMode ? "black" : "transparent"}`,
                }}
                contentEditable={editMode}
              >
                Uzbekistan, Fergana, <br /> Tadbirkorlar 186
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                alignItems: "center",
                width: "100%",
              }}
            >
              <strong
                style={{
                  fontFamily: generatedSettings.fontFamily,
                }}
              >
                Birthday:
              </strong>
              <p
                style={{
                  margin: "0px",
                  fontFamily: generatedSettings.fontFamily,
                  border: `1px solid ${editMode ? "black" : "transparent"}`,
                }}
                contentEditable={editMode}
              >
                02.02.1994
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                alignItems: "center",
                width: "100%",
              }}
            >
              <strong
                style={{
                  fontFamily: generatedSettings.fontFamily,
                }}
              >
                Tel:
              </strong>
              <p
                style={{
                  margin: "0px",
                  fontFamily: generatedSettings.fontFamily,
                  border: `1px solid ${editMode ? "black" : "transparent"}`,
                }}
                contentEditable={editMode}
              >
                +998 (99) 777 77-77
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                alignItems: "center",
                width: "100%",
              }}
            >
              <strong
                style={{
                  fontFamily: generatedSettings.fontFamily,
                }}
              >
                Email:
              </strong>
              <a
                style={{
                  fontFamily: generatedSettings.fontFamily,
                  border: `1px solid ${editMode ? "black" : "transparent"}`,
                }}
                onBlur={(evt) => {
                  evt.target.href = "mailto:" + evt.target.innerText;
                }}
                contentEditable={editMode}
                href="mailto:mu.xudoyberdiyev@gmail.com"
              >
                mu.xudoyberdiyev@gmail.com
              </a>
            </div>
          </div>

          <div
            style={{
              position: "relative",
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
                  borderRadius: "10px",
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
                objectFit: "cover",
                width: "100%",
                height: "240px",
                borderRadius: "10px",
              }}
              src={img}
            />
          </div>
        </div>
      </div>
    </IgnoreTailwind>
  );
}
