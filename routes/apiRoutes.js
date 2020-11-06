const path = require("path");
const fs = require("fs");
let data = require("../db/db.json")

module.exports = function(app) {

    //GET Requests
    app.get("/api/notes", function(req,res){
        res.json(data);
    });
    
    //POST Requests
    app.post("/api/notes", function(req, res) {

        let newNoteId;
        let newNote = req.body;
        if(data.length === 0) {
            newNoteId = 1;
        }else {
            newNoteId = data[data.length-1]["id"] + 1;
        }
        newNote.id = newNoteId;
        data.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(data, null, 2));
        res.json(data);

    });

    //DELETE Requests
    app.delete("/api/notes/:id", function(req, res) {

        const id = parseInt(req.params.id);

        for (let i=0; i < data.length; i++){
            if (id === data[i].id) { // Finding the note to be deleted.
                data.splice(i,1);
                let newContent = JSON.stringify(data,null,2); 
                fs.writeFileSync("./db/db.json", newContent);
            }
        }
        res.json(data);

    });

};