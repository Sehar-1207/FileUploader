import React, { useState } from "react";
import { FileText, Download, Trash } from "lucide-react";
import formatFileSize from "../utils/formatFileSize.js";

const FileCard = ({ file, openModal }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const threshold = 12;

  // Safety guard (prevents runtime crashes)
  if (!file) return null;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: y * -threshold,
      y: x * threshold,
    });
  };

  // Safe download URL (prevents invalid DOMException)
  const downloadUrl = file?._id
    ? `http://localhost:5000/api/files/download/${encodeURIComponent(file._id)}`
    : "#";

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="
        group
        bg-white/80 backdrop-blur-sm
        border border-gray-200
        rounded-2xl
        shadow-md hover:shadow-xl
        transition-all duration-300
        cursor-pointer
        mb-3
        hover:-translate-y-1
      "
    >
      <div className="flex items-center justify-between px-5 py-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <div className="
            bg-gradient-to-br from-blue-50 to-blue-100
            p-3 rounded-xl
            group-hover:scale-110
            transition
          ">
            <FileText
              size={20}
              className="text-blue-600"
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-black transition">
              {file.fileName || "Unnamed File"}
            </h3>

            <p className="text-xs text-gray-400 mt-0.5">
              {formatFileSize(file.fileSize || 0)}
            </p>
          </div>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400 hidden md:block">
          {file.createdAt
            ? new Date(file.createdAt).toLocaleString()
            : "Unknown date"}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Download */}
          <a
            href={downloadUrl}
            className="
              p-2.5 rounded-xl
              text-gray-400
              hover:bg-blue-50
              hover:text-blue-600
              transition
            "
          >
            <Download size={17} strokeWidth={1.8} />
          </a>

          {/* Delete */}
          <button
            onClick={() => file?._id && openModal(file._id)}
            className="
              p-2.5 rounded-xl
              text-gray-400
              hover:bg-red-50
              hover:text-red-500
              transition
            "
          >
            <Trash size={17} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;