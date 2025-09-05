import {connect} from "@/dbconfig/dbconfig";
import User from  "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody= await request.json()
        const {email,password}= reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"},
                {status: 400})
        }
        const validpassword = await bcryptjs.compare(
            password,user.password
        )
        if(!validpassword){
            return NextResponse.json({error: "invalid password"},
                {status: 400}
            )
        }

        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(tokendata,process.env.TOKEN_SECRET!
            ,{expiresIn : "1h"}
        )
        const response = NextResponse.json({
            message: "login successful",
            success: true,
        })
        response.cookies.set("token",token,{
            httpOnly: true,
            path: "/"
        })
        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}