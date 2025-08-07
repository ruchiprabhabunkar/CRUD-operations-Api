

const express = require("express");
const router = express.Router();
const {CreateBook}=require("./index")

router.post("/create",CreateBook)

module.exports = router;