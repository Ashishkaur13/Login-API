const express = require("express");
const { getNotes, createNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.get("/", auth ,getNotes);

noteRouter.post("/", auth ,createNote);

module.exports = noteRouter;