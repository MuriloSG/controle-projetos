"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Digite um email valído").min(1, "Email obrigatório"),
  phone: z.string().refine((value) => {
    return /^(?:\(d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
  }, {
    message: "Numero de telefone deve ser (DD) 999999999"
  }),
  address: z.string(),
});

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}: {userId: string}) {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlerRegisterCustumer(data: FormData) {
    setLoading(true);
    const response = await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      userId: userId,
      address: data.address
    });

    setLoading(false);
    router.replace("/dashboard/customer");
    router.refresh();
    Swal.fire({
      icon: "success",
      title: "Cliente cadastrado"
    })
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handlerRegisterCustumer)}
    >
      <label className="mb-1 text-lg font-medium">Nome completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo..."
        error={errors.name?.message}
        register={register}
      />

      <section className="flex gap-2 mt-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="number"
            name="phone"
            placeholder="Digite o telefone..."
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email..."
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="mb-1 text-lg font-medium">Endereço completo</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço completo..."
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold "
      >
        {loading ? "CADASTRANDO" : "CADASTRAR"}
      </button>
    </form>
  );
}
