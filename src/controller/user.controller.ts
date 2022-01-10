import { Request, Response } from "express";
import { CreateUserInput, ReadUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findUser, listUsers } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch(e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function listUserHandler(req: Request<ReadUserInput>, res: Response) {
    const users = await listUsers();

    return res.send(users);
}

export async function getUserHandler(
    req: Request<UpdateUserInput["params"]>,
    res: Response
) {
    const id = req.params._id;
    const _user = await findUser({ id });

    if(!_user){
        return res.sendStatus(404);
    }
    return res.send(_user);
}