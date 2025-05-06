// server/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

//Import routes
import loginRouter from "./routes/login.js";
import updMessRouter from "./routes/updatemessages.js";
import uploadRouter from "./routes/upload.js";
import loadFileRouter from "./routes/load_file.js";
import miscRouter from "./routes/misc.js";
import signupRouter from "./routes/signup.js";
import loadChatsRouter from "./routes/load_chats.js";
import deleteMessageRouter from "./routes/delete_message.js";

// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow React to communicate with Node
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data (text fields in form)

app.use(
  loginRouter, // (/login)
  signupRouter, // (/signup)
  loadChatsRouter, //(/load_chats)
  updMessRouter, // (/updatemessages)
  deleteMessageRouter, //(/delete_messages)
  uploadRouter, // (/upload, /upload_id)
  loadFileRouter, // (/load_file)
  miscRouter // (/users)
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all route to serve React's index.html for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
