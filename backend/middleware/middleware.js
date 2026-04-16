import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    // pdf
    "application/pdf",

    // word docs
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // audio
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",

    // video
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-matroska"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});

export default upload;