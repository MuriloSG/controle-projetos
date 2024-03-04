import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json({
      error: "Failed create new ticket"
    }, {
      status: 400
    });
  }
  try {
    await prisma.ticket.create({
      data: {
        name: name,
        descrption: description,
        status: "ABERTO",
        custumerId: customerId
      }
    });

    return NextResponse.json({
      message: "Chamado registrado com sucesso"
    });
    
  } catch (error) {
    return NextResponse.json({
      error: "Failed create new ticket"
    }, {
      status: 400
    });
  }
  

  return NextResponse.json({
    message: "Chegou"
  })
  
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string
    }
  });

  if (!findTicket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string
      },
      data: {
        status: "FECHADO"
      }
    });

    return NextResponse.json({message: "Chamado atualizado com sucesso"})
  } catch (error) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }
}
