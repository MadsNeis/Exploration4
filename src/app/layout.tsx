import { createClient } from "@/utils/supabase/server"
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

  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  // console.log(data.user?.email)

  const profile = await supabase 
    .from('profiles')
    .select()
    .eq('id', user.data.user?.id)

  console.log(profile.data)

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
