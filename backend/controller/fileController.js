import axios from "axios";
import cloudinary from "../config/cloudinary.js";
import File from "../models/file.js";
import streamifier from "streamifier";
import { v4 as uuidv4 } from "uuid";

// -------------------------
// Helper: detect file type
// -------------------------
const getFileType = (mimeType) => {
  if (!mimeType) return "Other";

  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType.startsWith("video/")) return "Video";
  if (mimeType.startsWith("audio/")) return "Audio";

  if (mimeType === "application/pdf") return "PDF";

  if (
    mimeType === "application/msword" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "Document";
  }

  if (
    mimeType === "application/vnd.ms-excel" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "Spreadsheet";
  }

  if (
    mimeType === "application/vnd.ms-powerpoint" ||
    mimeType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  ) {
    return "Presentation";
  }

  return "Other";
};

// -------------------------
// Upload File
// -------------------------
export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, size, buffer } = file;

    const fileType = getFileType(mimetype).toLowerCase();
    const deleteCode = Math.floor(1000 + Math.random() * 9000).toString();

    // dynamic resource type
    const resourceType =
      mimetype.startsWith("image/")
        ? "image"
        : mimetype.startsWith("video/")
        ? "video"
        : mimetype.startsWith("audio/")
        ? "video"
        : "raw";

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          type: "upload",
          access_mode: "public",
          use_filename: true,
          unique_filename: false
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });

    if (!result || !result.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    const newFile = await File.create({
      fileName: originalname,
      fileUrl: result.secure_url,
      shareId: uuidv4(),
      publicId: result.public_id,
      fileType,
      fileSize: Number(size),
      deleteCode,
    });

    return res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
      deleteCode,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    return res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};

// -------------------------
// Get Files
// -------------------------
export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch files",
      error: error.message,
    });
  }
};

// -------------------------
// Download File
// -------------------------
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const response = await axios.get(file.fileUrl, {
      responseType: "stream",
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.fileName}"`
    );

    res.setHeader("Content-Type", "application/octet-stream");

    response.data.pipe(res);

  } catch (error) {
    res.status(500).json({
      message: "Failed to download file",
      error: error.message,
    });
  }
};

// -------------------------
// Delete File
// -------------------------
export const deleteFile = async (req, res) => {
  try {
    const { id, code } = req.params;

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (code !== file.deleteCode) {
      return res.status(400).json({ message: "Invalid delete code" });
    }

    await cloudinary.uploader.destroy(file.publicId);
    await File.findByIdAndDelete(id);

    res.status(200).json({ message: "File deleted successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

// -------------------------
// Publically share File
// -------------------------
export const getSharedFile = async (req, res) => {
  try {
    const file = await File.findOne({ shareId: req.params.id });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.json(file);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};