//TODO
// transfer metadata
// make it work on iOS
// make it work offline
// make converter omit erroneous files

import "./scss/styles.scss";
import { useState } from "react";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import convert from "./utils/convert";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const [jpegs, setJpegs] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  async function initConvert(fileArray) {
    setIsConverting(true);
    setJpegs(await convert(fileArray));
    setIsConverting(false);
  }
  return (
    <div className="container">
      <Navbar
        initConvert={initConvert}
        isConverting={isConverting}
        jpegs={jpegs}
      />
      <Gallery
        jpegs={jpegs}
        isConverting={isConverting}
        initConvert={initConvert}
      />
    </div>
  );
}
