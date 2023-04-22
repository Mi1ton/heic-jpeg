function Gallery({ jpegs, displaySpinner }) {
  return (
    <div
      className="border border-dark-subtle border-4 rounded-4 bg-body-secondary p-3 overflow-scroll"
      style={{ height: "90vh" }}>
      {displaySpinner ? (
        <Spinner />
      ) : (
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {jpegs.map((jpeg, index) => {
            return <Img jpeg={jpeg} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status"></div>
    </div>
  );
}

function Img({ jpeg }) {
  const jpegURL = URL.createObjectURL(jpeg);
  return (
    <div className="col">
      <div style={{ position: "relative" }}>
        <a href={jpegURL} download={jpeg.name}>
          <img
            className="rounded-3 shadow img-fluid border border-secondary border-2"
            src={jpegURL}
            alt="Preview of a converted image"></img>
          <i
            className="bi-download"
            style={{
              position: "absolute",
              bottom: ".1rem",
              right: ".5rem",
              fontSize: "1.2rem",
              color: "white",
              textShadow: "0 0 3px black",
            }}></i>
        </a>
      </div>
    </div>
  );
}

export default Gallery;
