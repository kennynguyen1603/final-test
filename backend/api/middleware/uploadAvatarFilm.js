import cloudinary from "../config/cloudinary.js";
const uploadAvatarFilm = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: "Image is required" });
  }

  const { buffer, mimetype } = req.file;
  const dataUrl = `data:${mimetype};base64,${buffer.toString("base64")}`;

  try {
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "Images",
      resource_type: "image",
    });

    req.body.imageThumbnail = result.secure_url;
    next();
  } catch (error) {
    res.status(500).send({ message: "Failed to upload avatar", error });
  }
};

export default uploadAvatarFilm;
