import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDb from "./config/db.js";


const Port = process.env.PORT ||5001;
connectDb();

app.listen(Port,()=>{
 console.log(`Server is running on port http://localhost:${Port}`);
});