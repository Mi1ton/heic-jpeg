import { useState } from "react";
import convert from "../utils/convert";

function Gallery({ jpegs, isConverting, initConvert }) {
  const [isDragging, setIsDragging] = useState(false);
  const bgColor = isDragging ? "bg-dark bg-opacity-10" : "bg-light";
  async function dropHandler(e) {
    e.preventDefault();
    const dataTransferArray = Array.from(e.dataTransfer.files);
    await initConvert(dataTransferArray);
    setIsDragging(false);
  }
  function dragOverHandler(e) {
    setIsDragging(true);
  }
  function dragLeaveHandler(e) {
    setIsDragging(false);
  }
  function onDragOverHandler(e) {
    e.preventDefault();
  }
  return (
    <div
      onDrop={async (e) => await dropHandler(e)}
      onDragEnter={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => onDragOverHandler(e)}
      className={`border border-dark-subtle rounded-5 overflow-scroll position-relative shadow-elevation-high p-3 ${bgColor} `}
      style={{
        height: "90vh",
      }}>
      {!isConverting && !jpegs.length ? (
        <i
          className={
            "bi-download position-absolute top-50 start-50 translate-middle bg-secondary"
          }
          style={{
            display: "box",
            fontSize: "8rem",
            color: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textShadow: "1px 1px 2px rgba(150, 150, 150, .4)",
          }}></i>
      ) : null}

      <div className="row row-cols-2 row-cols-md-4 g-4">
        {isConverting ? (
          <Spinner />
        ) : (
          <>
            {jpegs.map((jpeg, index) => {
              return <Img jpeg={jpeg} key={index} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    // <div className="position-absolute top-50 start-50 translate-middle">
    <div className="spinner-border" role="status"></div>
    // </div>
  );
}

function Img({ jpeg }) {
  const jpegURL = URL.createObjectURL(jpeg);
  return (
    <div className="col">
      <div style={{ position: "relative" }}>
        <a href={jpegURL} download={jpeg.name}>
          <img
            className="rounded-4 shadow-elevation-medium img-fluid border border-secondary"
            src={jpegURL}
            alt="Preview of a converted image"></img>
          <i
            className="bi-download fs-5"
            style={{
              position: "absolute",
              bottom: ".1rem",
              right: ".5rem",
              color: "white",
              textShadow: "0 0 3px black",
            }}></i>
        </a>
      </div>
    </div>
  );
}

export default Gallery;
