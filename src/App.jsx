//TODO
// Functional:
// multiple download
// display all uploaded files one by one
// transfer metadata
// Visuals:
// Fade in download image on hover

import "./scss/styles.scss";
import { useState } from "react";
import Gallery from "./components/Gallery";
import UploadBtn from "./components/UploadBtn";
import convert from "./utils/convert";
import zip from "./utils/zip";
import testimg from "./img/testimg.jpg";

export default function App() {
  const [jpegs, setJpegs] = useState([]);
  return (
    <div>
      <div className="container-sm">
        <nav className="navbar bg-body-tertiary justify-content-evenly">
          <UploadBtn
            onChange={async (e) =>
              setJpegs(await convert(Array.from(e.target.files)))
            }
          />
          <button
            className="btn btn-primary"
            onClick={async () => await zip(jpegs)}>
            Download All
          </button>
        </nav>
        <Gallery jpegs={jpegs} />
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
