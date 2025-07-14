import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { error } from "console";
import { connectDb } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    error: "Email and password are required.",
                },
                { status: 400 }
            );
        }

        await connectDb();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                {
                    error: "User Already Exists.",
                },
                {
                    status: 400,
                }
            );
        }

        await User.create({
            email,
            password,
        });

        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.log("Registration Post error: ", error);
        return NextResponse.json(
            {
                error: "Failed to register user",
            },
            {
                status: 400,
            }
        );
    }
}
