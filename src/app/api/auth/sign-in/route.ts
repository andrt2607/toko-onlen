import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // const data = payload;
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    console.log("payload password ", payload.password );
    console.log("user password ", user?.password );
    //ini masih error
    // const statusCheck = bcrypt.compareSync(payload.password, user?.password!!);
    // console.log("compare password ", statusCheck );
    if(!user){
        console.log("masuk sini");
        return Response({
            message: "Incorrect email or password",
            status: 404,
        });
    }

    const data: Partial<User> = {
        ...user,
        password: undefined
    };

    console.log("ini user : ", user)
    // const data = user;
    return Response({
        message: "Sign in successfully",
        data,
    });
  } catch (error: any) {
    return Response({
      message: "Sign in successfully",
      data: error,
      status: 500,
    });
  }
}
