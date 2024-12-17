"use client";

import React from "react";
import { Button } from "./button";
import { logout } from "./actions";
import { LogOut } from "lucide-react";

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
