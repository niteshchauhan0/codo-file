const { exec } = require("child_process");
const path = require("path");

const executepy = (filepath) => {
  return new Promise((resolve, reject) => {
    const filename = path.basename(filepath);
    const dir = path.dirname(filepath);

    exec(`python ${filename}`, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        console.error("Python execution error:", error);
        return reject(error.message);
      }
      if (stderr) {
        console.error("Python stderr:", stderr);
        return reject(stderr);
      }
      return resolve(stdout);
    });
  });
};

module.exports = { executepy };
