import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: false,   // FIXED (No registration failures)
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,    // REQUIRED for admin panel
    },
  },

  {
    timestamps: true,    // FIXED (correct spelling)
  }
);

export default mongoose.model("User", userSchema);
