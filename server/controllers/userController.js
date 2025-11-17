import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/email.js";
import User from "../models/User.js";
import VerifyPending from "../models/VerifyPending.js";

/** -----------------------------------------
 *  JWT GENERATOR
 * ----------------------------------------- */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/** -----------------------------------------
 *  REGISTER USER (Email Verification)
 * ----------------------------------------- */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, dob } = req.body;

    if (!username || !email || !password || !dob) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Remove old pending verifications
    await VerifyPending.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 12);

    const token = jwt.sign(
      { username, email, password: hashedPassword, dob },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    await VerifyPending.create({
      username,
      email,
      password: hashedPassword,
      dob,
      token,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

    await sendEmail(
      email,
      "Verify Your Email - Movian",
      `
      <h2>Welcome to Movian 🎬</h2>
      <p>Click below to verify your email.</p>
      <a href="${verifyLink}">Verify Email</a>
      `
    );

    return res.json({
      success: true,
      message: "Verification email sent. Please verify to complete registration.",
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** -----------------------------------------
 *  LOGIN USER
 * ----------------------------------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    // BANNED USER CHECK
    if (user.isBanned) {
      return res.status(403).json({
        success: false,
        message: "Your account has been banned",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** -----------------------------------------
 *  FORGOT PASSWORD
 * ----------------------------------------- */
export const forgotPassword = async (req, res) => {
  try {
    const { email, dob } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
      dob: new Date(dob),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account found with provided details",
      });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Reset Your Movian Password",
      `
      <h2>Reset Password</h2>
      <a href="${resetLink}">Click to reset</a>
      `
    );

    return res.json({
      success: true,
      message: "Password reset instructions sent",
    });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** -----------------------------------------
 *  RESET PASSWORD
 * ----------------------------------------- */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" });

    const hashed = await bcrypt.hash(password, 12);
    user.password = hashed;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.error("Reset Error:", err);
    res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/** -----------------------------------------
 *  VERIFY EMAIL
 * ----------------------------------------- */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Find pending record
    const pending = await VerifyPending.findOne({ token });
    if (!pending) {
      return res.status(400).json({
        success: false,
        message: "Verification link expired or invalid",
      });
    }

    // 1️⃣ Check if email already verified
    const emailExists = await User.findOne({ email: pending.email });
    if (emailExists) {
      await VerifyPending.deleteOne({ token });
      return res.json({
        success: true,
        message: "Email already verified",
      });
    }

    // 2️⃣ Check username duplicate
    let finalUsername = pending.username;

    const usernameExists = await User.findOne({ username: finalUsername });

    if (usernameExists) {
      // Auto-fix username collision → make it unique
      finalUsername = `${pending.username}_${Math.floor(Math.random() * 9000 + 1000)}`;
      console.log("⚠ Username existed, changed to:", finalUsername);
    }

    // 3️⃣ Create the actual user
    await User.create({
      username: finalUsername,
      email: pending.email,
      password: pending.password,
      dob: pending.dob,
      isVerified: true,
    });

    // 4️⃣ Remove pending verification record
    await VerifyPending.deleteOne({ token });

    return res.json({
      success: true,
      message: "Email verified & account created successfully!",
      username: finalUsername,
    });

  } catch (err) {
    console.error("Verify Email Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/** -----------------------------------------
 *  GET CURRENT USER
 * ----------------------------------------- */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** -----------------------------------------
 *  USER PROFILE (Protected)
 * ----------------------------------------- */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/** -----------------------------------------
 *  UPDATE USER
 * ----------------------------------------- */
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const allowed = ["username", "email", "dob", "avatar"];

    const safeUpdates = {};
    Object.keys(updates).forEach((key) => {
      if (allowed.includes(key)) safeUpdates[key] = updates[key];
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      safeUpdates,
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
