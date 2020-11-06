// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const data = require("./db/db.json");



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"./public")));

//sends user to notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//sends user to home page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//GET Requests
app.get("/api/notes", function(req,res){
    res.json(data);
});

//POST Requests
app.post("/api/notes", function(req, res) {
    let id = data[data.length-1].id;
    let newNote = req.body;
    newNote["id"] = id + 1;
    data.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2));
    res.json(data);
});

//DELETE Requests
app.delete("/api/notes/:id", function(req, res) {

    const noteID = parseInt(req.params.id);

    for(let i = 0; i < data.length; i++) {
        if(noteID = data[i].id) {
            data.splice(i, 1);
            fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2));
        }
    };

    res.json(data);
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});