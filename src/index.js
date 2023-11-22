const express = require("express");
const path = require("path");
require("ejs");
// now we can do res.render("html-view");

const app = express();
const PORT = 3000;

// how to handle incoming body content
app.use(express.text()); // understand text
app.use(express.json()); // understand json
app.use(express.urlencoded({extended: false})); // understand form

// static files
// "static" prefix, now you access static files using
// /prefix/fileame.extension
// try localhost:3000/static/ or +index.html
app.use("/static", express.static("./static"));

// if the static/public folder is inside an src folder
// we have to concatenate the path with it
// in my case idk why but the last configuration worked without path.join
// app.use("/static", app.static(path.join(__dirname, "static")));

// ejs settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set and get values
app.set("PORT", 3000);
console.log("PORT: ", app.get("PORT"));

// case sensitive routes
app.set("case sensitive routing", true);

// This view is not affected by first_middleware middleware
app.get("/profile", (req, res) => {
    res.end("Profile route");
});

// This view is not affected by middleware
app.get("/about", (req, res) => {
    res.end("About route");
});

// Middleware
// first middleware
app.use((req, res, next) => {
    console.log(req.params);
    console.log(req.query);
    console.log(`Route: ${req.url} with method ${req.method}`);
    next(); // to the next middleware
});

// Middleare functions are executed in order, like a stack
// second middleware
app.use((req, res, next) => {
    console.log("authenticator middleware");
    next(); // to the next view/s. Or middleware if there is another one defined below
});

// first and not recommended way to import routes
const CrudRoutes = require("./routes/crud");
CrudRoutes(app);

// second and recommended way to import routes
const HomeRouter = require("./routes/home");
app.use(HomeRouter);

app.get("/template", (req, res) => {
    const content = "hello world from node";
    res.render("index", {content: content});
});

// If there is no route that match the user request, the below will be loaded
// not existing route return 404 by default, with the next change
// server returns 200
app.use((req, res) => {
    res.status(404).send("Oh, you get lost, take a break, try with another route");
});

app.listen(PORT);
console.log("server listening on port " + PORT);
