import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect} from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/tickt";
import prisma from "@/lib/prisma";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      status: "ABERTO",
      custumer: {
        userId: session.user.id
      }
    },
    include: {
      custumer:true
    },
    orderBy: {
      created_at: "desc"
    }
  });


  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">CHAMADOS</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            ABRIR CHAMADO
          </Link>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                DATA CADASTRO
              </th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                ticket={ticket}
                customer={ticket.custumer}
                key={ticket.id}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="text-3xl font-bold flex justify-center items-center mt-16">Nenhum chamado🙃</h1>
        )}
      </main>
    </Container>
  );
}
