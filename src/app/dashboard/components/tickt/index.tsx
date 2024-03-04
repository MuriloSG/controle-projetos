"use client";

import { CustomersProps } from "@/utils/customers.type";
import { TicketsProps } from "@/utils/tickets.type";
import { FiCheckSquare, FiFile, FiTrash } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
import Swal from "sweetalert2";

interface TicketItemProps {
  ticket: TicketsProps;
  customer: CustomersProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {

  const router = useRouter();

  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });
      router.refresh();
      Swal.fire({
        icon: "success",
        title: "Chamada finalizado",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao finalizar chamado",
      });
    }
  }

  async function handleDeleteTicket() {
    try {
      const response = await api.delete("/api/ticket", {
        params: {
          id: ticket.id,
        },
      });
      router.refresh();
      Swal.fire({
        icon: "success",
        title: "Chamada excluido",
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao excluir chamado",
      });
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket
    })
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          {ticket.status === "ABERTO" && (
            <span className="bg-green-500 px-2 py-1 rounded">
              {ticket.status}
            </span>
          )}
          {ticket.status === "FECHADO" && (
            <span className="bg-red-500 px-2 py-1 rounded">
              {ticket.status}
            </span>
          )}
        </td>
        <td className="text-left">
          {ticket.status === "ABERTO" && (
            <button onClick={handleChangeStatus} className="mr-2">
              <FiCheckSquare size={25} color="#9e8b8b" />
            </button>
          )}
          {ticket.status === "FECHADO" && (
            <button onClick={handleDeleteTicket} className="mr-2">
              <FiTrash size={25} color="#ff0000" />
            </button>
          )}
          <button onClick={handleOpenModal}>
            <FiFile size={25} color="#1200dc" />
          </button>
        </td>
      </tr>
    </>
  );
}
