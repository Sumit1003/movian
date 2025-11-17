import mongoose from "mongoose";

const verifyPendingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true },
  dob:      { type: Date,   required: true },
  token:    { type: String, required: true },
  expiresAt:{ type: Date,   required: true }
}, { timestamps: true });

// ⭐ MUST use export default
const VerifyPending = mongoose.model("VerifyPending", verifyPendingSchema);

export default VerifyPending;
