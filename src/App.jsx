//TODO
// multiple download
// display all uploaded files one by one
// transfer metadata

import { useState } from "react";
import { useRef } from "react";
import heic2any from "heic2any";
import JSZip from "jszip/dist/jszip";

export default function App() {
  const [jpegs, setJpegs] = useState([]);
  // const zippedJpegs = useRef(null);
  const [zippedJpegs, setZippedJpegs] = useState();
  //   {
  //     file: file/blob,
  //     URL: url
  //   }
  console.log(jpegs);

  function handleUpload(event) {
    const start = performance.now();
    const fileList = Array.from(event.target.files);

    // Create array of promises
    const promises = fileList.map((heic) => {
      return heic2any({
        blob: heic,
        toType: "image/jpeg",
        quality: 80,
      });
    });
    // Work on array of fulfilled promises
    Promise.allSettled(promises).then((results) => {
      const nextState = results.map((result, index) => {
        console.log("adding a file");
        const jpegBlob = result.value;
        const currentName = fileList[index].name.replace(/HEIC$/, "jpg");
        const jpegFile = new File([jpegBlob], currentName);
        const jpegURL = URL.createObjectURL(jpegFile);
        return { file: jpegFile, URL: jpegURL };
      });

      setJpegs(nextState);

      console.log("Now zipping");
      const zip = new JSZip();
      nextState.forEach((jpeg) => {
        zip.file(jpeg.file.name, jpeg.file);
      });
      zip.generateAsync({ type: "uint8array" }).then((result) => {
        const zipFile = new File([result], "heic.zip");
        const zipURL = URL.createObjectURL(zipFile);
        const nextZip = { file: zipFile, URL: zipURL };
        console.log(nextZip);
        setZippedJpegs(zipURL);
      });

      const end = performance.now();
      const totalTime = (end - start) / 1000;
      const timePerImage = totalTime / nextState.length;
      console.log(`time elapsed: ${totalTime}`);
      console.log(`time per image: ${timePerImage}`);
    });
  }

  function handleDownloadAll(e) {}

  return (
    <>
      <input
        type="file"
        accept="image/heic"
        multiple
        onChange={(e) => handleUpload(e)}
      />
      {jpegs.length > 0 && (
        <>
          {jpegs.map((jpeg) => (
            <Img jpegURL={jpeg.URL} key={jpeg.URL}></Img>
          ))}
          <a href={zippedJpegs} download>
            <button>Download All</button>
          </a>
        </>
      )}
    </>
  );
}

function Img({ jpegURL }) {
  return (
    <a href={jpegURL} download>
      <img
        src={jpegURL}
        height={100}
        width={100}
        alt="Preview of uploaded image"></img>
    </a>
  );
}
