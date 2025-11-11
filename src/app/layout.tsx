import { createClient } from "@/utils/supabase/server"
import type { Metadata } from "next";

import { ProfileProvider } from "@/contexts/profileContext";

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

  const data = await supabase 
    .from('profiles')
    .select()
    .eq('id', user.data.user?.id)

  console.log(data.data)

  let profile: Profile | undefined = undefined

  if (data.data && data.data.length > 0){
    profile = data.data[0]
  }

  return (
    <html lang="en">
      <ProfileProvider profile={await getProfile()}>
        <body>
          {children}
        </body>
      </ProfileProvider>
    </html>
  );
}

async function getProfile() : Promise<Profile | undefined>{
  const supabase = await createClient()

  const user = await supabase.auth.getUser()

  const data = await supabase 
    .from('profiles')
    .select()
    .eq('id', user.data.user?.id)

  console.log(data.data)

  let profile: Profile | undefined = undefined

  if (data.data && data.data.length > 0){
    profile = data.data[0]
  }

  return profile
}
