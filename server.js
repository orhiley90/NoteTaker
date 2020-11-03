const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFilAsync = util.promisify(fs.readFile);
let notes;

const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));



app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(JSON.parse(data));
});



// adds notes to the notes
app.post("/api/notes", function (req, res) {
    const addNote = req.body;
    fs.readFileAsync(path.join(__dirname, ".db.db.json"), "utf8")
        .then(function (data) {
            notes = JSON.parse(data);
            if (addNote.id) {
                let currentNotes = notes[addNote.id];
                currentNotes.title = notes.title;
                currentNotes.text = notes.text;

            }
            fs.writeFileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes))
                .then(function () {
                    console.log("Note added to db.json");
                })


        })
    res.json(addNote);
})
// deletes notes from the database

app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
    fs.readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            notes = JSON.parse(data);
            notes.splice(id, 1);
            fs.writeFileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes))
                .then(function () {
                    console.log("Deleted db.json");

                })
            res.json(id);
        })
})


app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});