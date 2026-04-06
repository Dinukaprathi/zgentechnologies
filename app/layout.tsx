import '../styles/globals.css';
export const metadata = {
  title: "ZGenLabs | Engineering the Future",
  description: "ZGenLabs official website",
  icons: {
    icon: [
      { url: "/logo/logo-without-bg.png", type: "image/png" },
    ],
    apple: "/logo/logo-without-bg.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="w-full bg-[#080808] text-gray-200 font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}