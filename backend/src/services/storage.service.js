import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

let client = null;
if (config.IMAGEKIT_PRIVATE_KEY) {
  try {
    client = new ImageKit({
      privateKey: config.IMAGEKIT_PRIVATE_KEY
    });
  } catch (err) {
    console.error("ImageKit init error:", err.message);
  }
}

export async function uploadFile({ buffer, fileName, folder = "snitch", mimeType = "image/jpeg" }) {
  if (client && buffer) {
    try {
      const base64Str = buffer.toString("base64");
      const result = await client.files.upload({
        file: base64Str,
        fileName: fileName || "image.jpg",
        folder
      });
      if (result && result.url) {
        return result;
      }
    } catch (error) {
      console.warn("ImageKit upload failed, using Data URI fallback:", error.message || error);
    }
  }

  // Fallback to data URI format if ImageKit upload fails or is unconfigured
  const dataUri = `data:${mimeType || "image/jpeg"};base64,${buffer.toString("base64")}`;
  return {
    url: dataUri,
    name: fileName
  };
}