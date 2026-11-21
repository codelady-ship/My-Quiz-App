// Public, read-only "demo admin" account for the portfolio.
// It lives in the AdminUser collection and is created by seed.js (and the seed on start).
// Its JWT carries role "demo": requireAdmin lets it read every admin list but answers
// every write with 403, so it can never change real data. The password is public by design.
const crypto = require("crypto");
const mongoose = require("mongoose");
const config = require("./config");

const DEMO_ROLE = "demo";

const AdminUser =
  mongoose.models.AdminUser ||
  mongoose.model(
    "AdminUser",
    new mongoose.Schema(
      {
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: [DEMO_ROLE], default: DEMO_ROLE },
      },
      { timestamps: true }
    )
  );

// scrypt$<salt>$<hash>, built into Node (no extra dependency).
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  return `scrypt$${salt}$${crypto.scryptSync(String(password), salt, 32).toString("hex")}`;
}

function checkPassword(password, stored) {
  const [kind, salt, hash] = String(stored || "").split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  const given = crypto.scryptSync(String(password || ""), salt, 32);
  const want = Buffer.from(hash, "hex");
  return want.length === given.length && crypto.timingSafeEqual(given, want);
}

/** Creates or refreshes the demo admin; DEMO_ADMIN_ENABLED=false removes it instead. */
async function seedDemoAdmin() {
  const email = config.demoAdminEmail;
  if (!config.demoAdminEnabled) {
    const { deletedCount } = await AdminUser.deleteMany({ role: DEMO_ROLE });
    return `disabled (${deletedCount} removed)`;
  }
  if (email === config.adminEmail) throw new Error("DEMO_ADMIN_EMAIL must differ from ADMIN_EMAIL");
  await AdminUser.findOneAndUpdate(
    { email },
    { email, role: DEMO_ROLE, passwordHash: hashPassword(config.demoAdminPassword) },
    { upsert: true, setDefaultsOnInsert: true }
  );
  return email;
}

/** Returns the demo account for these credentials, or null. */
async function findDemoAdmin(email, password) {
  if (!config.demoAdminEnabled || mongoose.connection.readyState !== 1) return null;
  const user = await AdminUser.findOne({ email: String(email || "").trim().toLowerCase() });
  return user && checkPassword(password, user.passwordHash) ? user : null;
}

module.exports = { DEMO_ROLE, AdminUser, seedDemoAdmin, findDemoAdmin, hashPassword, checkPassword };
