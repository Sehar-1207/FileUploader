import mongoose from "mongoose";
const fileSchema = new mongoose.Schema({
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
    type:String,
    required:true,
  },
  fileType:{
    type:String,
    required:true,
      enum: [
    "image",
    "pdf",
    "document",
    "audio",
    "video",
    "spreadsheet",
    "presentation",
    "other"
  ]
  },
  fileSize:{
    type:String,
    required:true,
  },
  deleteCode:{
    type:String,
    required:true,
  }
},
  {
    timestamps:true,
  }

);

const file = mongoose.models.file || mongoose.model("file", fileSchema);
export default file;