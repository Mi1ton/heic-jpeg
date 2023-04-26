import heic2any from "heic2any";
// import EXIF from "exif-js-heic";
// import * as piexif from "piexifjs";

async function convert(fileArray) {
  // Extracting EXIF
  // let file0EXIF = null;
  // const file = fileArray[0];
  // EXIF.getData(file, function () {
  //   file0EXIF = EXIF.getAllTags(this);
  // });
  // console.log(file0EXIF);

  // Create array of promises
  const promises = fileArray.map((heic) => {
    return heic2any({
      blob: heic,
      toType: "image/jpeg",
      quality: 0.8,
    });
  });

  // Work on array of settled promises
  const jpegFiles = await Promise.allSettled(promises).then((results) => {
    return results.map((result, index) => {
      const jpegBlob = result.value;
      const name = fileArray[index].name
        .toLowerCase()
        .replace(/heic$|heif$/, "jpg");
      const jpegFile = new File([jpegBlob], name);
      return jpegFile;
    });
  });
  return jpegFiles;
}

export default convert;
