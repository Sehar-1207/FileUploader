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

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 
                      flex flex-col items-center justify-center 
                      text-center bg-gray-50 hover:bg-gray-100 
                      transition-all duration-200">

        <FolderUp className="w-12 h-12 text-gray-500 mb-3" />

        <p className="text-sm text-gray-600">
          Maximum file size is 100MB
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Supported formats: PNG, PDF, JPG, JPEG, DOCS
        </p>

        <label className="cursor-pointer bg-black text-white px-5 py-2.5 
                          rounded-lg text-sm font-medium 
                          hover:bg-gray-800 transition">
          Select Files
          <input 
            type="file" 
            onChange={handleChange} 
            hidden
          />
        </label>

      </div>
    </div>
  )
}

export default UploadBox