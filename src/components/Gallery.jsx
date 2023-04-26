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
  let display = null;
  // Show drag and drop
  if (!isConverting && !jpegs.length) {
    display = (
      <div
        className="position-absolute top-50 start-50 translate-middle bg-secondary text-center"
        style={{
          color: "transparent",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          textShadow: "1px 1px 2px rgba(150, 150, 150, .4)",
        }}>
        <i
          className="bi-download"
          style={{
            fontSize: "8rem",
          }}></i>
        <div className="fs-5">
          <div className="fw-bold">Choose files</div> or drag and them here
        </div>
      </div>
    );
    // Show spinner
  } else if (isConverting) {
    display = (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div
          className="spinner-border"
          style={{ width: "4.5rem", height: "4.5rem" }}
          role="status"></div>
      </div>
    );
    // Show image gallery
  } else {
    display = (
      <div className="row row-cols-2 row-cols-md-4 g-4">
        {jpegs.map((jpeg, index) => {
          return <Img jpeg={jpeg} key={index} />;
        })}
      </div>
    );
  }
  return (
    <div
      onDrop={async (e) => await dropHandler(e)}
      onDragEnter={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => onDragOverHandler(e)}
      className={`position-relative overflow-auto ${bgColor} border border-dark-subtle rounded-5 scrollbar-none shadow-elevation-high p-3`}
      style={{
        height: "90vh",
      }}>
      {display}
    </div>
  );
}

function Img({ jpeg }) {
  const jpegURL = URL.createObjectURL(jpeg);
  return (
    <div className="col">
      <div style={{ position: "relative" }}>
        <a href={jpegURL} download={jpeg.name}>
          <img
            className="rounded-4 shadow-elevation-medium img-fluid border border-secondary img"
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
