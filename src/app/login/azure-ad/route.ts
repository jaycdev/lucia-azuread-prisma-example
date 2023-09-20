// app/login/azure-ad/route.ts

import {azureADProvider} from '@/auth/lucia'
import {cookies} from 'next/headers'

export const GET = async () => {
    const [url, codeVerifier, state] = await azureADProvider.getAuthorizationUrl()

    const opts = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60
    }

    cookies().set('azuread_oauth_state', state, opts)
    cookies().set('azuread_oauth_code_verifier', codeVerifier, opts)

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    })
}
