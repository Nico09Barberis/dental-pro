import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://dentalpro-frontend.vercel.app",
  "https://dental-pro-five.vercel.app",
  "https://dental-pro.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir peticiones sin 'origin' (como curl o Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
  })
);



app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando"); 
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB:", err));

