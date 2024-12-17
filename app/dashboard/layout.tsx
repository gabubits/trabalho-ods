import HeaderDepartamento from "@/components/HeaderDepartamento";
import { verifySession } from "@/lib/session";
import prisma from "@/prisma/db";
import { TipoUsuario } from "@prisma/client";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  const usuarioLogado = await prisma.usuarioComum.findMany({
    where: {
      numero_cpf: session?.userId,
    },
    select: {
      tipo: true,
    },
  });

  if (usuarioLogado[0].tipo === TipoUsuario.DEPARTAMENTO) {
    return (
      <>
        <HeaderDepartamento />
        {children}
      </>
    );
  }
}
