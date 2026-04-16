import { useEffect, useState } from "react";
import { getFiles, deleteFile, uploadFile } from "../services/fileService.js";

const useUserFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);

  // ---------------- Fetch Files ----------------
  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getFiles();
      setFiles(data);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Upload File ----------------
  const handleUpload = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      const data = await uploadFile(formData);

      setFiles((prev) => [data.file, ...prev]);
      setSuccess(data.message);

    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Delete File ----------------
  const handleDelete = async (id, code) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      await deleteFile(id, code);

      setFiles((prev) => prev.filter((file) => file._id !== id));
      setSuccess("File deleted successfully");

    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Auto Clear Messages ----------------
  useEffect(() => {
    if (!success && !error) return;

    const timer = setTimeout(() => {
      setSuccess("");
      setError(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [success, error]);

  // ---------------- Initial Load ----------------
  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    loading,
    success,
    error,
    upload: handleUpload,
    deleteFile: handleDelete,
    fetchFiles,
  };
};

export default useUserFiles;