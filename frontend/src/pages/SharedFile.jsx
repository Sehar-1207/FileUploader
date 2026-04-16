import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedFile } from "../services/fileService";

const SharedFile = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await getSharedFile(id);
        setFile(res.data);
      } catch (err) {
        setError("File not found");
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="animate-pulse text-gray-500">Loading preview...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500 font-medium">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-10">
      {/* Header Container */}
      <div className="w-full max-w-5xl mb-6">
        <h2 className="text-2xl font-bold text-gray-800 truncate border-b pb-4">
          {file.fileName}
        </h2>
      </div>

      {/* Preview Container */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center p-2 md:p-4">
        
        {/* IMAGE: Responsive and Centered */}
        {file.fileType === "image" && (
          <div className="w-full flex justify-center bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={file.fileUrl}
              alt={file.fileName}
              className="max-w-full max-h-[70vh] object-contain transition-transform duration-300"
            />
          </div>
        )}

        {/* VIDEO: Properly Framed */}
        {file.fileType === "video" && (
          <div className="w-full flex justify-center bg-black rounded-lg">
            <video controls className="w-full max-h-[80vh] focus:outline-none">
              <source src={file.fileUrl} />
            </video>
          </div>
        )}

        {/* AUDIO: Centered Player */}
        {file.fileType === "audio" && (
          <div className="w-full py-20 flex justify-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-dashed border-gray-300">
            <audio controls className="w-3/4 max-w-xl">
              <source src={file.fileUrl} />
            </audio>
          </div>
        )}

        {/* PDF + DOCS: Full Width Preview */}
        {["pdf", "document", "spreadsheet", "presentation", "other"].includes(file.fileType) && (
          <div className="w-full h-[75vh] md:h-[85vh]">
            <iframe
              src={`https://docs.google.com/gview?url=${file.fileUrl}&embedded=true`}
              className="w-full h-full border-none rounded-lg"
              title="preview"
            />
          </div>
        )}
      </div>

      {/* Optional: Footer details */}
      <p className="mt-4 text-gray-400 text-sm">
        Viewing as a shared resource • {file.fileType.toUpperCase()}
      </p>
    </div>
  );
};

export default SharedFile;