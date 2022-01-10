import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import CategoryModel, { CategoryDocument, CategoryInput } from "../models/category.model";

export async function createCategory(input: CategoryInput) {
    try{
        const result = await CategoryModel.create(input);
        return result;
    } catch(e) {
        throw e;
    }
}

export async function findCategory(
    query: FilterQuery<CategoryDocument>,
    options: QueryOptions = { lean: true }
) {
    try{
        const result = await CategoryModel.findOne(query, {}, options);
        return result;
    } catch(e) {
        throw e;
    }
}

export async function listCategory() {
    try{ 
        const result = await CategoryModel.find({}).lean();
        return result;
    } catch(e) {
        throw e;
    } 
}