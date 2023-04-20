import Img from "./Img";

function Gallery({ jpegs }) {
  return (
    <div className="row row-cols-4 gx-4 gy-4">
      {jpegs.map((jpeg, index) => {
        return <Img jpeg={jpeg} key={index} />;
      })}
    </div>
  );
}

export default Gallery;
