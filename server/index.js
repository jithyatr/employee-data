import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './database/connection.js';
import employeeRoutes from './routes/employeeRouter.js'
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import path from 'path';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

/** HTTP GET request */
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use('/api/employees', employeeRoutes);

connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server connected to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error.message);
    });


