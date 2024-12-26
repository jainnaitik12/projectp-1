import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const AdminPermissionSchema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
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
const AdminPermission = model('AdminPermission', AdminPermissionSchema);

export default AdminPermission;
