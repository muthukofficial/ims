import { Request, Response } from "express";
import { CreateContactInput, ReadContactInput, UpdateContactInput } from '../schema/contact.schema';
import { createContact, findAndUpdateContact, findContact, deleteContact, listContact } from "../service/contact.service";

export async function createContactHandler(
    req: Request<{}, {}, CreateContactInput["body"]>,
    res: Response
) {
    const _contact = await createContact(req.body);

    return res.send(_contact);
}

export async function updateContactHandler(
    req: Request<UpdateContactInput["params"]>,
    res: Response
) {
    const contactId = req.params.contactId;
    
    const _contact = await findContact({ contactId });

    if(!_contact){
        return res.sendStatus(404);
    }

    const _updatedContact = await findAndUpdateContact({ contactId }, req.body, {
        new: true
    });
    return res.send(_updatedContact);
}

export async function getContactHandler(
    req: Request<UpdateContactInput["params"]>,
    res: Response
) {
    const contactId = req.params.contactId;
    const contact = await findContact({ contactId });

    if(!contact) {
        return res.sendStatus(404);
    }
    return res.send(contact);
}

export async function listContactHandler(req: Request<ReadContactInput>, res: Response){
    const contact = await listContact();

    return res.send(contact);
}

export async function deleteContactHandler(
    req: Request<UpdateContactInput["params"]>,
    res: Response
) {
    const contactId = req.params.contactId;

    const contact = await findContact({ contactId });

    if(!contact){
        return res.sendStatus(404);
    }

    await deleteContact({ contactId });

    return res.sendStatus(200);
}