"use client";

import React from "react";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/login";

const BotaoSair = () => {
  return (
    <div>
      <Button variant="destructive" onClick={async () => await logout()}>
        {" "}
        <LogOut /> Sair
      </Button>
    </div>
  );
};

export default BotaoSair;
