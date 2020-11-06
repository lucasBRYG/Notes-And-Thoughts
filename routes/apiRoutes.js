const path = require("path");

module.exports = function(app) {

    
    //GET Requests
    app.get("/api/notes", function(req,res){
        res.json(JSON.parse(data));
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

};