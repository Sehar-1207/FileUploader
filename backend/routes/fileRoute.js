import express from "express";
import { uploadFile, getFiles, downloadFile, deleteFile} from "../controller/fileController.js";
import upload from "../middleware/middleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/download/:id", downloadFile);
router.delete("/delete/:id", deleteFile);

export default router;