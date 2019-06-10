require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const bodyParser = require("body-parser");
const logger = require("morgan");

const port = process.env.PORT || 3001;

// const passport = require("passport");
// const passportStrategy = require("./config/passport");

const { authRouter: router } = require("./config/routes");

// Login API
// const { login } = require("./app/controllers/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log request to console
app.use(logger("dev"));

// Add headers
const allowedOrigins = [
    "localhost:3030",
    "http://localhost:3030",
    "http://127.0.0.1:3030",
    "https://peakbag-server.herokuapp.com"
];

app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Origin",
        req.headers.origin || "https://peakbag-server.herokuapp.com"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,XMLHttpRequest,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

// append /api for our http requests
app.get("/", (req, res) => res.send("Peekbag backend is up and running!!!"));

// app.use("/api", passport.authenticate("jwt", { session: false }), router);
app.use("/api", router);

// launch our backend into a port
http.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
