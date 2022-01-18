import { Request, Response } from "express";
import config from "config";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from '../utils/jwt.utils';


export async function createUserSessionHandler(req: Request, res: Response) {

    // VALIDATE THE USER'S PASSWORD
        const user = await validatePassword(req.body);
    
    if(!user){
        return res.status(401).send("Unauthorized user credentials");
    }

    // CREATE A SESSION
    const session = await createSession(user._id, req.get("user-agent") || "");

    // CREATE AN ACCESS TOKEN
    const accessToken = signJwt(
        { ...user, session: session._id },
        "accessTokenPrivateKey",
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    // CREATE A REFRESH TOKEN
    const refreshToken = signJwt(
        { ...user, session: session._id },
        "refreshTokenPrivateKey",
        { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
    );

    return res.send({ user, accessToken, refreshToken });
    /*res.cookie("accessToken", accessToken, {
        maxAge: 900000, // 15 minutes
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10,
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false
    });

    return res.send({ accessToken, refreshToken });*/
}

export async function getUserSessionsHandler(req: Request, res: Response){
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response){
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null
    });
}