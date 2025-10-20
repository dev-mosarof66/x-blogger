import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      unique: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
export default Tag