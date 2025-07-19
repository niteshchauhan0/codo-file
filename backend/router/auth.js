const express = require('express');
const router = express.Router();
const PORT = process.env.PORT;
const { generatefile } = require('./generatePy');
const { executepy } = require("./executepy");
const { executeDart } = require('./executeDart');
const { generateDartfile } = require('./generateDart');

router.get('/', (req, res) => {
  res.send("Welcome to the Home page from auth.js");
  console.log(`User at URL : localhost:${PORT}${req.url}`);
});

//################ Python Compiler Code ##################
router.use(express.urlencoded({ extended: true }));

router.post('/runpy', async (req, res) => {
  const { language = "py", code = "print('hello python')" } = req.body;

  if (code === "") {
    return res.status(400).json({ success: false, error: "Please Enter Code" });
  }

  try {
    const filepath = await generatefile(language, code);
    const output = await executepy(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    const errorMessage = err.toString();
    const errorPattern = /line \d+\s+([^\n]+)/;
    const match = errorMessage.match(errorPattern);
    const realError = match ? match[0].trim() : "Unknown error occurred";
    res.status(500).json({ error: `Error: ${realError}` });
  }
});

//################ Dart Compiler Code ##################
router.post('/rundart', async (req, res) => {
  const { language = "dart", code = "void main(){print('hello dart');}" } = req.body;

  if (code === "") {
    return res.status(400).json({ success: false, error: "Please Enter Code" });
  }

  try {
    const filepath = await generateDartfile(language, code);
    const output = await executeDart(filepath);
    return res.json({ filepath, output });
  } catch (err) {
    const errorPattern = / Error: ([^\n]+)\n([^\n]+)/;
    const errorMessage = err.toString();
    const match = errorMessage.match(errorPattern);
    const realError = match ? match[0].trim() : "Unknown error occurred";
    res.status(500).json({ error: `Error: ${realError}` });
  }
});

module.exports = router;
