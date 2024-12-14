const validate = (token: any) => {
    const validToken = process.env.TOKEN;
    if (!validToken || !token) {
        return false;
    }
    return true;
}

export function authMiddleware(request: Request): any {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (token === process.env.TOKEN) {
        return {isValid: validate(token)};
    }
}