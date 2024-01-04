import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from './routes/api/contacts.js';

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use("/api/users/register", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {mongoose
  res.status(err.status).json({ message: err.message });
});

export default app;