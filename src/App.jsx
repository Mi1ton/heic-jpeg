//TODO
// Functional:
// multiple download
// display all uploaded files one by one
// transfer metadata
// Visuals:
// Fade in download image on hover

import testimg from "./img/testimg.jpg";
import { useState } from "react";
import { useRef } from "react";
import heic2any from "heic2any";
import JSZip from "jszip/dist/jszip";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";
import Gallery from "./components/Gallery";

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
        const jpegBlob = result.value;
        const currentName = fileList[index].name.replace(/HEIC$/, "jpg");
        const jpegFile = new File([jpegBlob], currentName);
        const jpegURL = URL.createObjectURL(jpegFile);
        return { file: jpegFile, URL: jpegURL };
      });

      setJpegs(nextState);

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

  return (
    <div>
      <div className="container-sm">
        <input
          type="file"
          accept="image/heic"
          multiple
          onChange={(e) => handleUpload(e)}
        />
        {jpegs.length > 0 && (
          <>
            <Gallery jpegs={jpegs} />
            <a href={zippedJpegs} download>
              <button>Download All</button>
            </a>
          </>
        )}
        {/* <Testgallery /> */}
      </div>
    </div>
  );
}

function Testimg() {
  return (
    <div className="col">
      <img
        className="rounded-3 shadow img-fluid"
        src={testimg}
        alt="Test image"></img>
    </div>
  );
}

function Testgallery() {
  return (
    <div className="row row-cols-4 gx-4 gy-5">
      <Testimg />
      <Testimg />
      <Testimg />
      <Testimg />
      <Testimg />
      <Testimg />
    </div>
  );
}
