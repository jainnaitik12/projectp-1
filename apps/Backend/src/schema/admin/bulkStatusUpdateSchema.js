const bulkStatusUpdateSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: String,
    processedCount: Number,
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "error"],
      default: "pending",
    },
    errors: [String],
  },
  { timestamps: true }
);
export const BulkStatusUpdate = mongoose.model(
  "BulkStatusUpdate",
  bulkStatusUpdateSchema
);
