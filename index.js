const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const playlistRoute = require("./routes/PlaylistRoute");

const app = express();
const {MONGO_URL,PORT} = process.env;

app.use(
    cors({
        origin: ["https://spotify-backend-9b49.onrender.com","https://spotify-clone-mern.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
       credentials: true,
    })
);

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then(()=> console.log("MongoDB is connected succesfully"))
 .catch((err)=>console.error(err))
 
app.listen(PORT,() => {
    console.log(`server is listening on port ${PORT}`);
});



app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute)
app.use("/playlist", playlistRoute)