import { Container } from "@/components/container";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-cyan-400 my-4 p-3 rounded flex items-center justify-center gap-10">
        <Link
          href="/dashboard"
          className="text-white hover:font-bold duration-300"
        >
          Chamados abertos
        </Link>
        <Link
          href="/dashboard/customer"
          className="text-white hover:font-bold duration-300"
        >
          Clientes
        </Link>

        <Link
          href="/dashboard/locktickets"
          className="text-white hover:font-bold duration-300"
        >
          Chamados concluidos
        </Link>
      </header>
    </Container>
  );
}
