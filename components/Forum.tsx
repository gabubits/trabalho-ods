import prisma from "@/prisma/db";
import React from "react";

const Forum = async ({ projeto_id }: { projeto_id: string }) => {
  const topicos = await prisma.topico.findMany({
    where: {
      projeto_id: Number(projeto_id),
    },
  });
  return (
    <div className="flex mx-8 mt-8 justify-center items-center">
      <div className="my-5 flex justify-center">
        <div className="h-[500px] w-[1000px] rounded-md overflow-x-auto p-5 shadow-lg "></div>
      </div>
    </div>
  );
};

export default Forum;
