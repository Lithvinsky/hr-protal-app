/**
 * Loads json/employesData.json into MongoDB (Employee collection).
 * Run from server/: npm run seed
 *
 * Clears existing employees first. Requires MONGO_URI in server/.env
 */
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import { hashPassword } from "../utils/password.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: join(__dirname, "..", ".env") });

const jsonPath = join(__dirname, "..", "..", "json", "employesData.json");

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in server/.env");
    process.exit(1);
  }

  const raw = readFileSync(jsonPath, "utf8");
  const { employees } = JSON.parse(raw);

  if (!Array.isArray(employees) || employees.length === 0) {
    console.error("No employees array in", jsonPath);
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const deleted = await Employee.deleteMany({});
  console.log(`Removed ${deleted.deletedCount} existing employee(s)`);

  const docs = await Promise.all(
    employees.map(async (emp) => {
      const { id, password, ...rest } = emp;
      const hashed = await hashPassword(password);
      return { ...rest, legacyId: String(id), password: hashed };
    })
  );

  await Employee.insertMany(docs, { ordered: true });
  console.log(`Inserted ${docs.length} employee(s) from employesData.json`);

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
