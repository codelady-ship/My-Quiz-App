// API tests on an in-memory MongoDB. Run: npm test
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");

process.env.JWT_SECRET = "test-secret";
process.env.ADMIN_EMAIL = "admin@test.local";
process.env.ADMIN_PASSWORD = "test-password";

const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server-core");
const { createApp } = require("../src/app");
const { seed } = require("../src/seed");

let mongo;
let app;
let html;

before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri("quiz-test"));
  await seed();
  app = createApp();
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

const round = (lang, rightCount) =>
  html.slice(0, 10).map((q, i) => ({ id: q.id, answer: i < rightCount ? q[lang].o[q.a] : i % 2 ? null : q[lang].o[(q.a + 1) % q[lang].o.length] }));

test("question bank: all categories, same shape as the bundled data", async () => {
  const all = await request(app).get("/api/questions");
  assert.deepEqual(all.body.categories, ["html", "css", "javascript", "react"]);
  Object.values(all.body.questions).forEach((list) => assert.ok(list.length >= 10));
  html = (await request(app).get("/api/questions?category=html")).body.questions.html;
  assert.deepEqual(Object.keys(html[0]).sort(), ["a", "az", "en", "id"]);
  assert.equal((await request(app).get("/api/questions?category=cobol")).status, 404);
});

test("scores: server computes the score from chosen answers", async () => {
  const res = await request(app).post("/api/scores").send({ nickname: "Aysel", category: "html", lang: "az", answers: round("az", 7), score: 10 });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  assert.equal(res.body.score, 7);
  assert.equal(res.body.total, 10);
  assert.equal(res.body.rank, 1);

  await request(app).post("/api/scores").send({ nickname: "Murad", category: "html", lang: "en", answers: round("en", 9) });
  await request(app).post("/api/scores").send({ nickname: "aysel", category: "html", lang: "en", answers: round("en", 4) });
  const board = (await request(app).get("/api/leaderboard/html")).body;
  assert.deepEqual(board.map((r) => [r.nickname, r.score]), [["Murad", 9], ["Aysel", 7]]); // best score per player
  assert.deepEqual((await request(app).get("/api/leaderboard/css")).body, []);
});

test("scores: validation", async () => {
  const bad = await request(app).post("/api/scores").send({ nickname: "<b>", category: "html", lang: "de", answers: [] });
  assert.equal(bad.status, 400);
  const fields = bad.body.details.map((d) => d.field);
  assert.ok(fields.includes("nickname") && fields.includes("lang") && fields.includes("answers"));
  const wrongCat = await request(app).post("/api/scores").send({ nickname: "Test", category: "css", lang: "az", answers: round("az", 3) });
  assert.equal(wrongCat.status, 400);
  const dup = await request(app).post("/api/scores").send({ nickname: "Test", category: "html", lang: "az", answers: [round("az", 1)[0], round("az", 1)[0]] });
  assert.equal(dup.status, 400);
});

test("stats", async () => {
  const s = (await request(app).get("/api/stats")).body;
  assert.equal(s.html.plays, 3);
  assert.equal(s.html.best, 9);
  assert.equal(s.css.plays, 0);
});

test("admin: question CRUD and score moderation", async () => {
  assert.equal((await request(app).post("/api/admin/questions").send({})).status, 401);
  const login = await request(app).post("/api/auth/login").send({ email: "ADMIN@test.local", password: "test-password" });
  const auth = { Authorization: `Bearer ${login.body.token}` };
  const q = { qid: "html-99", category: "html", a: 1, az: { q: "Sual nümunəsi?", o: ["A", "B"] }, en: { q: "Sample question?", o: ["A", "B"] } };
  assert.equal((await request(app).post("/api/admin/questions").set(auth).send(q)).status, 201);
  assert.equal((await request(app).post("/api/admin/questions").set(auth).send({ ...q, qid: "html-98", a: 5 })).status, 400);
  assert.equal((await request(app).put("/api/admin/questions/html-99").set(auth).send({ ...q, a: 0 })).body.a, 0);
  assert.equal((await request(app).patch("/api/admin/questions/html-99").set(auth).send({ active: false })).body.active, false);
  const pub = (await request(app).get("/api/questions?category=html")).body.questions.html;
  assert.equal(pub.some((x) => x.id === "html-99"), false);
  assert.equal((await request(app).delete("/api/admin/questions/html-99").set(auth)).status, 204);
  assert.equal((await request(app).delete("/api/admin/scores/AYSEL").set(auth)).body.deleted, 2);
});
