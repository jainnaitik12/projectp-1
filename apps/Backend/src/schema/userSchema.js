import { Schema as _Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
const schema = _Schema;

const UserSchema = schema({
    email: { type: String, required: true, unique: true },
    superadmin: { type: Boolean, default: false },
    password: { type: String, required: true },
    user_role: { type: String, required: true },
    lastLogin: { type: Date },
    authToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
}, { timestamp: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(20);
        this.password = bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePasswords = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

const User = model("User", UserSchema);
export default User;