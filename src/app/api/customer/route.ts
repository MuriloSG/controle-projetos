import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === null) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }
  
  try {
    const customer = await prisma.custumer.findFirst({
      where: {
        email: customerEmail
      }
    });

    return NextResponse.json(customer);
    
  } catch (error) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }
  
}

export async function POST(request: Request) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({
      error: "Not authorized"
    }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

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
      message: "Cliente criado com sucesso"
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed create new customer"
    }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({
      error: "Not authorized"
    }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({
      error: "Failed delete customer"
    }, { status: 400 });
  }

  const findTickts = await prisma.ticket.findFirst({
    where: {
      custumerId: userId
    }
  });

  if (findTickts) {
    return NextResponse.json({
      error: "Failed delete customer"
    }, { status: 400 });
  }

  try {
    await prisma.custumer.delete({
      where: {
        id: userId as string,
      }
    });
    return NextResponse.json({
      message: "Cliente deletado com sucesso"
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed delete customer"
    }, { status: 400 });
  }

}
