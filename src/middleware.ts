import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";
import { logMiddleware } from "./middlewares/api/logMiddleware";


export const config = {
    matcher: "/api/:path*"
};


export default function middleware(request: Request) {
    const authResults = authMiddleware(request);

    if (request.url.includes("/api/faturalar")) {
        const logResult = logMiddleware(request);
        console.log(logResult.response);
    }

    if(!authResults?.isValid) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401
        })
    }
    return NextResponse.next();
}