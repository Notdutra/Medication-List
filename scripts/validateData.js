const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../src/data/medications.json");

try {
  const raw = fs.readFileSync(dataPath, "utf8");
  const obj = JSON.parse(raw);
  fs.writeFileSync(dataPath, JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log("medications.json validated and formatted.");
} catch (err) {
  console.error("Error validating meds JSON:", err.message || err);
  process.exit(1);
}
