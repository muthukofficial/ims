import { Request, Response } from "express";
import { CreateCategoryInput, ReadCategoryInput, UpdateCategoryInput } from '../schema/category.schema';
import { createCategory, findCategory, listCategory } from "../service/category.service";

export async function createCategoryHandler(
    req: Request<{}, {}, CreateCategoryInput["body"]>,
    res: Response
) {
    const _category = await createCategory(req.body);

    return res.send(_category);
}

export async function getCategoryHandler(
    req: Request<UpdateCategoryInput["params"]>,
    res: Response
) {
    const categoryId = req.params.categoryId;
    const _category = await findCategory({ categoryId });

    if(!_category) {
        return res.sendStatus(404);
    }
    return res.send(_category);
}

export async function listCategoryHandler(req: Request<ReadCategoryInput>, res: Response){
    const _category = await listCategory();

    return res.send(_category);
}