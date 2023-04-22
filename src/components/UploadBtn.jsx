function UploadBtn({ onChange }) {
  return (
    <label htmlFor="upload-button" className="btn btn-success">
      Upload images
      <input
        type="file"
        accept="image/heic,image/heif"
        multiple
        id="upload-button"
        style={{ display: "none" }}
        onChange={onChange}
      />
    </label>
  );
}

export default UploadBtn;
