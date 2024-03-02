import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {

  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({
      error: "Not authorized"
    }, { status: 401 });
  }

  const { name, email, phone, address,userId } = await request.json();

  try {

    await prisma.custumer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId
      }
    });

    return NextResponse.json({
      message: "Cusmeter created sucessfully"
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed create new customer"
    }, { status: 400 });
  }
}
