import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

//contoh return api get
export async function GET(req: NextRequest, params: Params) {
    const id = params.params.id
  return NextResponse.json(
    {
      success: true,
      message: `Get detail user by id ${id}`,
      data: [
        {
          id: 1,
          name: "Alif",
        },
      ],
    },
    { status: 200 }
  );
}