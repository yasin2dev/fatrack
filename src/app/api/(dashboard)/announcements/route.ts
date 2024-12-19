import connect from "@/lib/db";
import Announcement from "@/lib/modals/announcement"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    try {
        
        await connect();       
        
        const announcements = await Announcement.find();
        
        return new NextResponse(JSON.stringify(announcements), {
            status: 200
        });
    } catch (err: any) {
        return new NextResponse(JSON.stringify("Error in getting announcements" + err.message), {status: 500})
    }    
};



export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const {title, content, status} = body;

        await connect();

        const newAnn = new Announcement({
            title,
            content,
            status
        });

        await newAnn.save();

        return new NextResponse(JSON.stringify({message: "Announcement successfully created", newAnn}), {
            status: 200
        })
    } catch (err: any) {
        return new NextResponse(JSON.stringify("Error in posting new Announcement" + err.message), {
            status: 500
        })
    }
}