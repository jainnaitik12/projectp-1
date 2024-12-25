const userSchema = new mongoose.Schema(
  {
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
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin", "superAdmin", "recruiter"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    company: {
      type: String,
      required: function () {
        return this.role === "recruiter";
      },
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: function () {
        return this.role === "student";
      },
    },
    notifications: [
      {
        message: String,
        type: String,
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    lastLogin: Date,
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
