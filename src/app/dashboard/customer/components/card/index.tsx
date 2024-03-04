"use client";

import { CustomersProps } from "@/utils/customers.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function CardCustumer({ customers }: { customers: CustomersProps }) {
  const router = useRouter();
  
  async function handleDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customers.id,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Cliente deletado"
      });
      router.refresh();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao deletar cliente",
      });
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> {customers.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customers.email}
      </p>
      <p>
        <a className="font-bold">Telefone:</a> {customers.phone}
      </p>

      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-end"
        onClick={handleDeleteCustomer}
      >
        DELETAR
      </button>
    </article>
  );
}
