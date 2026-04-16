import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: [
        "image",
        "pdf",
        "document",
        "audio",
        "video",
        "spreadsheet",
        "presentation",
        "other",
      ],
    },
    fileSize: {
      type: Number,
      required: true,
    },
    deleteCode: {
      type: String,
      required: true,
    },
    shareId: {
      type: String,
      unique: true,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;