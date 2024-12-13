import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/categories";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Fatura from "@/lib/modals/fatura";

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const categoryId = searchParams.get("categoryId")
        
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "userId missing or invalid"}), {
                status: 400
            });            
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(JSON.stringify({message: "categoryId missing or invalid"}), {
                status: 400
            })
        }

        await connect()

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({message: "user not found"}), {
                status: 400
            });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return new NextResponse(JSON.stringify({message: "category not found"}), {
                status: 400
            });
        }

        const filter: any = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId)
        };

        const faturalar = await Fatura.find(filter);

        return new NextResponse(JSON.stringify({faturalar}), {
            status: 200
        })

        
    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: "Error in getting fatura!" + err.message}), {
            status: 500
        })
    }
}