import { useState } from 'react'
import UploadBox from '../components/UploadBox';
import FileCard from '../components/FileCard';
import DeleteModal from '../components/DeleteModal';
import useUserFile from '../hooks/userFile'

const Home = () => {
  const { files, upload, deleteFile, loading, error, success } = useUserFile();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const handleDeleteConfirm = (code) => {
    deleteFile(selectedId, code);
  };

  return (
    <div className="min-h-screen bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient.png')] bg-cover bg-center py-8 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Upload Box */}
        <UploadBox onUpload={upload} />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center my-6">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-600 text-sm text-center my-2">
            {success}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center my-2">
            {error}
          </p>
        )}

        {/* Recent Files */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Files
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Overview of every files or documents that you have stored
          </p>

          {files.length === 0 ? (
            <div className="text-center py-14 text-gray-400 text-sm">
              No files uploaded yet
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {files.map((file) => (
                <FileCard
                  key={file._id}
                  file={file}
                  openModal={openModal}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <DeleteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

      </div>
    </div>
  )
}

export default Home