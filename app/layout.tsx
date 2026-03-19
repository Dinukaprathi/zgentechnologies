import '../styles/globals.css';
export const metadata = {
  title: "ZGenLabs | Engineering the Future",
  description: "ZGenLabs official website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-gray-200 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}