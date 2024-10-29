import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  organization: mongoose.Types.ObjectId;
  role: "admin" | "user"; // Role of the user
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    salt: { type: String },
    organization: { type: mongoose.Schema.Types.ObjectId },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model<IUser>("User", userSchema);
