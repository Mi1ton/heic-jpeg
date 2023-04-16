import { useState } from "react";
import heic2any from "heic2any";

export default function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileBuffer, setFileBuffer] = useState(null);

  function handleUpload(event) {
    const file = event.target.files.item(0);
    heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 80,
    }).then((converted) => {
      console.log(converted);
      setFileBuffer(converted);
      const inputURL = URL.createObjectURL(converted);
      setUploadedFile(inputURL);
    })
    // catch a case with wrong file format;
  }
  return (
    <>
      <input
        type="file"
        accept="image/heic"
        multiple
        onChange={(e) => handleUpload(e)}
      />
      {uploadedFile && (
        <>
          <img
            src={uploadedFile}
            height={100}
            width={100}
            alt="Preview of uploaded image"></img>
          <button>
            <a href={uploadedFile} download>
              Download
            </a>
          </button>
          {/* add multiple download */}
        </>
      )}
    </>
  );
}
