import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    replyText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false } // replies do NOT need a separate ID
);

const commentSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
      index: true, // faster lookup
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
      trim: true,
    },

    replies: [replySchema],
  },
  { timestamps: true }
);

// Optional: Sort comments by newest first automatically
commentSchema.index({ createdAt: -1 });

export default mongoose.model("Comment", commentSchema);
