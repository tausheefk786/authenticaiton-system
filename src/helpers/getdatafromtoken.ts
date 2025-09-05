 import { NextRequest } from "next/server";
 import jwt from "jsonwebtoken";
 export const getdatafromtoken = (request: NextRequest) =>{
    try {
        const tpken = request.cookies.get("token")?.value ||
        ' ';
        const decodedtoken = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedtoken.id;
    } catch (error: any) {
        throw new error(error.message);

    }
 }