import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.custumer.findMany({
    where: {
      userId: session.user.id
    }
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server"
    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }
    
    await prisma.ticket.create({
      data: {
        name: name as string,
        descrption: description as string,
        custumerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id
      }
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            VOLTAR
          </Link>
          <h1 className="text-3xl font-bold">NOVO CHAMADO</h1>
        </div>

        <form action={handleRegisterTicket} className="flex flex-col mt-6">
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            type="text"
            placeholder="Digite o nome..."
            required
            name="name"
          />
          <label className="mb-1 font-medium text-lg">Descreva o chamado</label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            placeholder="Descreva o chamado..."
            required
            name="description"
          ></textarea>
          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                name="customer"
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white">
                {customers.map((customers) => (
                  <option key={customers.id} value={customers.id}>
                    {customers.name}
                  </option>
                ))}
              </select>
            </>
          )}
          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você não possui clientes🙃
              <span
                className="text-blue-500 font-medium"
              > Cadastrar Cliente</span>
            </Link>
          )}

          <button
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length ===0}
            type="submit"
          >
            CADASTRAR
          </button>
        </form>
      </main>
    </Container>
  );
}
