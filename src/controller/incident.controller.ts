import { Request, Response } from "express";
import { CreateIncidentInput, UpdateIncidentInput, ReadIncidentInput, listFilterByStatusSchema } from '../schema/incident.schema';
import { createIncident, deleteIncident, filterIncident, findAndUpdateIncident, findIncident, listIncident } from "../service/incident.service";

export async function createIncidentHandler(
    req: Request<{}, {}, CreateIncidentInput["body"]>,
    res: Response
) {
    const _incident = await createIncident(req.body);
    return res.send(_incident);
}

export async function getIncidentHandler(
    req: Request<UpdateIncidentInput["params"]>,
    res: Response
) {
    const id = req.params._id;
    const _incident = await findIncident({ id });

    if(!_incident){
        return res.sendStatus(404);
    }
    return res.send(_incident);
}

export async function listIncidentHandler(req: Request<ReadIncidentInput>, res: Response) {
    const _incident = await listIncident();

    return res.send(_incident);
}

export async function updateIncidentHandler(
    req: Request<UpdateIncidentInput["params"]>,
    res: Response
){
    const id = req.params._id;

    const _incident = await findIncident({ id });

    if(!_incident){
        return res.sendStatus(404);
    }

    const _updateIncident = await findAndUpdateIncident({ id }, req.body, { new: true });
    return res.send(_updateIncident);
}

export async function deleteIncidentHandler(
    req: Request<UpdateIncidentInput["params"]>,
    res: Response
){
    const id = req.params._id;

    const _incident = await findIncident({ id });

    if(!_incident){
        return res.sendStatus(404);
    }

    await deleteIncident({ id });

    return res.sendStatus(200);
}