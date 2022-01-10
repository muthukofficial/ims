import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        type: string({
            required_error: "Category type is required"
        })
    })
};

const params = {
    params: object({
        categoryId: string({
            required_error: "Category Id is required"
        })
    })
};

export const createCategorySchema = object({
    ...payload
});

export const getCategorySchema = object({
    ...params
});

export const updateCategorySchema = object({
    ...payload,
    ...params
});

export const listCategorySchema = object({});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type ReadCategoryInput = TypeOf<typeof listCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;