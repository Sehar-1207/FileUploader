import axios from "axios";
const API = "http://localhost:5000/api/files";

export const getSharedFile = (id) =>
  axios.get(`http://localhost:5000/api/files/share/${id}`);

// -------------------------
// Upload File
// -------------------------
export const uploadFile = async (formdata) => {
  try {
    const res = await axios.post(`${API}/upload`, formdata);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// -------------------------
// Get All Files
// -------------------------
export const getFiles = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// -------------------------
// Delete File
// Backend expects: /api/files/:id/:code
// -------------------------
export const deleteFile = async (id, code) => {
  try {
    const res = await axios.delete(`${API}/${id}/${code}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};