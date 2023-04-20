function Img({ jpeg }) {
  const jpegURL = URL.createObjectURL(jpeg);
  return (
    <div className="col">
      <a href={jpegURL} download>
        <img
          className="rounded-3 shadow img-fluid"
          src={jpegURL}
          alt="Preview of a converted image"></img>
      </a>
    </div>
  );
}

export default Img;
