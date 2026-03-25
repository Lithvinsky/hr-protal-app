import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

userSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
