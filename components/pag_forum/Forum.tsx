"use client";
import Link from "next/link";
import React from "react";

const Forum = ({ topicos }: any) => {
  // console.log(topicos);
  return (
    <div className="bg-white-100 w-screen flex justify-center items-center flex-col">
      <h1
        className="text-black  font-bold text-4xl text-center pt-5"
        id="forum"
      >
        Fórum
      </h1>
      <div className="my-10 flex justify-center">
        <div className="h-[500px] w-[1000px] rounded-md bg-slate-50 overflow-x-auto p-5 shadow-lg ">
          <table className="table-auto mt-6 w-full border-collapse text-sm text-left">
            <tbody>
              {topicos.map((topico) => (
                <tr key={topico.id} className="border-b border-gray-300">
                  <td className="px-4 py-2">
                    <Link href={`forum/topico/${topico.id}`}>
                      <p className="text-xl">{topico.nome}</p>
                      <p className="text-md mt-3">
                        Enviado por: {topico.orientador_nome}
                      </p>
                    </Link>
                  </td>
                  <td className="px-4 text-xl py-2 text-gray-500">
                    {topico.data_termino}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Forum;
