import HeaderDashboard from "@/components/HeaderDashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderDashboard />
      {children}
    </>
  );
}
