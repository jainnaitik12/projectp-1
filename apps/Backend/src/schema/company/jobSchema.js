import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;


const JobSchema = new Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    requirements: [String],
    eligibility: {
      departments: [String],
      minCGPA: { type: Number, required: true },
      batch: { type: Number, required: true },
    },
    salary: {
      ctc: Number,
      breakup: String,
    },
    rounds: [
      {
        name: String,
        description: String,
        date: Date,
        venue: String,
      },
    ],
    numberOfPositions: Number,
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    applicationDeadline: Date,
   
    jnf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JNF",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "pendingAdminApproval", "open", "closed"],
      default: "draft",
    },

    adminApproval: {
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      approvedAt: Date,
      comments: String,
    },

    analytics: {
      views: { type: Number, default: 0 },
      applications: { type: Number, default: 0 },
      shortlisted: { type: Number, default: 0 },
      selected: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Job = model('Job', JobSchema);

export default Job;