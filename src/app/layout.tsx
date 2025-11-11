import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Exploration Four",
  description: "Created by Madison Neiswonger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
