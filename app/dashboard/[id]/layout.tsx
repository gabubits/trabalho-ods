import HeaderProjeto from "@/components/HeaderProjeto";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    return (
        <>
            <HeaderProjeto id={id}/>
            {children}
        </>
    );
}
