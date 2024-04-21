import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
// import bcrypt from 'bcrypt';

export async function POST(req:Request) {
    try {
        const payload = await req.json();
        const data: Prisma.UserCreateInput = {
            name: payload.name, 
            email: payload.email,
            password: payload.password,
            // password: bcrypt.hashSync(payload.password, 8),
        }
        const user = await prisma.user.create({
            data: data,
        })
        const result: Partial<User> = {
            ...user,
            password: undefined
        };
        return Response({
            message: 'User registered successfully',
            data: result,
        });
    } catch (error: any) {
        return Response({
            message: 'User registered failed',
            data: error,
            status: 500,
        })
    }
}