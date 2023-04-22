//TODO
// drag and drop
// multiple download
// display all uploaded files one by one
// transfer metadata
// fix hello.zip
// make gallery vh-80 and scrollable on overflow
// add upload image into empty gallery
// add download image to Imgs
// hover effect for Imgs

import "./scss/styles.scss";
import { useState } from "react";
import Gallery from "./components/Gallery";
import UploadBtn from "./components/UploadBtn";
import convert from "./utils/convert";
import zip from "./utils/zip";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const [jpegs, setJpegs] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  return (
    <div>
      <div className="container">
        <nav className="navbar justify-content-evenly">
          <UploadBtn
            onChange={async (e) => {
              setIsConverting(true);
              setJpegs(await convert(Array.from(e.target.files)));
              setIsConverting(false);
            }}
          />
          <button
            className="btn btn-primary"
            disabled={!isConverting && jpegs.length ? false : true}
            onClick={async () => await zip(jpegs)}>
            Download as zip
          </button>
        </nav>
        <Gallery jpegs={jpegs} displaySpinner={isConverting} />
      </div>
    </div>
  );
}
