import { createClient } from "@/utils/supabase/server"

import { put, list, del } from '@vercel/blob';

export async function POST(request: Request){
    const supabase = await createClient()

    const user = await supabase.auth.getUser()

    if (!user || !user.data.user){
        return Response.json({message: "Must be logged in"})
    }

    const formData = await request.formData()
    const image = formData.get('image')
    const id = formData.get('id')

    if (!image || typeof image === 'string') {
        return Response.json({message: "Invalid image file"})
    }

    if (id !== user.data.user.id){
        return Response.json({message: "Invalid User Id"})
    }

    const userFolder = `${user.data.user.id}/`
    const existingFiles = await list({prefix: userFolder})

    for (let i = 0; i < existingFiles.blobs.length; i++){
        await del(existingFiles.blobs[i].pathname)
    }

    const filename = `${id}/avatar.webp`

    const { url } = await put(filename, image, {access: 'public', allowOverwrite: true})

    return Response.json({avatarUrl: url})

    
}