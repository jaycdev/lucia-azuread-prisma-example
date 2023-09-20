// app/login/azure-ad/callback/route.ts

import {auth, azureADProvider} from '@/auth/lucia'
import {NextRequest, NextResponse} from 'next/server'
import {cookies, headers} from 'next/headers'

export const GET = async (request: NextRequest) => {
    const storedState = cookies().get('azuread_oauth_state')?.value
    const storedCodeVerifier = cookies().get('azuread_oauth_code_verifier')?.value

    const url = new URL(request.url)
    const state = url.searchParams.get('state')
    const code = url.searchParams.get('code')

    if (!storedCodeVerifier || !storedState || !state || storedState !== state || !code) {
        return NextResponse.json({
            error: 'invalid_state',
            message: 'Invalid state or code'
        })
    }

    try {
        const {
            getExistingUser,
            azureADUser: {name, given_name, family_name, email},
            createUser,
            // azureADTokens
        } = await azureADProvider.validateCallback(code, storedCodeVerifier)

        const getUser = async () => {
            const existingUser = await getExistingUser()
            if (existingUser) return existingUser

            return await createUser({
                attributes: {name, given_name, family_name, email}
            })
        }

        const user = await getUser()

        const session = await auth.createSession({
            userId: user.id,
            attributes: {}
        })

        // We set the session cookie here and delete the state and code verifier cookies we set earlier
        const authRequest = auth.handleRequest(request.method, {cookies, headers})
        authRequest.setSession(session)

        cookies().set('azuread_oauth_state', '', {maxAge: 0})
        cookies().set('azuread_oauth_code_verifier', '', {maxAge: 0})

        // we delete any dead sessions (if any) from our DB
        await auth.deleteDeadUserSessions(user.id)

        return NextResponse.redirect('http://localhost:3000/protected')
    } catch (e) {
        console.error(e)
        return NextResponse.json({
            error: 'error_validating_user',
            message: 'There was a problem attempting to validate the user'
        }, {status: 500})
    }
}
