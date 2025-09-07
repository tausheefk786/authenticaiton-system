import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getdatafromtoken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const decodedtoken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;

    return decodedtoken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
