import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const BulkStatusUpdateSchema = new Schema(
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

const BulkStatusUpdate = model('BulkStatusUpdate', BulkStatusUpdateSchema);

export default BulkStatusUpdate;