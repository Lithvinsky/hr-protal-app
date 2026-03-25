import mongoose from "mongoose";

const onboardingTaskSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const onboardingSchema = new mongoose.Schema(
  {
    tasks: [onboardingTaskSchema],
    completedDate: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false }
);

const employeeSchema = new mongoose.Schema(
  {
    legacyId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    age: { type: Number },
    job: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    phone: { type: String, default: "" },
    department: { type: String, required: true },
    hireDate: { type: String, default: "" },
    address: { type: String, default: "" },
    daysOfHolidays: { type: Number, default: 28 },
    holidays: { type: [mongoose.Schema.Types.Mixed], default: [] },
    onboarding: { type: onboardingSchema },
    salary: { type: Number, default: 0 },
  },
  {
    timestamps: false,
  }
);

employeeSchema.set("toJSON", {
  virtuals: true,
  transform(_doc, ret) {
    ret.id = ret.legacyId || ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

export default mongoose.model("Employee", employeeSchema);
