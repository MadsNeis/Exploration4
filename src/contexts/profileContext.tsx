'use client'
import { createContext, useContext } from 'react'
import { Profile } from '@/types/profile'

import { useRouter } from 'next/navigation'

// data structure
type ProfileProps = {
    profile: Profile | undefined,
    updateProfile: (profile: Profile, avatar: File | undefined) => void,
    signOut: () => void
}

// create context 
const ProfileContext = createContext<ProfileProps | undefined>(undefined)

//provider
export function ProfileProvider(props: { profile: Profile | undefined, children: React.ReactNode}){

    const router = useRouter()

    async function updateProfile(profile: Profile, avatar: File | undefined){

        let avatarUrl: string | null = null
        if (avatar){
            const formData = new FormData()
            formData.append("id", profile.id)
            formData.append("image", avatar)

            const res = await fetch("/api/avatar",
                {
                    method:"POST",
                    body: formData

                }
            )

            const data = await res.json()
            avatarUrl = data.avatarUrl
        }

        console.log(avatarUrl)
    }

    async function signOut() {
        await fetch("api/signout")
        router.push("/login")
    }

    return(
        <ProfileContext.Provider value ={{profile: props.profile, updateProfile, signOut}}>
            {props.children}
        </ProfileContext.Provider>
    )
}

//use

export function useProfile(){
    const context = useContext(ProfileContext)
    if (!context){
        throw new Error("useProfile must be used within ProfileProvider")
    }
    return context
}