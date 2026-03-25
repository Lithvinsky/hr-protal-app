import bcrypt from "bcryptjs";

export const BCRYPT_ROUNDS = 10;

export function isBcryptHash(value) {
  return typeof value === "string" && value.startsWith("$2");
}

export async function hashPassword(plain) {
  return bcrypt.hash(String(plain), BCRYPT_ROUNDS);
}

/**
 * Compare plain password to stored hash or legacy plain text.
 * If legacy plain matches, re-hash and persist on the Mongoose document.
 */
export async function verifyAndUpgradeEmployeePassword(employeeDoc, plain) {
  const pass = String(plain);
  if (isBcryptHash(employeeDoc.password)) {
    return bcrypt.compare(pass, employeeDoc.password);
  }
  if (pass === employeeDoc.password) {
    employeeDoc.password = await hashPassword(pass);
    await employeeDoc.save();
    return true;
  }
  return false;
}
