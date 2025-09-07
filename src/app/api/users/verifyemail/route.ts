import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("Token received:", token);

    // Find user with valid token and expiry
    const user = await User.findOne({
      verifytoken: token,
      verifytokenexpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    console.log("User found:", user);

    // Update user fields
    user.isverified = true;
    user.verifytoken = undefined;
    user.verifytokenexpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
