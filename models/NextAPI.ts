import {NextApiRequest, NextApiResponse} from "next";

export interface NextAPI{
    req: NextApiRequest,
    res: NextApiResponse
}