import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const AdminSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permissions: [
      {
       type: Schema.Types.ObjectId,
        ref:'AdminPermission'
      },
    ],
  },
  { timestamps: true }
);

const Admin = model('Admin', AdminSchema);

export default Admin;

