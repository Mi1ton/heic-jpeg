import Img from "./Img";
import * as bootstrap from "bootstrap";

function Gallery({ jpegs }) {
  return (
    <div className="row row-cols-4 gx-4 gy-5">
      {jpegs.map((jpeg) => {
        return <Img jpegURL={jpeg.URL} key={jpeg.URL} />;
      })}
    </div>
  );
}

export default Gallery;
