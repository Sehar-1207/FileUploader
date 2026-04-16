import axios from 'axios';
const API = "https://localhost:5000/api/files";
export const uploadFle = async (formdata) => {
    const res = await axios.post(`${API}/upload`, formdata, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
}
export const getFiles = async () => {
    const res = await axios.get(API);
    return res.data;
}

export const deleteFile = async (id, code) => {
    const res = await axios.delete(`${API}/${id}`, {
        data: { code },
    });
    return res.data;
}