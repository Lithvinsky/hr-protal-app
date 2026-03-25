import mongoose from "mongoose";
import Employee from "../models/Employee.js";

function isMongoObjectIdString(id) {
  return (
    typeof id === "string" &&
    id.length === 24 &&
    /^[0-9a-fA-F]{24}$/.test(id) &&
    mongoose.Types.ObjectId.isValid(id)
  );
}

/**
 * Resolve :id from routes — Mongo ObjectId or legacy id from seed data (e.g. a1, e1).
 */
export async function findEmployeeByRouteId(id) {
  if (!id) return null;

  if (isMongoObjectIdString(id)) {
    const byMongo = await Employee.findById(id);
    if (byMongo) return byMongo;
  }

  return Employee.findOne({ legacyId: id });
}
