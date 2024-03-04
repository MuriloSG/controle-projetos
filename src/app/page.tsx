import Image from "next/image";
import imgHeader from "@/assets/gestao-de-projetos.png";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col min-h-[calc(100vh-88px)]">
      <h2 className="font-medium text-2xl mb-2">
        Gerênciando os seus projetos
      </h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-500 md:text-4xl">Atendimentos</h1>

      <Image
        src={imgHeader}
        alt="Logo do painel"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
