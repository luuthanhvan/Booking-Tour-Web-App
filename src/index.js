const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOSTNAME;


const app = express();
// console.log(app);

app.listen(PORT, () => console.log(`Server running at http://${HOST}:${PORT}`));