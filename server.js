import express from "express";
import "dotenv/config";
import { addTwoNumbers } from "./mcp.server.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})