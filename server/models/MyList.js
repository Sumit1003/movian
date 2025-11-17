import mongoose from "mongoose";

const MyListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imdbID: { type: String, required: true },
    title: String,
    poster: String,
    year: String,
    type: String,
    imdbRating: String,
    runtime: String,
  },
  { timestamps: true }
);

export default mongoose.model("MyList", MyListSchema);
