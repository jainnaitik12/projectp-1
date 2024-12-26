import { application } from 'express';
import { Schema as _Schema, model,mongoose } from 'mongoose';
const Schema = _Schema;

const ApplicationSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "selected", "rejected"],
    default: "applied",
  },
  roundStatus: [
    {
      round: String,
      status: String,
      feedback: String,
      date: Date,
    },
  ],
  timeline: [{
    status: String,
    date: { type: Date, default: Date.now },
    remarks: String
  }],
  documents: [
    {
      type: String,
      url: String,
      verified: Boolean,
    },
  ],
  feedback: String,
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notifications: [
    {
     type:Schema.Types.ObjectId,
     ref:"Notification"
    },
  ],
  emailNotificationsSent: [
    {
      type: String,
      date: Date,
    },
  ],
});


ApplicationSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
// Validating round status change
ApplicationSchema.pre('save',function(next){
  if(this.isModified('status')){
    if(this.isNew){
      this.timeline.push({
        status:this.status,
        date: new Date(),
        remarks: 'Application created'
      })
    }
  }
  next();
})
const Application = model('Application', ApplicationSchema);

export default Application;
