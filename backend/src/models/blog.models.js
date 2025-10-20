import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    coverImage: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      }
    },
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
    },
    reactions: [
      {
        emoji: {
          type: String,
          enum: ["❤️", "🔥", "💡", "😮", "😢"],
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref:  "User"
        }
      },
    ],
  },
{ timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
