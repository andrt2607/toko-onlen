import Response from "@/lib/api.response";
import { NextResponse } from "next/server";

//contoh return api get
export async function GET() {
  return Response({
    message: "Get All User",
    data: [
      {
        id: 1,
        name: "Alif",
      },
      {
        id: 2,
        name: "Andarta",
      },
    ],
    status: 200,
  });
}

//contoh return api post
export async function POST() {
  return NextResponse.json(
    {
      success: true,
      message: "New User created",
      data: [
        {
          id: 1,
          name: "Alif",
        },
      ],
    },
    { status: 201 }
  );
}
