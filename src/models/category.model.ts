import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 16);

export interface CategoryInput {
    type: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        default: () => `${nanoid()}`
    },
    type: { type: String, required: true }
}, {
    timestamps: true
});

const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;