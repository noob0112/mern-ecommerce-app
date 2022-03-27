const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const route = require("./routes/");
const connectDB = require("./db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();

connectDB(process.env.MONGO_URL);
const PORT = process.env.PORT || 5000

route(app)

app.listen(PORT, function(){
    console.log(`Server is starting on port: ${PORT}`)
})