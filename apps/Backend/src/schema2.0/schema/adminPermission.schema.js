const adminPermissionSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    permissions: [
      {
        type: String,
        enum: [
        
          "verifyStudent",
          "postJobs",
          "manageEvents",
          "viewAnalytics",
          "updateJobStatus",
          "contactRecruiter",
          // New permissions to add
          "manageAdmins", // For super admin
          "processStatusUpdates",
          "sendNotifications",
          "verifyJNF",
        ],
      },
    ],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const AdminPermission = mongoose.model(
  "AdminPermission",
  adminPermissionSchema
);
