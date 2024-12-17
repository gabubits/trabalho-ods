import { verifySession } from "@/lib/session";
import prisma from "@/prisma/db";
import React from "react";
import { TipoUsuario } from "@prisma/client";
import DashboardDepartamento from "@/components/DashboardDepartamento";
import DashboardOrientador from "@/components/DashboardOrientador";

const Dashboard = async () => {
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
    return <DashboardDepartamento />
  }

  if (usuarioLogado[0].tipo === TipoUsuario.ORIENTADOR) {
    return <DashboardOrientador />
  }

  if (usuarioLogado[0].tipo === TipoUsuario.ORIENTANDO) {
    return <DashboardOrientador />
  }
};

export default Dashboard;
