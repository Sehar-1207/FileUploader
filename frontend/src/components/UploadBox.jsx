import React from 'react'
import { FolderUp } from "lucide-react"

const UploadBox = ({ onUpload }) => {

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formdata = new FormData();
    formdata.append("file", file);
    onUpload(formdata);
  }

  return (
    <div className="w-full max-w-xl mx-auto">

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upload your file
      </h2>

      <div
        className="p-6 bg-white border border-gray-200 rounded-lg shadow shadow-black/10"
      >

        <div className="flex flex-col items-center text-center">

          <div className="bg-indigo-50 p-4 rounded-xl mb-4">
            <FolderUp className="w-12 h-12 text-indigo-600" />
          </div>

          <p className="text-gray-900 text-lg font-semibold">
            Maximum file size is 100MB
          </p>

          <p className="text-zinc-400 text-sm mt-2 mb-4">
            Supported formats: PNG, PDF, JPG, JPEG, DOCS
          </p>

          <label className="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer px-6 py-2 font-medium rounded-md text-white text-sm">
            Select Files
            <input
              type="file"
              onChange={handleChange}
              hidden
            />
          </label>

        </div>

      </div>
    </div>
  )
}

export default UploadBox