import { Tuser, UserModel } from "./user.interfact";
import bcrypt from "bcrypt";
import config from "../../config";
import mongoose from "mongoose";
import { AppError } from "../../errors/appError";
import httpStatus from "http-status";

const userSchema = new mongoose.Schema<Tuser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.static("userExists", async (id) => {
  try {
    const user = await User.findOne({ id });
    return user ? user : null;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
});

userSchema.statics.passwordMatched = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds)
  );
});

userSchema.post("save", async function () {
  this.password = "";
});

const User = mongoose.model<Tuser, UserModel>("User", userSchema);

export default User;
