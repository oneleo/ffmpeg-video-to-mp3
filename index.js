const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const inputFolder = "/path/to/your/folder";
const outputFolder = "/path/to/output/folder";

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error("Unable to read directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(inputFolder, file);
    const ext = path.extname(file).toLowerCase();

    if ([".mp4", ".avi", ".mkv", ".webm"].includes(ext)) {
      const outputFile = path.join(
        outputFolder,
        path.basename(file, ext) + ".mp3"
      );

      ffmpeg(filePath)
        .noVideo()
        .audioCodec("libmp3lame")
        .save(outputFile)
        .on("end", () => {
          console.log(`Converted ${file} to MP3.`);
        })
        .on("error", (err) => {
          console.error(`Error converting ${file}:`, err);
        });
    }
  });
});
