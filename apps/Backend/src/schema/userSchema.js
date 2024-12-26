import { Schema as _Schema, model, mongoose } from "mongoose";
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;
import bcrypt from 'bcrypt';
const Schema = _Schema;

const UserSchema = schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isVerified: { type: Boolean, default: false },

    superadmin: { type: Boolean, default: false },
    
    tpo: { type: Boolean, default: false },

    pcc: { type: Boolean, default: false },

    user_role: { type: String, enum: ['admin', 'student', 'company'], required: true },

    Student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: false,
    },

    Company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: false,
    },
    lastLogin: { type: Date },
    authToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
    avatar: { type: String, default: "" },
    // accountLocked: { type: Boolean, default: false },
    // pccAssignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePasswords = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

const User = model("User", UserSchema);
export default User;