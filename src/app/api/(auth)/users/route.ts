import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";


// Define ObjectId data type from mongoose
const ObjectId = require("mongoose").Types.ObjectId;


export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200});
    } catch (err: any) {
        return new NextResponse("Error fetching users" + err.message, {
            status: 500
        });
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(JSON.stringify({message: "User is created.", user: newUser}), {
            status: 200
        })
    } catch (err: any) {
        return new NextResponse("Error in creating users" + err.message, {
            status: 500
        });
    }
}


export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const {userId, newUsername, newEmail} = body;
        await connect();

        if (!userId || !newUsername || !newEmail) {
            return new NextResponse(JSON.stringify({message: "ID, new username or new email not found"}), {
                status: 400
            });
        }


        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid user ID"}), {
                status: 400
            });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUsername, email: newEmail },
            { new: true }
        );

        return new NextResponse(JSON.stringify({user: updatedUser}), {
            status: 200
        });

    } catch (err: any) {
        return new NextResponse("Error in updating users" + err.message, {
            status: 500
        });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new NextResponse(JSON.stringify({message: "ID not found"}), {
                status: 400
            });
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid user ID"}), {
                status: 400
            });
        }

        await connect();

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        );

        if(!deletedUser) {
            return new NextResponse(JSON.stringify({ message: "User not found on database"}), {
                status: 404
            });
        }

        return new NextResponse(JSON.stringify({message: "User is deleted", user: deletedUser}), {
            status: 200
        });

    } catch (err: any) {
        return new NextResponse("Error in deleting users" + err.message, {
            status: 500
        });
    }
} 
