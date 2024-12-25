const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    type: {
      type: String,
      enum: ["prePlacement", "interview", "workshop", "other"],
    },
    date: { type: Date, required: true },
    venue: String,
    company: String,
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    attendees: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["invited", "confirmed", "attended"] },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export const Event = mongoose.model("Event", eventSchema);
