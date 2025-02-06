import { verifySession } from "@/lib/session";
import React from "react";
import { TipoUsuario } from "@prisma/client";
import DashboardAdmDept from "@/components/DashboardAdmDept";
import DashboardAdmGeral from "@/components/DashboardAdmGeral";
import DashboardOrientador from "@/components/DashboardOrientador";
import DashboardOrientando from "@/components/DashboardOrientando";

const Dashboard = async () => {
  const session = await verifySession();

  if (session.usuario_tipo === TipoUsuario.ADM_GERAL) {
    return <DashboardAdmGeral />;
  }

  if (session.usuario_tipo === TipoUsuario.ADM_DEPT) {
    return <DashboardAdmDept />;
  }

  if (session.usuario_tipo === TipoUsuario.ORIENTADOR) {
    return <DashboardOrientador />;
  }

  if (session.usuario_tipo === TipoUsuario.ORIENTANDO) {
    return <DashboardOrientando />;
  }
};

export default Dashboard;
