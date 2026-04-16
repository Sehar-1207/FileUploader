import express from "express";
import {
  uploadFile,
  getFiles,
  downloadFile,
  deleteFile,
} from "../controller/fileController.js";

import upload from "../middleware/middleware.js";

const router = express.Router();

// Upload file
router.post("/upload", upload.single("file"), uploadFile);

// Get all files
router.get("/", getFiles);

// Download file
router.get("/download/:id", downloadFile);

// Delete file (FIXED)
router.delete("/:id/:code", deleteFile);

export default router;