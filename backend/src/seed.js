// Fills the question bank from src/data/questions.js (the same file the frontend bundles as its offline copy)
// and creates/refreshes the public read-only demo admin (see lib/demoAdmin.js).
// Usage: npm run seed            -> inserts only into an empty collection
//        npm run seed -- --reset -> replaces all questions (scores are kept)
const path = require("path");
const { pathToFileURL } = require("url");
const mongoose = require("mongoose");
const config = require("./lib/config");
const { connect } = require("./lib/db");
const { Question } = require("./models");
const { seedDemoAdmin } = require("./lib/demoAdmin");

const BANK = path.join(__dirname, "..", "..", "src", "data", "questions.js");

async function seed({ reset = false } = {}) {
  if (reset) await Question.deleteMany({});
  const out = {};
  if (await Question.estimatedDocumentCount()) out.questions = "skipped (not empty)";
  else {
    const { QUESTIONS } = await import(pathToFileURL(BANK).href);
    const rows = Object.entries(QUESTIONS).flatMap(([category, items]) =>
      items.map((q, i) => ({ qid: q.id, category, a: q.a, az: q.az, en: q.en, order: i }))
    );
    await Question.insertMany(rows);
    out.questions = rows.length;
  }
  out.demoAdmin = await seedDemoAdmin();
  return out;
}

if (require.main === module) {
  connect(config.mongoUri)
    .then(() => seed({ reset: process.argv.includes("--reset") }))
    .then((out) => console.log("Seed done:", out))
    .catch((err) => {
      console.error("Seed failed:", err.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}

module.exports = { seed };
