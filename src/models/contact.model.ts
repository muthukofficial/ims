import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ContactInput {
    email: string;
    fullName: string;
    phoneNo?: string;
    websites: string;
    notes: string;
}

export interface ContactDocument extends ContactInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const contactSchema= new mongoose.Schema(
    {
        contactId: {
            type: String,
            required: true,
            unique: true,
            default: () => `${nanoid()}`
        },
        email: { type: String, required: true },
        fullName: { type: String, required: true },
        phoneNo: { type: String },
        websites: { type: String },
        notes: { type: String }
    },
    {
        timestamps: true
    }
);

const ContactModel = mongoose.model<ContactDocument>("Contact", contactSchema);

export default ContactModel;