import React from 'react'
import { FileText, Download, Trash } from "lucide-react";
import formatFileSize from "../utils/formatFileSize.js";

const FileCard = ({ file, openModal }) => {

  return (
    <div
      className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer bg-white border border-gray-100 mb-3"
    >
      <div className="flex items-center justify-between px-5 py-4">

        {/* File info */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg">
            <FileText size={20} className="text-blue-500" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {file.fileName}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatFileSize(file.fileSize)}
            </p>
          </div>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400 hidden sm:block">
          {new Date(file.createdAt).toLocaleString()}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`http://localhost:5000/api/files/download/${file._id}`}
            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition"
          >
            <Download size={17} strokeWidth={1.8} />
          </a>
          <button
            onClick={() => openModal(file._id)}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
          >
            <Trash size={17} strokeWidth={1.8} />
          </button>
        </div>

      </div>
    </div>
  )
}

export default FileCard