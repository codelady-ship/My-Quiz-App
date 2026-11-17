const mongoose = require("mongoose");
const { jsonOpts } = require("./lib/base");

const CATEGORIES = ["html", "css", "javascript", "react"];
const LANGS = ["az", "en"];

const textSchema = new mongoose.Schema(
  {
    q: { type: String, required: true, trim: true, maxlength: 300 },
    o: {
      type: [{ type: String, trim: true, maxlength: 200 }],
      validate: [(v) => v.length >= 2 && v.length <= 6, "2 to 6 options"],
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    qid: { type: String, required: true, unique: true, trim: true, match: /^[a-z0-9-]+$/ },
    category: { type: String, enum: CATEGORIES, required: true, index: true },
    a: { type: Number, required: true, min: 0 }, // index of the right option (same in both languages)
    az: { type: textSchema, required: true },
    en: { type: textSchema, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: jsonOpts }
);

questionSchema.pre("validate", function check(next) {
  if (this.az && this.en && this.az.o.length !== this.en.o.length) this.invalidate("en.o", "az and en need the same number of options");
  if (this.az && this.a >= this.az.o.length) this.invalidate("a", "a must point to an existing option");
  next();
});

const scoreSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true, trim: true, maxlength: 20 },
    nicknameKey: { type: String, required: true, index: true }, // lowercase, for "best per player"
    category: { type: String, enum: CATEGORIES, required: true },
    lang: { type: String, enum: LANGS, required: true },
    score: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 1 },
  },
  { timestamps: true, toJSON: jsonOpts }
);
scoreSchema.index({ category: 1, score: -1, createdAt: 1 });

module.exports = {
  CATEGORIES,
  LANGS,
  Question: mongoose.model("Question", questionSchema),
  Score: mongoose.model("Score", scoreSchema),
};
