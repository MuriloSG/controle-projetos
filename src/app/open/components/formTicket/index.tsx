"use client"

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  description: z.string().min(1, "Descrição obrigatoria"),
})

type FormData = z.infer<typeof schema>

interface FormTicketProps{
  customer: CustomerDataInfo;
}

export function FormTicket({customer}: FormTicketProps) {

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  async function handleRegisterTicket(data: FormData) {
    setLoading(true)
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id
    });

    setLoading(false)
    setValue("name", "");
    setValue("description", "");
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterTicket)}
      className="bg-slate-200 mt-6 px-4 py-6 rounded border-2"
    >
      <label className="mb-1 font-medium text-lg">Nome do chamado</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome do chamado..."
        error={errors.name?.message}
        register={register}
      />

      <label className="mb-1 font-medium text-lg">Descrição do chamado</label>
      <textarea
        className="w-full border-2 rounded-md h-24 resize-none px-2"
        placeholder="Digite a descrição do chamado..."
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 mb-4 mt-1">{errors.description.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold"
      >
        {loading ? "CADASTRANDO..." : "CADASTRAR"}
      </button>
    </form>
  );
}
