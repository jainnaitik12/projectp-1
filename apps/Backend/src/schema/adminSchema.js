import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const PermissionEnum = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};

const AdminSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permissions: [
      {
        type: String,
        required: true,
        enum: Object.values(PermissionEnum),
      },
    ],
  },
  { timestamps: true }
);

const Admin = model('Admin', AdminSchema);

export default Admin;
export { PermissionEnum };
