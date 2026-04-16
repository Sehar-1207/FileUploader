import React, { useState } from "react";
import { FileText, Download, Trash } from "lucide-react";
import formatFileSize from "../utils/formatFileSize.js";

const FileCard = ({ file, openModal }) => {
  const [alert, setAlert] = useState(null);

  const handleShare = async (shareId) => {
    if (!shareId) {
      setAlert({ type: "error", message: "Share ID missing!" });
      hideAlert();
      return;
    }
    const link = `${window.location.origin}/share/${shareId}`;
    try {
      await navigator.clipboard.writeText(link);
      setAlert({ type: "success", message: "Link copied to clipboard!" });
    } catch (err) {
      setAlert({ type: "error", message: "Failed to copy link" });
    }
    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <div className="relative">
      {/* ALERT UI */}
      {alert && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white shadow-lg z-50 transition-all ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {alert.message}
        </div>
      )}

      {/* FILE CARD */}
      <div className="rounded-xl shadow-md hover:shadow-lg overflow-hidden bg-white border border-gray-100 mb-3 transition-shadow">
        <div className="flex items-center px-5 py-4">
          
          {/* 1. File Info Section (Left) - Fixed 40% width */}
          <div className="flex items-center gap-3 w-[40%] min-w-0">
            <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
              <FileText size={20} className="text-blue-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {file.fileName}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatFileSize(file.fileSize)}
              </p>
            </div>
          </div>

          {/* 2. Date Section (Center) - Fixed 30% width and centered text */}
          <div className="hidden sm:flex w-[30%] justify-center">
            <p className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(file.createdAt).toLocaleString([], { 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>

          {/* 3. Actions Section (Right) - Fixed 30% width and aligned right */}
          <div className="flex items-center gap-2 w-[30%] justify-end ml-auto">
            {/* Download */}
            <a
              href={`http://localhost:5000/api/files/download/${file._id}`}
              className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition"
              title="Download"
            >
              <Download size={17} />
            </a>

            {/* Delete */}
            <button
              onClick={() => openModal(file._id)}
              className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
              title="Delete"
            >
              <Trash size={17} />
            </button>

            {/* Share */}
            <button
              onClick={() => handleShare(file.shareId)}
              className="ml-1 px-4 py-1.5 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow-sm transition-all active:scale-95"
            >
              Share
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FileCard;