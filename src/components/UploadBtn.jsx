function UploadBtn({ onChange }) {
  return (
    // <button className="btn btn-primary">
    <label htmlFor="upload-button" className="btn btn-success">
      Upload images
      <input
        type="file"
        accept="image/heic"
        multiple
        id="upload-button"
        style={{ display: "none" }}
        onChange={onChange}
      />
    </label>
    // </button>
  );
}

export default UploadBtn;
