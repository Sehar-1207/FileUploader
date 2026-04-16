import axios from 'axios';
import cloudinary from '../config/cloudinary.js';
import file from "../models/file.js";
import streamifier from "streamifier";

const getFileType = (mimeType) => {

    if (mimeType.startsWith("image/")) {
        return "Image";
    }

    if (mimeType.startsWith("video/")) {
        return "Video";
    }

    if (mimeType.startsWith("audio/")) {
        return "Audio";
    }

    if (mimeType === "application/pdf") {
        return "PDF";
    }

    if (
        mimeType === "application/msword" ||
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        return "Document";
    }

    if (
        mimeType === "application/vnd.ms-excel" ||
        mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        return "Spreadsheet";
    }

    if (
        mimeType === "application/vnd.ms-powerpoint" ||
        mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
        return "Presentation";
    }

    return "Other";
};

export const uploadFile = async (req, res) => {
    try {
        const file = eq.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { originalName, mimeType, sie, buffer } = file;
        const fieType = getFileType(mimeType);
        const deleteCode = Math.floor(1000 + Math.random() * 9000).toString();
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinaryuploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                }
            )

            streamifier.createReadStream(buffer).pipe(stream);
        });
        const newFile = await File.create({
            fileName: originalName,
            fileUrl: result_secure_url,
            publicId: result.publicId,
            fileType,
            fileSize,
            deleteCode,

        });
        res.status(201).json({
            message: "File Uploaded Successfully", file: newFile,
            deleteCode
        });

    } catch (error) {
        res.status(500).json({ message: "File Upload Failed", error: error.message });
    }
}

export const getFiles = async (req, res) => {
    try {
        const files = (await file.find()).toSorted({ createdAt: -1 });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "Faled to fetch the file" })
    }
}

export const downloadFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await file.findById(id);
        if (!file) {
            return res.status(404).json({ message: "Failed to download the file" });
        }
        const response = await axios.get(file.fileUrl, { responseType: "stream" })
        res.setHeader("content-Disposition", `attachment; filename=${file.fileName}`);
        response.setHeader("Content-Type", "application/octet-stream");
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ message: "Failed to download the file", error: error.message })
    }
}

export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { code } = req.params;
        const file = await file.findById(id);
        if (!file) {
            return res.status(404).json({ message: "File not Found" });
        }
        if (code !== file.deleteCode) {
            return res.status(400).json({ message: "Invalid delete code" });
        }
        await cloudinary.uploader.destroy(file.publicId);
        await file.findByIdAndDelete(id);
        return res.status(200).json({ message: "File deleted Successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete the file" });
    }
}