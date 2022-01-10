import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ContactModel, { ContactDocument, ContactInput } from "../models/contact.model";


export async function createContact(input: ContactInput) {
    try{
        const result = await ContactModel.create(input);
        return result;
    } catch(e) {
        throw e;
    }
}

export async function findContact(
    query: FilterQuery<ContactDocument>,
    options: QueryOptions = { lean: true }
) {
    try{
        const result = await ContactModel.findOne(query, {}, options);
        return result;
    } catch(e) {
        throw e;
    }
}

export async function listContact() {
    try{ 
        const result = await ContactModel.find({}).lean();
        return result;
    } catch(e) {
        throw e;
    } 
}

export async function findAndUpdateContact(
    query: FilterQuery<ContactDocument>,
    update: UpdateQuery<ContactDocument>,
    options: QueryOptions
) {
    return ContactModel.findOneAndUpdate(query, update, options);
}

export async function deleteContact(query: FilterQuery<ContactDocument>){
    return ContactModel.deleteOne(query);
}