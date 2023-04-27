import zip from "../utils/zip";

function Navbar({ initConvert, isConverting, jpegs }) {
  return (
    <nav className="navbar justify-content-evenly mt-1 mb-1">
      <UploadBtn initConvert={initConvert} />
      <ZipDownloadBtn zip={zip} isConverting={isConverting} jpegs={jpegs} />
    </nav>
  );
}

function UploadBtn({ initConvert }) {
  return (
    <label
      htmlFor="upload-button"
      className="btn btn-success shadow-elevation-medium">
      Upload images
      <input
        className="d-none"
        type="file"
        accept="image/heic,image/heif"
        multiple
        id="upload-button"
        onChange={async (e) => {
          await initConvert(Array.from(e.target.files));
        }}
      />
    </label>
  );
}

function ZipDownloadBtn({ isConverting, jpegs }) {
  return (
    <button
      className="btn btn-primary shadow-elevation-medium"
      disabled={isConverting || jpegs.length === 0}
      onClick={async () => await zip(jpegs)}>
      Download as zip
    </button>
  );
}

export default Navbar;
