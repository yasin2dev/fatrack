import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/categories";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Fatura from "@/lib/modals/fatura";

export const GET = async (request: Request, context: {params: any}) => {
    const faturaId = context.params.fatura;
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
         
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "userId missing or invalid"}), {
                status: 400
            });            
        }

        if (!faturaId || !Types.ObjectId.isValid(faturaId)) {
            return new NextResponse(JSON.stringify({message: "faturaId missing or invalid"}), {
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

        const fatura = await Fatura.findOne({
            _id: faturaId,
            user: userId,
        });

        if(!fatura) {
            return new NextResponse(JSON.stringify({message: "fatura not found on database"}), {
                status: 404
            });
        }

        return new NextResponse(JSON.stringify({ fatura }), {
            status: 200
        })

    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            message: "Error in getting specific fatura" + err.message
        }), {
            status: 500
        })
    }
} 

export const PATCH = async (request: Request, context: {params: any}) => {
    const faturaId = context.params.fatura;
    try {
        const body = await request.json();
        const {title, origin, root_amount, tax_val, total, owner} = body;

        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "userId missing or invalid"}), {
                status: 400
            });            
        }

        if (!faturaId || !Types.ObjectId.isValid(faturaId)) {
            return new NextResponse(JSON.stringify({message: "faturaId missing or invalid"}), {
                status: 400
            })
        }

        await connect();

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({message: "user not found"}), {
                status: 400
            });
        }

        const fatura = await Fatura.findById(faturaId);

        if (!fatura) {
            return new NextResponse(JSON.stringify({message: "fatura not found"}), {
                status: 400
            });
        }

        const updatedFatura = await Fatura.findByIdAndUpdate(
            faturaId, 
            { title, origin, root_amount, tax_val, total, owner },
            { new: true }
        );

        return new NextResponse(JSON.stringify({message: "Fatura updated", fatura: updatedFatura}), {status: 200});
        
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            message: "Error in updating specific fatura" + err.message
        }), {
            status: 500
        })
    }
}

export const DELETE = async (request: Request, context: {params: any}) => {
    const faturaId = context.params.fatura;
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "userId missing or not found"}), {
                status: 400
            });
        };

        if (!faturaId || !Types.ObjectId.isValid(faturaId)) {
            return new NextResponse(JSON.stringify({message: "faturaId missing or not found"}), {
                status: 400
            });   
        }

        await connect();

        const user = await User.findById(userId);
        
        if (!user) {
            return new NextResponse(JSON.stringify({message: "user not found with this ID on database"}), {
                status: 404
            });
        }

        const fatura = await Fatura.findById(faturaId)

        if (!fatura) {
            return new NextResponse(JSON.stringify({message: "fatura not found with this ID on database"}), {
                status: 404
            });
        }

        const deletedFatura = await Fatura.findByIdAndDelete(faturaId)
        
        return new NextResponse(JSON.stringify({message: "Fatura successfully deleted from table", deletedFatura: deletedFatura}), {
            status: 200
        });

    } catch (err: any) {
        return new NextResponse(JSON.stringify({message: "Error on deleting fatura" + err.message}))
    }
}
