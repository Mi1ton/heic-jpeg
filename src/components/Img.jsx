import * as bootstrap from "bootstrap";

function Img({ jpegURL}) {
  return (
    <div className="col">
      <img
        className="rounded-3 shadow img-fluid"
        src={jpegURL}
        alt="Preview of a converted image"></img>
    </div>
  );
}

export default Img;
