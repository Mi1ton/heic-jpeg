import JSZip from "jszip/dist/jszip.min.js";
import FileSaver from "file-saver";

async function zip(jpegs) {
  const zip = new JSZip();
  jpegs.forEach((jpeg) => {
    zip.file(jpeg.name, jpeg);
  });
  const zipURL = zip.generateAsync({ type: "blob" }).then((blob) => {
    saveAs(blob, "hello.zip");
  });
}

export default zip;
