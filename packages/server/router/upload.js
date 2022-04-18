const express = require("express");
const axios = require("axios");
const router = express.Router();
const multer = require('multer')
const fs = require('fs')

var upload = multer({ dest: 'public/' })
router.use(upload.any())
router.post("/image",upload.single('file'), (req, res) => {
  console.log(req.files)
  const path = req.files[0].path
  const newFilename = req.files[0].path + '.png'
  fs.rename(path,newFilename,(err)=>{
    console.log(err)
  })
  res.json({url: `192.168.0.103:3000/${newFilename}`}) 
});
module.exports = router;
