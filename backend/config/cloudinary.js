import dotenv from "dotenv";
dotenv.config();

import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
cloudName:process.env.CLOUD_NAME,
apiKey:process.env.AAPI_KEY,
apiSecret:process.env.API_SECRET
});

export default cloudinary;