import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateUserInput:
 *          type: object
 *          required:
 *              - email
 *              - firstName
 *              - lastName
 *              - password
 *              - passwordConfirmation
 *          properties:
 *              email:
 *                  type: string
 *                  default: xxx@example.com
 *              firstName:
 *                  type: string
 *                  default: John
 *              lastName:
 *                  type: string
 *                  default: XXX
 *              password:
 *                  type: string
 *                  default: Admin123
 *              passwordConfirmation:
 *                  type: string
 *                  default: Admin123
 *          CreateUserResponse:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  _id:
 *                      type: string
 *                  createdAt:
 *                      type: string
 *                  updatedAt:
 *                      type: string
 */
const payload = {
    body: object({
        firstName: string({
            required_error: "First Name is required"
        }),
        lastName: string({
            required_error: "Last Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password too short - should be 6 characters minimum"),
        passwordConfirmation: string({
            required_error: "Confirm password is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password don't match",
        path: ["passwordConfirmation"]
    })
};

const params = {
    params: object({
        _id: string()
    })
};

export const createUserSchema = object({
    ...payload
});

export const updateUserSchema = object({
    ...payload,
    ...params
});

export const getUserSchema = object({
    ...params
});

export const listUserSchema = object({});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type ReadUserInput = TypeOf<typeof listUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;