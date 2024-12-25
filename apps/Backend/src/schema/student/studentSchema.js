import { Schema as _Schema, model,mongoose } from 'mongoose';
const Schema = _Schema;

const linkSchema = new mongoose.Schema({
  type: String,
  url: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  links: [linkSchema],
});
const StudentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Locked fields with verification
  personalInfo: {
    name: { 
      type: String, 
      required: true,
      isLocked: { type: Boolean, default: false }
    },
    rollNumber: { 
      type: String, 
      required: true,
      isLocked: { type: Boolean, default: false }
    },
    department: { 
      type: String, 
      required: true,
      isLocked: { type: Boolean, default: false }
    },
    batch: { 
      type: Number, 
      required: true,
      isLocked: { type: Boolean, default: false }
    }
  },

  academics: {
    cgpa: { 
      type: Number, 
      required: true,
      isLocked: { type: Boolean, default: false }
    },
    tenthMarks: {
      type: Number,
      required: true,
      isLocked: { type: Boolean, default: false }
    },
    twelfthMarks: {
      type: Number,
      required: true,
      isLocked: { type: Boolean, default: false }
    }
  },

  // Unlocked fields
  skills: [String],
  education: [
    {
      institution: String,
      degree: String,
      year: Number,
      score: String,
    },
  ],
  experience: [
    {
      title: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  projects: [projectSchema],
applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
}],
  // Verification metadata
  verificationStatus: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  verificationDate: Date,

  // Track modifications
  modificationHistory: [{
    field: String,
    oldValue: Schema.Types.Mixed,
    newValue: Schema.Types.Mixed,
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    modifiedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });



//middleware to prevent modification of locked fields
StudentSchema.pre('save', async function(next) {
  // Check if locked fields are modified
  const isPersonalLocked = this.personalInfo?.isLocked;
  const isAcademicsLocked = this.academics?.isLocked;

  // Check personal info
  if (isPersonalLocked && this.isModified('personalInfo')) {
    return next(new Error('Cannot modify locked personal information'));
  }

  // Check academics
  if (isAcademicsLocked && this.isModified('academics')) {
    return next(new Error('Cannot modify locked academic information'));
  }

  next();
});

const Student = model('Student', StudentSchema);

export default Student;