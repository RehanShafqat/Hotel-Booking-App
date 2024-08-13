import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export type UserType = {
  _id: string;
  email: string;
  password: string;
  userName: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//if the password has changed then bcrypt it
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

export const userModel = mongoose.model<UserType>("User", userSchema);
export default userModel;
