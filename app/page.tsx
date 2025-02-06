import Header from "@/components/Header";
import Inicio from "@/components/Inicio";
import Projetos from "@/components/Projetos";

export default function Home() {
  return (
    <>
      <Header />
      <Inicio />
      <Projetos />
      <div className="bg-zinc-900 w-screen h-auto ">
        <hr className=" mx-16 " />
        <div className="bg-white" id="contato">
          <h1 className="text-black font-bold text-4xl text-center pt-5">
            Entre em contato
          </h1>

          <div className="my-10">
            <div className=" mx-36 mb-10 drop-shadow-md border-x-2 border-b-2 border-grey-100">
              <div className="space-y-4 grid pl-10 pb-4">
                <h2 className="font-semibold underline">
                  EDUCAÇÃO A DISTÂNCIA
                </h2>
                <p className="text-black ">Email: sup@ufgwj.edu.br</p>
                <p className="text-black ">Telefone: (37) 99999-9999</p>
              </div>
            </div>
            <div className=" mx-36 mb-10  drop-shadow-md border-x-2 border-b-2 border-grey-100">
              <div className="space-y-4 grid pl-10 pb-4">
                <h2 className="font-semibold underline">
                  MATRÍCULAS E TRANSFERÊNCIAS
                </h2>
                <p className="text-black ">Email: sup@ufgwj.edu.br</p>
                <p className="text-black ">Telefone: (37) 99999-9999</p>
              </div>
            </div>
            <div className=" mx-36 mb-10  drop-shadow-md border-x-2 border-b-2 border-grey-100">
              <div className="space-y-4 grid pl-10 pb-4">
                <h2 className="font-semibold underline">REITORIA</h2>
                <p className="text-black ">Email: sup@ufgwj.edu.br</p>
                <p className="text-black ">Telefone: (37) 99999-9999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
