const CrudRoutes = (app) => {
    app.get("/products", (req, res) => {
        res.send("GET method");
    });

    app.post("/products", (req, res) => {
        console.log(req.body);
        res.send("POST method");
    });

    app.put("/products", (req, res) => {
        res.send("PUT method");
    });

    app.patch("/products", (req, res) => {
        res.send("PATCH method");
    });

    app.delete("/products", (req, res) => {
        res.send("DELETE method");
    });
}

module.exports = CrudRoutes;
