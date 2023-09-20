// app/logout/route.ts

import {NextRequest} from 'next/server'
import {auth} from '@/auth/lucia'
import * as context from 'next/headers'

export const GET = async (request: NextRequest) => {
    const authRequest = auth.handleRequest(request.method, context)
    const session = await authRequest.validate()

    // We'll return to the homepage once we know we're not signed in
    const response = new Response(null, {
        status: 302,
        headers: {
            Location: '/'
        }
    })

    if (!session) return response

    await auth.invalidateSession(session.sessionId)
    authRequest.setSession(null)

    return response
}
