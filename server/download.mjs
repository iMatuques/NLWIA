import ytdl from 'ytdl-core';
import fs from 'fs';

export const downloadVideo = (videoId) => new Promise((resolve, reject) =>  {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando download:", videoId);

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("A duração desse vídeo desse vídeo é maior que 60 segundos")
      }
    }
    ).on("end", () => {
      console.log("Download do vídeo finalizado.")
      resolve()
    })
    .on("error", (error) => {
      console.log("Não foi possível fazer o download do vídeo.", error)
      reject(error)

    }).pipe(fs.createWriteStream('tmp/audio.mp4'))

})
