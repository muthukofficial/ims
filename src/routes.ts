import { Express, Request, Response } from "express";
import { createUserHandler, getUserHandler, listUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createUserSchema, listUserSchema, getUserSchema } from './schema/user.schema';
import { createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from './middleware/requireUser';
import { createContactHandler, deleteContactHandler, getContactHandler, listContactHandler, updateContactHandler } from "./controller/contact.controller";
import { createContactSchema, deleteContactSchema, getContactSchema, listContactSchema, updateContactSchema } from "./schema/contact.schema";
import { createCategoryHandler, getCategoryHandler, listCategoryHandler } from "./controller/category.controller";
import { createCategorySchema, getCategorySchema, listCategorySchema, updateCategorySchema } from './schema/category.schema';
import { createIncidentHandler, deleteIncidentHandler, getIncidentHandler, listIncidentHandler, updateIncidentHandler } from "./controller/incident.controller";
import { createIncidentSchema, listIncidentSchema, getIncidentSchema, updateIncidentSchema, deleteIncidentSchema } from './schema/incident.schema';

function routes(app: Express){

    /**
     * @openapi
     * /healthcheck:
     *  get:
     *      tags:
     *      - Healthcheck
     *      description: Reponses if the application is Up and running
     *      responses:
     *          200:
     *              description: Application is up and running
     */
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    /**
     * @openapi
     * '/api/users':
     *  post:
     *      tags:
     *      - User
     *      summary: Create a new user
     *      requestBody:
     *        required: true
     *        content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/CreateUserInput'
     *      responses:
     *        200:
     *          description: Success
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/CreateUserResponse'
     *        409:
     *          description: Conflict
     *        400:
     *          description: Bad request
     */
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    app.get("/api/users", [ requireUser, validateResource(listUserSchema) ], listUserHandler);

    app.get("/api/users/:_id", [ requireUser, validateResource(getUserSchema) ], getUserHandler);

    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

    app.get("/api/sessions", requireUser, getUserSessionsHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);

    app.post("/api/contacts", [ requireUser, validateResource(createContactSchema)], createContactHandler);

    app.get("/api/contacts", [ requireUser, validateResource(listContactSchema) ], listContactHandler);

    app.get("/api/contacts/:contactId", [ requireUser, validateResource(getContactSchema) ], getContactHandler);

    app.put("/api/contacts/:contactId", [requireUser, validateResource(updateContactSchema)], updateContactHandler);

    app.delete("/api/contacts/:contactId", [requireUser, validateResource(deleteContactSchema)], deleteContactHandler);

    app.post("/api/category", [ requireUser, validateResource(createCategorySchema) ], createCategoryHandler);

    app.get("/api/category/:categoryId", [ requireUser, validateResource(getCategorySchema) ], getCategoryHandler);

    app.get("/api/category", [ requireUser, validateResource(listCategorySchema) ], listCategoryHandler);

    app.post("/api/incident", [ requireUser, validateResource(createIncidentSchema) ], createIncidentHandler);

    app.get("/api/incident", [ requireUser, validateResource(listIncidentSchema) ], listIncidentHandler);

    app.get("/api/incident/:_id", [ requireUser, validateResource(getIncidentSchema) ], getIncidentHandler);

    app.put("/api/incident/:_id", [ requireUser, validateResource(updateIncidentSchema) ], updateIncidentHandler);

    app.delete("/api/incident/:_id", [ requireUser, validateResource(deleteIncidentSchema) ], deleteIncidentHandler);
}

export default routes;