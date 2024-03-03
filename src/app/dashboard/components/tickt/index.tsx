import { CustomersProps } from "@/utils/customers.type";
import { TicketsProps } from "@/utils/tickets.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketsProps;
  customer: CustomersProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
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
          <button className="mr-2">
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
