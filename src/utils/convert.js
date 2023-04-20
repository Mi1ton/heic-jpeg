import heic2any from "heic2any";

async function convert(heics) {
  const start = performance.now();
  const fileList = Array.from(heics);
  // Create array of promises
  const promises = fileList.map((heic) => {
    return heic2any({
      blob: heic,
      toType: "image/jpeg",
      quality: 80,
    });
  });

  // Work on array of settled promises
  const jpegFiles = await Promise.allSettled(promises).then((results) => {
    return results.map((result, index) => {
      const jpegBlob = result.value;
      const name = fileList[index].name.toLowerCase().replace(/heic$/, "jpg");
      const jpegFile = new File([jpegBlob], name);
      return jpegFile;
    });
  });
  const end = performance.now();
  const totalTime = (end - start) / 1000;
  const timePerImage = totalTime / jpegFiles.length;
  console.log(`time elapsed: ${totalTime}`);
  console.log(`time per image: ${timePerImage}`);
  return jpegFiles;
}

export default convert;
