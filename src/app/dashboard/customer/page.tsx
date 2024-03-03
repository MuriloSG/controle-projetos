import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustumer } from "./components/card";
import prisma from "@/lib/prisma";

export default async function Custumer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

    const customers = await prisma.custumer.findMany({
      where: {
        userId: session.user.id,
      },
    });
  
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold ">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white p-4 py-1 rounded"
          >
            NOVO CLIENTE
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {customers.map((customers) => (
            <CardCustumer
              key={customers.id}
              customers={customers}
            />
          ))}
        </section>

        {customers.length === 0 && (
          <h1 className="text-gray-900 text-3xl font-bold flex items-center justify-center mt-10 ">Não possui clientes🙃</h1>
        )}
      </main>
    </Container>
  );
} 
