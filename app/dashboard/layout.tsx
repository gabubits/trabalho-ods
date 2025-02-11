import HeaderDashboard from "@/components/HeaderDashboard";
import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerlist = await headers();
  const url = headerlist.get("x-url") || "";
  return (
    <>
      {!url.includes("projeto") && <HeaderDashboard />}
      {children}
    </>
  );
}
