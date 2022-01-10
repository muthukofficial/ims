import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import IncidentModel, { IncidentDocument, IncidentInput } from '../models/incident.model';

export async function createIncident(input: IncidentInput){
    try {
        const result = await IncidentModel.create(input);
        return result;
    } catch(e){
        throw(e);
    }
}

export async function findIncident(
    query: FilterQuery<IncidentDocument>,
    options: QueryOptions = { lean: true }
) {
    try {
        const result = await IncidentModel.findOne(query, {}, options);
        return result;
    } catch(e){
        throw e;
    }
}

export async function listIncident() {
    try{
        const result = await IncidentModel.find({}).lean();
        return result;
    } catch(e) {
        throw e;
    }
}

export async function findAndUpdateIncident(
    query: FilterQuery<IncidentDocument>,
    update: UpdateQuery<IncidentDocument>,
    options: QueryOptions
){
    return IncidentModel.findOneAndUpdate(query, update, options);
}

export async function deleteIncident(query: FilterQuery<IncidentDocument>) {
    return IncidentModel.deleteOne(query);
}

export async function filterIncident(
    query: FilterQuery<IncidentDocument>
) {
    try{
        const result = await IncidentModel.find({}).where('status').equals(query);
        return result;
    } catch(e){
        throw e;
    }
}