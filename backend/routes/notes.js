const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//Route 1: get all the notes of the logged user : GET '/api/notes/fetchallnotes'. login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

//Route 2: Add a new Note using : POST '/api/notes/addnote'. login required.
router.post(
  "/addnote",
  fetchuser,
  body("title", "Enter a valid Title").isLength({ min: 3 }),
  body("description", "Description should be of length 5").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);


//Route 3: Update a new Note using : PUT '/api/notes/updatenote'. login required.
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
    }
  );


  //Route 4: Delete a new Note using : DELETE '/api/notes/deletenote'. login required.
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        

        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        // Allow Deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"sucess":"Note Has been deleted",note:note});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
    }
  );

module.exports = router;
