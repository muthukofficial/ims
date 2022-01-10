import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *    schema:
 *      Contact:
 *          type: object
 *          required:
 *            - email
 *            - fullName
 *          properties:
 *            email:
 *              type: string
 *            fullName:
 *              type: string
 *            phoneNo:
 *              type: string
 *            websites:
 *              type: string
 *            notes:
 *              type: string
 */

const payload = {
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        fullName: string({
            required_error: "Name is required"
        }),
        phoneNo: string(),
        websites: string(),
        notes: string()
    })
};

const params = {
    params: object({
        contactId: string({
            required_error: "Contact Id is required"
        })
    })
};

export const createContactSchema = object({
    ...payload
});

export const updateContactSchema = object({
    ...payload,
    ...params
});

export const deleteContactSchema = object({
    ...params
});

export const getContactSchema = object({
    ...params
});

export const listContactSchema = object({});

export type CreateContactInput = TypeOf<typeof createContactSchema>;
export type UpdateContactInput = TypeOf<typeof updateContactSchema>;
export type ReadContactInput = TypeOf<typeof listContactSchema>;
export type DeleteContactInput = TypeOf<typeof deleteContactSchema>;