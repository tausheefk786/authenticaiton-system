import { getdatafromtoken } from "@/helpers/getdatafromtoken";

import { NextRequest,NextResponse } from "next/server";


import User from "@/models/userModel";

import { Connect }  from "vite";

connect();

export async function GET(request: NextResponse){

    try {
        await userid = await getdatafromtoken(request);
        const user = await User.findOne({_id: userId}).
        select("-password")
        return NextResponse.json({
            message: "User found",
            data: user
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},
            {status: 400}
        )
        
    }
}