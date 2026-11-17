const express = require("express");
const { z } = require("zod");
const { createBaseApp, publicWriteLimiter } = require("./lib/base");
const { requireAdmin } = require("./lib/auth");
const { HttpError, validate, notFound, errorHandler } = require("./lib/errors");
const { CATEGORIES, LANGS, Question, Score } = require("./models");

const ROUND_SIZE = 10;
const LEADERBOARD_SIZE = 10;

const text = z.object({ q: z.string().trim().min(3).max(300), o: z.array(z.string().trim().min(1).max(200)).min(2).max(6) });
const questionSchema = z
  .object({
    qid: z.string().trim().regex(/^[a-z0-9-]+$/).max(40),
    category: z.enum(CATEGORIES),
    a: z.coerce.number().int().min(0),
    az: text,
    en: text,
    active: z.boolean().optional(),
    order: z.coerce.number().int().optional(),
  })
  .refine((q) => q.az.o.length === q.en.o.length, { path: ["en", "o"], message: "az and en need the same number of options" })
  .refine((q) => q.a < q.az.o.length, { path: ["a"], message: "a must point to an existing option" });

const nickname = z
  .string()
  .trim()
  .min(2, "Nickname: 2–20 characters")
  .max(20, "Nickname: 2–20 characters")
  .regex(/^[\p{L}\p{N} _.-]+$/u, "Use letters, digits, space, _ . -");

const scoreSchema = z.object({
  nickname,
  category: z.enum(CATEGORIES),
  lang: z.enum(LANGS),
  // the option text the player chose for each question id (null = time ran out)
  answers: z
    .array(z.object({ id: z.string().max(40), answer: z.string().max(200).nullable() }))
    .min(1)
    .max(ROUND_SIZE),
});

// Same shape as src/data/questions.js: { id, a, az: {q, o}, en: {q, o} }
const toBankItem = (q) => ({ id: q.qid, a: q.a, az: q.az, en: q.en });

async function leaderboard(category) {
  return Score.aggregate([
    { $match: { category } },
    { $sort: { score: -1, createdAt: 1 } },
    { $group: { _id: "$nicknameKey", nickname: { $first: "$nickname" }, score: { $first: "$score" }, total: { $first: "$total" }, at: { $first: "$createdAt" } } },
    { $sort: { score: -1, at: 1 } },
    { $limit: LEADERBOARD_SIZE },
    { $project: { _id: 0, nickname: 1, score: 1, total: 1, at: 1 } },
  ]);
}

function createApp() {
  const app = createBaseApp();
  const api = express.Router();

  /* ----- Public question bank ----- */
  api.get("/questions", async (req, res) => {
    const filter = { active: true };
    if (req.query.category) {
      if (!CATEGORIES.includes(String(req.query.category))) throw new HttpError(404, "Unknown category");
      filter.category = String(req.query.category);
    }
    const rows = await Question.find(filter).sort({ order: 1, qid: 1 });
    const questions = {};
    (filter.category ? [filter.category] : CATEGORIES).forEach((c) => (questions[c] = []));
    rows.forEach((q) => questions[q.category].push(toBankItem(q)));
    res.json({ categories: Object.keys(questions), questions });
  });

  /* ----- Leaderboard ----- */
  api.get("/leaderboard/:category", async (req, res) => {
    const category = String(req.params.category);
    if (!CATEGORIES.includes(category)) throw new HttpError(404, "Unknown category");
    res.json(await leaderboard(category));
  });

  api.get("/stats", async (_req, res) => {
    const rows = await Score.aggregate([{ $group: { _id: "$category", plays: { $sum: 1 }, avg: { $avg: "$score" }, best: { $max: "$score" } } }]);
    const stats = {};
    CATEGORIES.forEach((c) => (stats[c] = { plays: 0, avg: 0, best: 0 }));
    rows.forEach((r) => (stats[r._id] = { plays: r.plays, avg: Math.round(r.avg * 10) / 10, best: r.best }));
    res.json(stats);
  });

  // The server scores the round itself from the chosen option texts, so a client cannot send a made-up score.
  api.post("/scores", publicWriteLimiter(), validate(scoreSchema), async (req, res) => {
    const { nickname: name, category, lang, answers } = req.body;
    const ids = answers.map((a) => a.id);
    if (new Set(ids).size !== ids.length) throw new HttpError(400, "Validation failed", [{ field: "answers", message: "Duplicate question" }]);
    const bank = await Question.find({ qid: { $in: ids }, category });
    if (bank.length !== ids.length) throw new HttpError(400, "Validation failed", [{ field: "answers", message: "Unknown question for this category" }]);
    const byId = new Map(bank.map((q) => [q.qid, q]));
    const score = answers.reduce((sum, { id, answer }) => {
      const q = byId.get(id);
      return sum + (answer !== null && q[lang].o[q.a] === answer ? 1 : 0);
    }, 0);
    const doc = await Score.create({ nickname: name, nicknameKey: name.toLowerCase(), category, lang, score, total: answers.length });
    const board = await leaderboard(category);
    const rank = board.findIndex((r) => r.nickname.toLowerCase() === doc.nicknameKey && r.score === score) + 1;
    res.status(201).json({ score, total: doc.total, rank: rank || null, leaderboard: board });
  });

  /* ----- Admin (JWT) ----- */
  api.get("/admin/questions", requireAdmin, async (req, res) => {
    const filter = req.query.category ? { category: String(req.query.category) } : {};
    res.json(await Question.find(filter).sort({ category: 1, order: 1 }));
  });

  api.post("/admin/questions", requireAdmin, validate(questionSchema), async (req, res) => {
    res.status(201).json(await Question.create(req.body));
  });

  api.put("/admin/questions/:qid", requireAdmin, validate(questionSchema), async (req, res) => {
    const q = await Question.findOneAndUpdate({ qid: String(req.params.qid) }, { ...req.body, qid: String(req.params.qid) }, { new: true, runValidators: true });
    if (!q) throw new HttpError(404, "Question not found");
    res.json(q);
  });

  api.patch("/admin/questions/:qid", requireAdmin, validate(z.object({ active: z.boolean() })), async (req, res) => {
    const q = await Question.findOneAndUpdate({ qid: String(req.params.qid) }, { active: req.body.active }, { new: true });
    if (!q) throw new HttpError(404, "Question not found");
    res.json(q);
  });

  api.delete("/admin/questions/:qid", requireAdmin, async (req, res) => {
    const q = await Question.findOneAndDelete({ qid: String(req.params.qid) });
    if (!q) throw new HttpError(404, "Question not found");
    res.status(204).end();
  });

  // Moderation: remove every score of a nickname (e.g. an offensive name).
  api.delete("/admin/scores/:nickname", requireAdmin, async (req, res) => {
    const { deletedCount } = await Score.deleteMany({ nicknameKey: String(req.params.nickname).toLowerCase() });
    res.json({ deleted: deletedCount });
  });

  app.use("/api", api);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
