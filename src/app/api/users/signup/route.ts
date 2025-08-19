import {connect} from "@/dbconfig/dbconfig";
import User from  "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password}= reqBody
        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "user already exists"},{status: 400})

        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser=new User({
            username,
            email,
            password: hashedpassword
        })


        // User.findOne({email: email},async( error,user)=>{

        // })
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})

        
    }
}