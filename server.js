// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

const data = require("../db/db.json");



// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"./public")));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});