import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  description: string;
  members: object[];
  invitations: [string];
}

const organizationSchema = new mongoose.Schema<IOrganization>({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Object, required: true }],
  invitations: [{ type: String, required: true }],
});

export default mongoose.model<IOrganization>(
  "Organization",
  organizationSchema
);
