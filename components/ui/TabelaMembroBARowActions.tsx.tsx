"use client";

import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { MembroBA } from "../TabelaMembrosBA";
import { apagarMembroBAAct } from "@/lib/actions/apagarMembroBA";
import { TipoUsuario } from "@prisma/client";

interface DataTableRowActionsProps {
  row: Row<MembroBA>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const route = useRouter();
  const { toast } = useToast();

  if (row.original.session_tipo === TipoUsuario.ORIENTANDO) return;

  return (
    <>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Você tem certeza?</DialogTitle>
          </DialogHeader>
          <Button
            variant="destructive"
            onClick={async () => {
              await apagarMembroBAAct(
                row.original.projeto_id,
                row.original.cpf
              );
              setDeleteOpen(false);
              route.refresh();
              toast({
                title: "Apagado com sucesso",
                description: `Mensagem foi apagada!`,
                variant: "success",
                duration: 3000,
              });
            }}
          >
            Apagar
          </Button>
        </DialogContent>
      </Dialog>

      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={(isOpen) => {
          setDropdownOpen(isOpen);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setDeleteOpen(true);
              setDropdownOpen(false);
            }}
          >
            Retirar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
