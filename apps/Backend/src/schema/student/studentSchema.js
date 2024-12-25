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
