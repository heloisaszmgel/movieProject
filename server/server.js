const express = require("express")
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
    
require('dotenv').config()
require("./config/mongoose.config")
    
app.use(express.json(), express.urlencoded({ extended: true }))
app.use(cors({credentials:true, origin:'http://localhost:5173'}))
app.use(cookieParser())
    
const userRoutes = require("./routes/user.routes")
userRoutes(app)
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"))

// const express = require("express");
// const cors = require('cors')
// const cookieParser = require('cookie-parser')

// const app = express();

// require('dotenv').config()
// require("./config/mongoose.config")

// app.use(express.json(), express.urlencoded({ extended: true }))
// app.use(cors({credentials:true, origin:'http://localhost:5173'}))
// app.use(cookieParser())

// // Import routes for both servers
// const userRoutes = require("./routes/user.routes")
// const movieRoutes = require("./routes/movie.routes")

// // Attach routes to the main app
// app.use("/users", userRoutes)
// app.use("/movies", movieRoutes)

// app.listen(8000, () => console.log("The server is all fired up on port 8000"))