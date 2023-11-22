// const express = require("express");
const { Router } = require("express");
const path = require("path");

// const router = express.Router();
const router = Router();


// This view is not affected by middleware
router.get("/about", (req, res) => {
    res.end("About route");
});

/*
router.get("/file", (req, res) => {
    res.sendFile("./public/index.html", {
        root: __dirname
    });
});
*/

router.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/hello", (req, res) => {
    res.end("Hello world");
});

router.get("/", (req, res) => {
    res.end("Root route");
});

router.get("/weather", (req, res) => {
    res.end("Information about today's weather");
});

const cat = {
    name: "Cat",
    age: 1.2,
    color: "brown"
}

router.get("/cat", (req, res) => {
    res.json(cat);
});

// params
router.get("/user/:name", (req, res) => {
    console.log(req.params);
});

// Query
router.get("/user", (req, res) => {
    // console.log(req.query);
    if(req.query.page)
        res.send(`page ${req.query.page}`);
    else res.send("no page query defined");
});

module.exports = router;
