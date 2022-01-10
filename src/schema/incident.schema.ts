import { object, number, string, TypeOf, date } from "zod";

const payload = {
    body: object({
        owner: string(),
        incidentNumber: string({
            required_error: "Incident number is required"
        }),
        callerName: string({
            required_error: "Select the caller name"
        }),
        category: string({
            required_error: "Select the category type"
        }),
        subject: string(),
        description: string(),
        priority: number(),
        status: string()
    })
};

const params = {
    params: object({
        _id: string()
    })
};

const statusFilter = {
    params: object({
        status: string()
    })
};

export const createIncidentSchema = object({
    ...payload
});

export const updateIncidentSchema = object({
    ...payload,
    ...params
});

export const getIncidentSchema = object({
    ...params
});

export const deleteIncidentSchema = object({
    ...params
});

export const listIncidentSchema = object({});

export type CreateIncidentInput = TypeOf<typeof createIncidentSchema>;
export type ReadIncidentInput = TypeOf<typeof listIncidentSchema>;
export type UpdateIncidentInput = TypeOf<typeof updateIncidentSchema>;
export type DeleteIncidentInput = TypeOf<typeof deleteIncidentSchema>;