import {connect} from "@/dbconfig/dbconfig.ts";
import User from  "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username,emai,password}= reqBody
        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "user already exists"},{status: 400})

        }

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password,salt)

        const newUser=new User({
            username,
            email,
            password: hashedpassword
        })


        User.findOne({email: email},async( error,user)=>{

        })
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})

        
    }
}