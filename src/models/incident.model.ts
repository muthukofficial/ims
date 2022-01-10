import mongoose from 'mongoose';
import { customAlphabet } from "nanoid";
import { UserDocument } from './user.model';
import { CategoryDocument } from './category.model';
import { ContactDocument } from './contact.model';

export interface IncidentInput {
    owner?: UserDocument["_id"];
    incidentNumber: string;
    callerName: ContactDocument["_id"];
    category: CategoryDocument["_id"];
    subject: string;
    description: string;
    priority: number;
    status: string;
}

export interface IncidentDocument extends IncidentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const incidentSchema= new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        incidentNumber: { type: String, required: true },
        callerName: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        subject: { type: String },
        description: { type: String },
        priority: { type: Number, required: true },
        status: { type: String }
    },
    {
        timestamps: true
    }
);

const IncidentModel = mongoose.model<IncidentDocument>("Incident", incidentSchema);

export default IncidentModel;