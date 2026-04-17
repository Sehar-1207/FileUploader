# FileUploader

![GitHub stars](https://img.shields.io/github/stars/Sehar-1207/FileUploader?style=for-the-badge&logo=github)
![GitHub forks](https://img.shields.io/github/forks/Sehar-1207/FileUploader?style=for-the-badge&logo=github)
![GitHub issues](https://img.shields.io/github/issues/Sehar-1207/FileUploader?style=for-the-badge&logo=github)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)

A full-stack MERN-based file management application that enables users to upload, manage, preview, and share files including images, videos, audio, and documents using Cloudinary cloud storage.

---

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

FileUploader is designed to simplify digital asset management through a clean user interface and scalable backend architecture.

The application allows users to:

- Upload images, videos, audio files, and documents
- Store files securely in Cloudinary
- Save file metadata in MongoDB
- Preview uploaded files
- Delete unwanted files
- Share files through generated links

---

## ✨ Features

- 📤 Upload multiple file types
- ☁️ Cloud-based storage using Cloudinary
- 🗂️ File metadata management with MongoDB
- 🔍 Preview files directly in the application
- 🗑️ Delete files with confirmation modal
- 🔗 Generate and access shareable links
- ⚡ Fast and responsive frontend built with React + Vite
- 📱 Mobile-friendly and responsive layout

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Cloudinary

---

## 📁 Project Structure

```text
.
├── backend
│   ├── app.js
│   ├── server.js
│   ├── config
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controller
│   │   └── fileController.js
│   ├── middleware
│   │   └── middleware.js
│   ├── models
│   │   └── file.js
│   ├── routes
│   │   └── fileRoute.js
│   ├── package.json
│   └── .env
│
└── frontend
    ├── src
    │   ├── components
    │   │   ├── UploadBox.jsx
    │   │   ├── FileCard.jsx
    │   │   └── DeleteModal.jsx
    │   ├── pages
    │   │   ├── Home.jsx
    │   │   └── SharedFile.jsx
    │   ├── services
    │   │   └── fileService.js
    │   ├── hooks
    │   │   └── userFile.js
    │   ├── utils
    │   │   └── formatFileSize.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```
---

## ⚙️ Installation
bash
# Clone the repository
git clone https://github.com/Sehar-1207/FileUploader.git

# Install dependencies
npm install

# Start development server
npm run start

## 📦 Key Dependencies
axios: ^1.15.0
cloudinary: ^2.9.0
cors: ^2.8.6
dotenv: ^17.4.2
express: ^5.2.1
mongoose: ^9.4.1
multer: ^2.1.1
streamifier: ^0.1.1
uuid: ^13.0.0

## 🚀 Run Commands 
- **test**: npm run test
- **start**: npm run start
- **dev**: npm run dev
---

## 📸 Screenshots
<p align="center"> <img src="https://via.placeholder.com/800x400?text=Main+Application+View" alt="Main Application View" width="80%"/> </p> 
<p align="center"> <img src="https://via.placeholder.com/800x400?text=Feature+Showcase" alt="Feature Showcase" width="80%"/> </p>

---

## 👥 Contributing
Contributions are welcome! Here's how you can help:
1. **Fork** the repository.
2. **Clone** your fork: git clone https://github.com/Sehar-1207/FileUploader.git.
3. **Create** a new branch: git checkout -b feature/your-feature.
4. **Commit** your changes: git commit -am 'Add some feature'
5. **Push** to your branch: git push origin feature/your-feature.
6. **Open** a pull request Please ensure your code follows the project's style guidelines and includes tests where applicable.

---

## 📜 License
This project is licensed under the ISC License.
