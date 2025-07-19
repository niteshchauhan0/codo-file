const express = require("express");
const router = express.Router();
const { generatefile } = require("./generatefile"); // fixed name
const { executepy } = require("./executepy");

router.post("/runpy", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const filepath = await generatefile("py", code);
    const output = await executepy(filepath);
    res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;
