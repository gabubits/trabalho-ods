"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/modal-dialog";

import { useActionState } from "react";
import { login } from "./actions";
import { Button } from "./button";

const LoginForm = () => {
  const [state, loginAction, pending] = useActionState(login, undefined);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="default">
            Login
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Entrar na plataforma</AlertDialogTitle>
            <form action={loginAction} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Seu CPF
                </label>
                <input
                  type="number"
                  name="cpf"
                  id="cpf"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="xxx.xxx-xxx-xx"
                  required
                />
              </div>
              {state?.errors?.cpf && (
                <p className="text-red-500">{state.errors.cpf}</p>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sua senha
                </label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              {state?.errors?.senha && (
                <p className="text-red-500">{state.errors.senha}</p>
              )}
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="lembrar"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <Button disabled={pending} type="submit">
                {pending ? 'Entrando...' : 'Entrar'}
              </Button>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginForm;
