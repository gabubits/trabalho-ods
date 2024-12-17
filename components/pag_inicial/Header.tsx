import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import LoginForm from "../ui/login-form";

const Header = () => {
  return (
    <header className="grid grid-cols-3 gap-4 p-5 sticky top-0 w-screen bg-white z-50">
      <Link href="/" className="w-fit text-xl font-semibold">
        SUP - UFGJW
      </Link>
      <div className="flex justify-center gap-7">
        <Link
          href="#inicio"
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Início
        </Link>
        <Link
          href="#projetos"
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Projetos
        </Link>
        <Link
          href="#contato"
          className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
        >
          Contato
        </Link>
      </div>
      <div className="flex justify-end">
        <LoginForm />
      </div>
    </header>
  );
};

export default Header;
