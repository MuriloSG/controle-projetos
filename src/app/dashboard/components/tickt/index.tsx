"use client";

import { CustomersProps } from "@/utils/customers.type";
import { TicketsProps } from "@/utils/tickets.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface TicketItemProps {
  ticket: TicketsProps;
  customer: CustomersProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button onClick={handleChangeStatus} className="mr-2">
            <FiCheckSquare size={25} color="#9e8b8b" />
          </button>
          <button>
            <FiFile size={25} color="#1200dc" />
          </button>
        </td>
      </tr>
    </>
  );
}
