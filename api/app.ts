import { VercelRequest, VercelResponse } from "@vercel/node";
import { NOT_FOUND, OK } from "http-status-codes";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET")
    return res.status(OK).send({ message: "OK", statusCode: OK, data: null });

  return res
    .status(NOT_FOUND)
    .json({ message: "Not Found", statusCode: NOT_FOUND, data: null });
};
