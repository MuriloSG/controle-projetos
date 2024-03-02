
export function CardCustumer() {
  return (
    <article className="flex flex-col bg-gray-100 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> Mercado Livre
      </h2>
      <p>
        <a className="font-bold">Email:</a> teste@teste.com
      </p>
      <p>
        <a className="font-bold">Telefone:</a> 38 998380899
      </p>

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-end">
        DELETAR
      </button>
    </article>
  );
}
