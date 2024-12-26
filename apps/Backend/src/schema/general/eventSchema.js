import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const EventSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    attendees: [
      {
        student: { type: Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["invited", "confirmed", "attended"] },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Event = model('Event', EventSchema);

export default Event;