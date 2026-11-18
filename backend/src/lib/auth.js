const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("./config");
const { HttpError } = require("./errors");
const { DEMO_ROLE, findDemoAdmin } = require("./demoAdmin");

const sha = (s) => crypto.createHash("sha256").update(String(s)).digest();
const safeEqual = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));

const READ_METHODS = ["GET", "HEAD", "OPTIONS"];
const DEMO_READ_ONLY = "Demo admin is read-only: changes are not saved.";

const sign = (sub, role) => ({ token: jwt.sign({ sub, role }, config.jwtSecret, { expiresIn: "8h" }), role });

// The real admin comes from the ADMIN_EMAIL / ADMIN_PASSWORD env vars (full rights).
// The public demo admin comes from the AdminUser collection (seed.js) and is read-only.
async function login(email, password) {
  if (!config.jwtSecret) throw new HttpError(503, "Admin login is not configured on this server");
  const mail = String(email || "").trim().toLowerCase();
  if (config.adminEmail && config.adminPassword) {
    const okEmail = safeEqual(mail, config.adminEmail);
    const okPass = safeEqual(password || "", config.adminPassword);
    if (okEmail && okPass) return sign(config.adminEmail, "admin");
  }
  const demo = await findDemoAdmin(mail, password);
  if (demo) return sign(demo.email, DEMO_ROLE);
  if (!config.adminEmail || !config.adminPassword) throw new HttpError(503, "Admin login is not configured on this server");
  throw new HttpError(401, "Invalid email or password");
}

function requireAdmin(req, _res, next) {
  const [type, token] = (req.headers.authorization || "").split(" ");
  if (type !== "Bearer" || !token || !config.jwtSecret) return next(new HttpError(401, "Admin token required"));
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
    if (payload.role !== "admin" && payload.role !== DEMO_ROLE) throw new Error("role");
  } catch {
    return next(new HttpError(401, "Invalid or expired token"));
  }
  // The demo role may look at everything but never write.
  if (payload.role === DEMO_ROLE && !READ_METHODS.includes(req.method)) return next(new HttpError(403, DEMO_READ_ONLY));
  req.admin = payload;
  next();
}

module.exports = { login, requireAdmin, DEMO_READ_ONLY };
